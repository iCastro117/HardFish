import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

const secretKey = process.env.JWT_SECRET || "tu_clave_secreta_temporal"
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function login(formData: FormData) {
  // Aquí iría la lógica para verificar las credenciales con MongoDB
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Ejemplo simple (en producción, verificarías contra la base de datos)
  const isValidUser = email && password

  if (!isValidUser) {
    return { success: false, message: "Credenciales inválidas" }
  }

  // Crear un token JWT con la información del usuario
  const token = await encrypt({
    id: "user_id_from_db",
    email,
    role: "admin", // o "customer" dependiendo del usuario
  })

  // Guardar el token en una cookie
  const cookiesInstance = await cookies()
  cookiesInstance.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 día
    path: "/",
  })

  return { success: true }
}

export async function logout() {
  const cookiesInstance = await cookies()
  cookiesInstance.delete("auth-token")
}

export async function getSession() {
  const cookiesInstance = await cookies()
  const token = cookiesInstance.get("auth-token")?.value

  if (!token) return null

  const payload = await decrypt(token)
  return payload
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) return NextResponse.redirect(new URL("/login", request.url))

  const payload = await decrypt(token)

  if (!payload) return NextResponse.redirect(new URL("/login", request.url))

  // Verificar si el usuario tiene acceso a la ruta solicitada
  // Por ejemplo, si intenta acceder a /admin pero no tiene rol de admin
  const { pathname } = new URL(request.url)

  if (pathname.startsWith("/admin") && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

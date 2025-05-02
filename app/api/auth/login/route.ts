import { type NextRequest, NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await login(formData)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Login API Error:", error)
    return NextResponse.json({ error: error.message || "Error en el servidor" }, { status: 500 })
  }
}

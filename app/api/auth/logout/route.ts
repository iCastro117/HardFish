import { NextResponse } from "next/server"
import { logout } from "@/lib/auth"

export async function POST() {
  try {
    await logout()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createConnection } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const db = await createConnection()
    const [rows] = await db.query("SELECT * FROM users")
    return NextResponse.json(rows)
  } catch(error: any) {
    console.log(error)
    return NextResponse.json({error: error.message})
  }
}
import { NextRequest, NextResponse } from 'next/server'

// Make sure the function names are capitalized named exports!
export async function GET(request: NextRequest) {
  // Your callback logic here
  return NextResponse.json({ message: "Callback processed" })
}

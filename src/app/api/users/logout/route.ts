import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Success",
      success: true,
    });
    response.cookies.delete("nexttoken")
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
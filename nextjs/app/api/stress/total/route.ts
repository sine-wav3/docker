import { NextResponse } from "next/server";

export async function GET() {

  const start = Date.now();

  try {

    await Promise.all([
      fetch("http://localhost:3000/api/stress/cpu"),
      fetch("http://localhost:3000/api/stress/db"),
      fetch("http://localhost:3000/api/stress/web")
    ]);

    const end = Date.now();

    return NextResponse.json({
      success: true,
      duration: `${end - start} ms`
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    );

  }

}

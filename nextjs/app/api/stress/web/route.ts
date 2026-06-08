import { NextResponse } from "next/server";

export async function GET() {

  const start = Date.now();

  try {

    const requests = [];

    for (let i = 0; i < 100; i++) {

      requests.push(
        fetch("http://localhost:3000/api/stress/cpu")
      );

    }

    await Promise.all(requests);

    const end = Date.now();

    return NextResponse.json({
      success: true,
      requests: requests.length,
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

import { NextResponse } from "next/server";

function fibonacci(n: number): number {
  if (n <= 1) return n;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

export async function GET() {

  const start = Date.now();

  fibonacci(42);

  const end = Date.now();

  return NextResponse.json({
    message: "CPU Stress terminado",
    duration: `${end - start} ms`
  });

}

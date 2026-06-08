import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const start = Date.now();

  try {

    const records = [];

    for (let i = 0; i < 10000; i++) {

      records.push({
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        stressJobId: 1
      });

    }

    await prisma.metric.createMany({
      data: records
    });

    const count = await prisma.metric.count();

    const end = Date.now();

    return NextResponse.json({
      success: true,
      inserted: records.length,
      totalMetrics: count,
      duration: `${end - start} ms`
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Error ejecutando stress DB"
      },
      {
        status: 500
      }
    );

  }

}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import os from "os";

const prisma = new PrismaClient();

export async function GET() {

  try {

    const cpuCount = os.cpus().length;

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    const memoryUsage =
      ((totalMemory - freeMemory) / totalMemory) * 100;

    const metric = await prisma.metric.create({
      data: {
        cpuUsage: cpuCount,
        memoryUsage: Number(memoryUsage.toFixed(2)),
        stressJobId: 1
      }
    });

    return NextResponse.json(metric);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Error guardando métricas" },
      { status: 500 }
    );
  }
}

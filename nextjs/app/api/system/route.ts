import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const cpu = execSync(
      "top -bn1 | grep 'Cpu(s)'"
    ).toString();

    const memory = execSync(
      "free -h"
    ).toString();

    const disk = execSync(
      "df -h"
    ).toString();

    const processes = execSync(
      "ps aux --sort=-%cpu | head -10"
    ).toString();

    return NextResponse.json({
      cpu,
      memory,
      disk,
      processes
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "No se pudieron obtener métricas" },
      { status: 500 }
    );

  }

}

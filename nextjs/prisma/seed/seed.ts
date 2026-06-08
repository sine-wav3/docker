import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  console.log("Creando usuarios...")

  for (let i = 1; i <= 100; i++) {

    const user = await prisma.user.create({
      data: {
        name: `Usuario ${i}`,
        email: `usuario${i}@correo.com`
      }
    })

    const stressJob = await prisma.stressJob.create({
      data: {
        title: `Stress Test ${i}`,
        description: "Prueba inicial",
        userId: user.id
      }
    })

    await prisma.metric.create({
      data: {
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        stressJobId: stressJob.id
      }
    })
  }

  console.log("Seed completado")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })

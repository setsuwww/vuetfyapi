import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const allCategory = await prisma.category.upsert({
    where: { name: 'All' },
    update: {},
    create: {
      name: 'All',
    },
  })

  console.log('Seeded category:', allCategory)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })

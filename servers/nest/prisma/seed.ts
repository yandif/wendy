import { PrismaClient } from '@prisma/client'
import { Auth } from '../src/util'
import { Admin } from '../src/main.config'

const prisma = new PrismaClient()
const tool = new Auth()
async function main() {
  await prisma.account.upsert({
    where: { id: 1 },
    update: {
      username: Admin.defaultUsername,
      password: tool.makePassword(Admin.defaultPassword),
      isSuper: 1,
    },
    create: {
      username: Admin.defaultUsername,
      password: tool.makePassword(Admin.defaultPassword),
      isSuper: 1,
    },
  })
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

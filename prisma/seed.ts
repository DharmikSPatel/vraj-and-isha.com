import { nanoid } from 'nanoid';

import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Start seeding...');

  const families = [
    {
      head: 'Sopan Patel',
      dependents: ['Bhavika Patel', 'Aum Patel', 'Keval Patel'],
    },
    {
      head: 'Kamlesh Patel',
      dependents: ['Arpita Patel', 'Alok Patel', 'Nakul Patel'],
    },
    {
      head: 'Sandeep Patel',
      dependents: ['Bindu Patel', 'Dharmik Patel', 'Varsaba Patel'],
    },
    {
      head: 'Adit Patel',
      dependents: ['Kruti Patel', 'Antra Patel', 'Rudra Patel', 'Dilipdada Patel', 'Ranjenba Patel'],
    },
  ];

  for (const family of families) {
    await prisma.guest.create({
      data: {
        id: nanoid(10),
        name: family.head,
        isAttending: 'NO_RESPONSE',
        dependents: {
          create: family.dependents.map((name) => ({
            id: nanoid(10),
            name: name,
            isAttending: 'NO_RESPONSE',
          })),
        },
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.consumer.upsert({
    where: {
      email: 'ameliasimpson@example.com',
    },
    create: {
      gender: 'Female',
      pronouns: 'she/her',
      firstName: 'Amelia',
      lastName: 'Simpson',
      email: 'ameliasimpson@example.com',
      dob: new Date('1990-10-10'),
      mrn: '8466288',
      phone: '555-555-5555',
    },
    update: {},
  });

  await prisma.consumer.upsert({
    where: {
      email: 'tomwalton@example.com',
    },
    create: {
      gender: 'Male',
      pronouns: 'he/him',
      firstName: 'Tom',
      lastName: 'Walton',
      email: 'tomwalton@example.com',
      dob: new Date('1984-11-01'),
      mrn: '8463284',
      phone: '666-666-6666',
    },
    update: {},
  });

  await prisma.consumer.upsert({
    where: {
      email: 'maddiejordan@example.com',
    },
    create: {
      gender: 'Female',
      pronouns: 'she/her',
      firstName: 'Maddie',
      lastName: 'Jordan',
      email: 'maddiejordan@example.com',
      dob: new Date('1989-01-07'),
      mrn: '8563431',
      phone: '777-777-7777',
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

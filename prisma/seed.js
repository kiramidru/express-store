import bcrypt from 'bcrypt'
import pkg from '@prisma/client'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10)

    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            firstName: 'kira',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log('✅ Seed data created.')
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


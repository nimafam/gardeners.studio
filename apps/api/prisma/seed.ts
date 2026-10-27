import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient, UserStatus } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const roles = [
        { slug: 'owner', name: 'Owner' },
        { slug: 'admin', name: 'Admin' },
        { slug: 'editor', name: 'Editor' },
        { slug: 'viewer', name: 'Viewer' },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { slug: role.slug },
            update: {},
            create: {
                ...role,
                isSystem: true,
            },
        });
    }

    const ownerEmail = process.env.SEED_OWNER_EMAIL;
    const ownerPassword = process.env.SEED_OWNER_PASSWORD;

    if (!ownerEmail || !ownerPassword) {
        throw new Error('SEED_OWNER_EMAIL and SEED_OWNER_PASSWORD are required')
    }

    const passwordHash = await bcrypt.hash(ownerPassword, 10);

    const owner = await prisma.user.upsert({
        where: { email: ownerEmail },
        update: {},
        create: {
            email: ownerEmail,
            passwordHash,
            firstName: process.env.SEED_OWNER_FIRST_NAME,
            lastName: process.env.SEED_OWNER_LAST_NAME,
            status: UserStatus.ACTIVE,
        },
    });

    const ownerRole = await prisma.role.findUniqueOrThrow({
        where: { slug: 'owner' }
    });

    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: owner.id,
                roleId: ownerRole.id
            },
        },
        update: {},
        create: {
            userId: owner.id,
            roleId: ownerRole.id
        },
    });

    await prisma.homePageContent.upsert({
        where: { singletonKey: 'homePage' },
        update: {},
        create: {
            singletonKey: 'homepage',
            heroTitle: 'Arash Amini',
            heroSubtitle: 'Personal Brand CMS'
        }
    })

    console.log('Seed completed successfully');

}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })

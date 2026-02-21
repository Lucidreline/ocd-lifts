import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/index.js';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

let prisma: PrismaClient

try {
    prisma = new PrismaClient({ adapter });
    console.log('Prisma initialized successfully')
} catch (err) {
    console.error('Prisma initialization failed:', err)
    process.exit(1)
}

export { prisma };
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

function generateVerificationCode(): string {
  return randomBytes(32).toString('hex');
}

async function main() {
  try {
    // Check if super admin exists
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        email: 'admin@hca.com'
      }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const verification_code = generateVerificationCode();
      
      await prisma.admin.create({
        data: {
          email: 'admin@hca.com',
          password: hashedPassword,
          name: 'Super Admin',
          profile_picture: null,
          verification_code,
          refresh_token: null,
        }
      });
      
      console.log('✅ Super admin seeded successfully');
    } else {
      console.log('⚠️ Super admin already exists');
    }
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import prisma from './prisma/client.js';

async function main() {
  console.log('🌱 Seeding database...');

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'ADMIN'
    }
  });

  console.log(`✅ Created admin: ${admin.email}`);

  const employees = await Promise.all([
    prisma.employee.upsert({
      where: { employeeId: 'EMP001' },
      update: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        department: 'Engineering',
        position: 'Senior Developer',
        salary: 120000,
        dateOfJoining: new Date('2020-01-15'),
        status: 'ACTIVE',
        address: '123 Main St',
        emergencyContact: '9876543210'
      },
      create: {
        employeeId: 'EMP001',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        department: 'Engineering',
        position: 'Senior Developer',
        salary: 120000,
        dateOfJoining: new Date('2020-01-15'),
        status: 'ACTIVE',
        address: '123 Main St',
        emergencyContact: '9876543210'
      }
    }),
    prisma.employee.upsert({
      where: { employeeId: 'EMP002' },
      update: {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        department: 'HR',
        position: 'HR Manager',
        salary: 95000,
        dateOfJoining: new Date('2021-03-20'),
        status: 'ACTIVE',
        address: '456 Oak Ave',
        emergencyContact: '5555555555'
      },
      create: {
        employeeId: 'EMP002',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        department: 'HR',
        position: 'HR Manager',
        salary: 95000,
        dateOfJoining: new Date('2021-03-20'),
        status: 'ACTIVE',
        address: '456 Oak Ave',
        emergencyContact: '5555555555'
      }
    })
  ]);

  console.log(`✅ Created ${employees.length} employees`);
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

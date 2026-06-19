import prisma from '../prisma/client.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalEmployees = await prisma.employee.count({ where: { deletedAt: null } });
    const activeEmployees = await prisma.employee.count({ where: { deletedAt: null, status: 'ACTIVE' } });
    const onLeaveEmployees = await prisma.employee.count({ where: { deletedAt: null, status: 'ON_LEAVE' } });
    const inactiveEmployees = await prisma.employee.count({ where: { deletedAt: null, status: 'INACTIVE' } });
    const recentEmployees = await prisma.employee.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    res.json({ totalEmployees, activeEmployees, onLeaveEmployees, inactiveEmployees, recentEmployees });
  } catch (error) {
    next(error);
  }
};

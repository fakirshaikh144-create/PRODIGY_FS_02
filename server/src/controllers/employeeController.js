import prisma from '../prisma/client.js';

export const getEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', department, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {
      deletedAt: null,
      AND: [
        search
          ? {
              OR: [
                { employeeId: { contains: search, mode: 'insensitive' } },
                { fullName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { department: { contains: search, mode: 'insensitive' } },
                { position: { contains: search, mode: 'insensitive' } }
              ]
            }
          : undefined,
        department ? { department } : undefined,
        status ? { status } : undefined
      ].filter(Boolean)
    };

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip: offset,
        take: Number(limit),
        orderBy: { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' }
      }),
      prisma.employee.count({ where })
    ]);

    res.json({ meta: { page: Number(page), limit: Number(limit), total }, data: employees });
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findFirst({ where: { id, deletedAt: null } });
    if (!employee) return res.status(404).json({ error: 'Employee not found.' });
    res.json({ employee });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const payload = req.body;
    const existing = await prisma.employee.findUnique({ where: { email: payload.email } });
    if (existing) return res.status(409).json({ error: 'Employee email already exists.' });

    const existingId = await prisma.employee.findUnique({ where: { employeeId: payload.employeeId } });
    if (existingId) return res.status(409).json({ error: 'Employee ID already exists.' });

    const employee = await prisma.employee.create({ data: payload });
    res.status(201).json({ employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const employee = await prisma.employee.findFirst({ where: { id, deletedAt: null } });
    if (!employee) return res.status(404).json({ error: 'Employee not found.' });

    if (payload.email && payload.email !== employee.email) {
      const duplicateEmail = await prisma.employee.findUnique({ where: { email: payload.email } });
      if (duplicateEmail) return res.status(409).json({ error: 'Employee email already exists.' });
    }
    if (payload.employeeId && payload.employeeId !== employee.employeeId) {
      const duplicateId = await prisma.employee.findUnique({ where: { employeeId: payload.employeeId } });
      if (duplicateId) return res.status(409).json({ error: 'Employee ID already exists.' });
    }

    const updated = await prisma.employee.update({ where: { id }, data: payload });
    res.json({ employee: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findFirst({ where: { id, deletedAt: null } });
    if (!employee) return res.status(404).json({ error: 'Employee not found.' });

    await prisma.employee.update({ where: { id }, data: { deletedAt: new Date() } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

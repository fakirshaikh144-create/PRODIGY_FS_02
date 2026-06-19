export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  dateOfJoining: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
  address: string;
  emergencyContact: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeaveEmployees: number;
  inactiveEmployees: number;
  recentEmployees: Employee[];
}

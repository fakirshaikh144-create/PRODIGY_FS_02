'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Card } from '@/components/ui';
import { Employee } from '@/lib/types';

export default function EmployeeDetailPage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.employees.get(id);
        setEmployee(res.data.employee);
      } catch (error) {
        console.error('Failed to fetch employee:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!employee) return <div className="p-6">Employee not found</div>;

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{employee.fullName}</h1>
        <div className="space-x-2">
          <Link href={`/employees/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Edit
          </Link>
          <button onClick={() => router.back()} className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50">
            Back
          </button>
        </div>
      </div>

      <Card className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Employee ID</p>
            <p className="text-lg font-semibold">{employee.employeeId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-semibold">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="text-lg font-semibold">{employee.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="text-lg font-semibold">{employee.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Position</p>
            <p className="text-lg font-semibold">{employee.position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Salary</p>
            <p className="text-lg font-semibold">${employee.salary.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date of Joining</p>
            <p className="text-lg font-semibold">{new Date(employee.dateOfJoining).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className={`inline-block rounded px-3 py-1 font-semibold text-white ${employee.status === 'ACTIVE' ? 'bg-green-600' : employee.status === 'ON_LEAVE' ? 'bg-yellow-600' : 'bg-red-600'}`}>
              {employee.status}
            </span>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Address</p>
            <p className="text-lg font-semibold">{employee.address}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Emergency Contact</p>
            <p className="text-lg font-semibold">{employee.emergencyContact}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

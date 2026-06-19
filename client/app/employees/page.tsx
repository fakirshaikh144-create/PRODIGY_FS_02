'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Card, Input } from '@/components/ui';
import { Employee } from '@/lib/types';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await api.employees.list(page, 10, search);
        setEmployees(res.data.data);
        setTotal(res.data.meta.total);
        setError('');
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        setError('Failed to load employees.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page, search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.employees.delete(id);
      setEmployees(employees.filter((e) => e.id !== id));
      setTotal((current) => Math.max(0, current - 1));
    } catch (error) {
      console.error('Failed to delete employee:', error);
      setError('Failed to delete employee.');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
        <Link href="/employees/add" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Add Employee
        </Link>
      </div>

      <Card>
        <Input type="text" placeholder="Search by name, email, or ID..." value={search} onChange={(e: any) => setSearch(e.target.value)} className="w-full" />
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium">ID</th>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Department</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : null}
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="px-4 py-2">{emp.employeeId}</td>
                <td className="px-4 py-2">{emp.fullName}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.department}</td>
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-1 text-xs font-medium ${emp.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : emp.status === 'ON_LEAVE' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="space-x-2 px-4 py-2">
                  <Link href={`/employees/${emp.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                  <Link href={`/employees/${emp.id}/edit`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Showing {employees.length} of {total}
        </span>
        <div className="space-x-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50">
            Previous
          </button>
          <button onClick={() => setPage(page + 1)} disabled={page * 10 >= total} className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

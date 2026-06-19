'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Card } from '@/components/ui';
import { DashboardStats } from '@/lib/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.dashboard.stats();
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!stats) return <div className="p-6 text-red-600">{error || 'Unable to load dashboard.'}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50">
          <div className="text-sm text-gray-600">Total Employees</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">{stats.totalEmployees}</div>
        </Card>
        <Card className="bg-green-50">
          <div className="text-sm text-gray-600">Active</div>
          <div className="mt-2 text-3xl font-bold text-green-600">{stats.activeEmployees}</div>
        </Card>
        <Card className="bg-yellow-50">
          <div className="text-sm text-gray-600">On Leave</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.onLeaveEmployees}</div>
        </Card>
        <Card className="bg-red-50">
          <div className="text-sm text-gray-600">Inactive</div>
          <div className="mt-2 text-3xl font-bold text-red-600">{stats.inactiveEmployees}</div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Recent Employees</h2>
        {stats.recentEmployees.length === 0 ? (
          <p className="text-gray-500">No recent employees</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">Email</th>
                  <th className="px-4 py-2 text-left font-medium">Department</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b">
                    <td className="px-4 py-2">{emp.fullName}</td>
                    <td className="px-4 py-2">{emp.email}</td>
                    <td className="px-4 py-2">{emp.department}</td>
                    <td className="px-4 py-2">
                      <span className={`rounded px-2 py-1 text-xs font-medium ${emp.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : emp.status === 'ON_LEAVE' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Link href="/employees" className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        View All Employees
      </Link>
    </div>
  );
}

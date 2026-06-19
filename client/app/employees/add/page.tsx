'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Card, Input, Button } from '@/components/ui';
import { employeeSchema, EmployeeFormValues } from '@/lib/validators';

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    dateOfJoining: '',
    status: 'ACTIVE',
    address: '',
    emergencyContact: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = employeeSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || 'Please review the employee details.');
      return;
    }

    setLoading(true);

    try {
      const payload: EmployeeFormValues = validation.data;
      await api.employees.create(payload);
      router.push('/employees');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Add Employee</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee ID</label>
              <Input name="employeeId" value={formData.employeeId} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <Input name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <Input name="department" value={formData.department} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <Input name="position" value={formData.position} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <Input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
              <Input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="rounded border border-gray-300 px-3 py-2 w-full">
                <option value="ACTIVE">Active</option>
                <option value="ON_LEAVE">On Leave</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <Input name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Employee'}
            </Button>
            <button type="button" onClick={() => router.back()} className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

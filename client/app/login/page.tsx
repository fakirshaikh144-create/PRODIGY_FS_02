'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Input, Button } from '@/components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.auth.login(email, password);
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="admin@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}

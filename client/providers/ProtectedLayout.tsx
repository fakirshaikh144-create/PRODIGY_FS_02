import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export async function ProtectedLayout({ children }: { children: ReactNode }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) redirect('/login');
  return <>{children}</>;
}

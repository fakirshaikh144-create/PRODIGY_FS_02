import './globals.css';
import type { Metadata } from 'next';
import DashboardLayout from './layout-dashboard';
import { AuthProvider } from '@/hooks/useAuth';

export const metadata: Metadata = {
  title: 'Prodigy EMS',
  description: 'Enterprise Employee Management System'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

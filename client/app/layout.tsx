import './globals.css';
import type { Metadata } from 'next';
import DashboardLayout from './layout-dashboard';

export const metadata: Metadata = {
  title: 'Prodigy EMS',
  description: 'Enterprise Employee Management System'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}

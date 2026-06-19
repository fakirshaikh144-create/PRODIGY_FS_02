"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (pathname === "/login" && isAuthenticated) {
      router.replace("/dashboard");
      return;
    }

    if (pathname !== "/login" && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    router.replace("/login");
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  if (pathname === "/login") return children;

  if (!isAuthenticated) return <div className="p-6">Redirecting to login...</div>;

  const navItems = [
    { href: "/dashboard" as const, label: "Dashboard" },
    { href: "/employees" as const, label: "Employees" },
    { href: "/employees/add" as const, label: "Add Employee" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="border-b border-gray-800 p-6">
          <h1 className="text-xl font-bold">Prodigy EMS</h1>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-4 py-2 hover:bg-gray-800 ${pathname === item.href ? "bg-gray-800" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-gray-800 p-4">
          <div className="mb-3 text-sm text-gray-300">
            <div className="font-medium text-white">{user?.name}</div>
            <div>{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

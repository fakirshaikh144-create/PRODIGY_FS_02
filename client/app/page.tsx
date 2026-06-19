import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <section className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-sm uppercase tracking-wider text-blue-600">Enterprise HR Portal</p>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Prodigy EMS</h1>
                <p className="text-base leading-7 text-gray-600">Employee Management System for secure admin control and workforce management.</p>
              </div>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                Go to dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

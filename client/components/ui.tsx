'use client';

import { ReactNode } from 'react';

export const Button = ({ children, className, ...props }: any) => (
  <button className={`rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${className}`} {...props}>
    {children}
  </button>
);

export const Input = ({ className, ...props }: any) => (
  <input className={`rounded border border-gray-300 px-3 py-2 ${className}`} {...props} />
);

export const Card = ({ children, className }: any) => (
  <div className={`rounded border border-gray-200 bg-white p-4 shadow-sm ${className}`}>{children}</div>
);

export const Table = ({ children }: any) => <table className="w-full border-collapse">{children}</table>;
export const THead = ({ children }: any) => <thead className="border-b-2 bg-gray-50">{children}</thead>;
export const TBody = ({ children }: any) => <tbody>{children}</tbody>;
export const Tr = ({ children, className }: any) => <tr className={`border-b ${className}`}>{children}</tr>;
export const Th = ({ children, className }: any) => <th className={`px-4 py-2 text-left font-semibold ${className}`}>{children}</th>;
export const Td = ({ children, className }: any) => <td className={`px-4 py-2 ${className}`}>{children}</td>;

export const Badge = ({ children, variant = 'default' }: any) => {
  const colors: any = {
    default: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    leave: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800'
  };
  return <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${colors[variant]}`}>{children}</span>;
};

export const Modal = ({ isOpen, onClose, children, title }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded bg-white shadow-lg">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="px-6 py-4">{children}</div>
        <div className="border-t px-6 py-3 text-right">
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

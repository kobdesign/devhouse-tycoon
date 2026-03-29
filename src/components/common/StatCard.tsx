'use client';

import { clsx } from 'clsx';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/format';

interface StatCardProps {
  title: string;
  value: number;
  format?: 'currency' | 'number' | 'percent';
  change?: number;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const colorMap = {
  blue: 'bg-blue-500/10 text-blue-500',
  green: 'bg-emerald-500/10 text-emerald-500',
  red: 'bg-red-500/10 text-red-500',
  yellow: 'bg-amber-500/10 text-amber-500',
  purple: 'bg-purple-500/10 text-purple-500',
};

export function StatCard({ title, value, format = 'number', change, icon, color = 'blue' }: StatCardProps) {
  const formattedValue =
    format === 'currency' ? formatCurrency(value) :
    format === 'percent' ? formatPercent(value) :
    formatNumber(value);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formattedValue}</p>
          {change !== undefined && (
            <p className={clsx('mt-1 text-sm font-medium', change >= 0 ? 'text-emerald-600' : 'text-red-600')}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={clsx('rounded-xl p-3', colorMap[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
}

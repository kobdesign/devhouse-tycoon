import { clsx } from 'clsx';

interface MoraleIndicatorProps {
  value: number; // 0-100
  size?: 'sm' | 'md';
}

export function MoraleIndicator({ value, size = 'md' }: MoraleIndicatorProps) {
  const emoji = value >= 70 ? '😊' : value >= 40 ? '😐' : '😟';
  const color = value >= 70 ? 'text-emerald-500' : value >= 40 ? 'text-amber-500' : 'text-red-500';
  const bgColor = value >= 70 ? 'bg-emerald-500' : value >= 40 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="flex items-center gap-2">
      <span className={clsx(size === 'sm' ? 'text-sm' : 'text-lg')}>{emoji}</span>
      <div className={clsx('rounded-full bg-gray-200', size === 'sm' ? 'h-1.5 w-16' : 'h-2 w-24')}>
        <div
          className={clsx('rounded-full transition-all', bgColor, size === 'sm' ? 'h-1.5' : 'h-2')}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={clsx('font-mono font-bold', color, size === 'sm' ? 'text-xs' : 'text-sm')}>
        {value}%
      </span>
    </div>
  );
}

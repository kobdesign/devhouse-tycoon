'use client';

import { clsx } from 'clsx';
import { calculateLevel, xpProgress, xpForNextLevel } from '@/lib/utils/format';

interface XpBarProps {
  xp: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function XpBar({ xp, size = 'md', showLabel = true }: XpBarProps) {
  const level = calculateLevel(xp);
  const progress = xpProgress(xp);
  const nextLevelXp = xpForNextLevel(level);

  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-purple-600">LV.{level}</span>
          <span className="text-xs text-gray-400">{xp} / {nextLevelXp} XP</span>
        </div>
      )}
      <div className={clsx('w-full rounded-full bg-gray-200', heights[size])}>
        <div
          className={clsx('rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700', heights[size])}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

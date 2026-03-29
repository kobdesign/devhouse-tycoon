'use client';

import { Bell, Search } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { XpBar } from '@/components/common/XpBar';

export function Header() {
  const { stats, notifications } = useDashboardStore();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees, projects..."
            className="h-9 w-72 rounded-lg bg-gray-100 pl-10 pr-4 text-sm text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/30 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Company XP */}
        {stats && (
          <div className="w-40">
            <XpBar xp={stats.companyXp} size="sm" />
          </div>
        )}

        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Company Level Badge */}
        {stats && (
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5">
            <span className="text-xs font-bold text-white">LV.{stats.companyLevel}</span>
          </div>
        )}
      </div>
    </header>
  );
}

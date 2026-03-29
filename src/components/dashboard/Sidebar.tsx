'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useSidebarStore } from '@/stores/sidebarStore';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  DollarSign,
  Building2,
  UserCircle,
  Cpu,
  Heart,
  Settings,
  ChevronLeft,
  Gamepad2,
} from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'People', href: '/people', icon: Users },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'Office', href: '/office', icon: Building2 },
  { name: 'Clients', href: '/clients', icon: UserCircle },
  { name: 'Tech & R&D', href: '/tech', icon: Cpu },
  { name: 'Culture', href: '/culture', icon: Heart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <aside
      className={clsx(
        'flex h-screen flex-col bg-gray-900 text-gray-300 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-800 px-4">
        <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-1.5">
          <Gamepad2 className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="truncate text-sm font-bold text-white">DevHouse Tycoon</h1>
            <p className="truncate text-[10px] text-gray-500">Gamified ERP</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-purple-500/20 text-purple-400 border-l-3 border-purple-500'
                  : 'hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className={clsx('h-5 w-5 flex-shrink-0', isActive && 'text-purple-400')} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={toggle}
        className="flex h-12 items-center justify-center border-t border-gray-800 hover:bg-white/5 transition-colors"
      >
        <ChevronLeft className={clsx('h-4 w-4 transition-transform', isCollapsed && 'rotate-180')} />
      </button>
    </aside>
  );
}

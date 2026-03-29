export type { User, Employee, Project, Task, Client, Finance, Achievement, Quest, Sprint, Contract, XpRecord, UserAchievement, SyncLog, AuditLog, CompanySetting } from '@/generated/prisma';
export { UserRole, Department, ProjectStatus, TaskStatus, FinanceType } from '@/generated/prisma';

export interface DashboardStats {
  totalEmployees: number;
  activeProjects: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  companyLevel: number;
  companyXp: number;
  avgMorale: number;
  onTimeDeliveryRate: number;
}

export interface LeaderboardEntry {
  employeeId: string;
  name: string;
  avatar: string | null;
  position: string;
  department: string;
  totalXp: number;
  level: number;
  achievementCount: number;
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface GameNotification {
  id: string;
  type: 'achievement' | 'quest' | 'alert' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

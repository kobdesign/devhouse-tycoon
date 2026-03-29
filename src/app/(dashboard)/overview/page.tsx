import { Users, FolderKanban, TrendingUp, TrendingDown, Heart, Trophy, Target, Zap } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';

// Mock data for MVP - will be replaced with real data from DB
const mockStats = {
  totalEmployees: 87,
  activeProjects: 12,
  monthlyRevenue: 4250000,
  monthlyExpenses: 3180000,
  companyLevel: 8,
  companyXp: 6400,
  avgMorale: 72,
  onTimeDeliveryRate: 89,
};

export default function OverviewPage() {
  const stats = mockStats;
  const profit = stats.monthlyRevenue - stats.monthlyExpenses;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
        <p className="text-sm text-gray-500">Real-time overview of your IT outsource empire</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Employees"
          value={stats.totalEmployees}
          change={5}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          change={2}
          icon={<FolderKanban className="h-6 w-6" />}
          color="purple"
        />
        <StatCard
          title="Monthly Revenue"
          value={stats.monthlyRevenue}
          format="currency"
          change={12}
          icon={<TrendingUp className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Monthly Expenses"
          value={stats.monthlyExpenses}
          format="currency"
          change={-3}
          icon={<TrendingDown className="h-6 w-6" />}
          color="red"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Net Profit"
          value={profit}
          format="currency"
          icon={<Zap className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Team Morale"
          value={stats.avgMorale}
          format="percent"
          icon={<Heart className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="On-time Delivery"
          value={stats.onTimeDeliveryRate}
          format="percent"
          change={4}
          icon={<Target className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Company Level"
          value={stats.companyLevel}
          icon={<Trophy className="h-6 w-6" />}
          color="purple"
        />
      </div>

      {/* Achievement Banner */}
      <div className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">🏆 Latest Achievement Unlocked!</h3>
            <p className="mt-1 text-purple-200">Revenue Milestone: ฿4M+ monthly revenue reached!</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">+500 XP</p>
            <p className="text-sm text-purple-200">Company XP earned</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Active Projects</h3>
          <div className="space-y-3">
            {[
              { name: 'FinTech Mobile App', client: 'BankX Corp', progress: 75, status: 'on-track' },
              { name: 'E-commerce Platform', client: 'ShopEase', progress: 45, status: 'at-risk' },
              { name: 'Cloud Migration', client: 'DataFlow Inc', progress: 90, status: 'on-track' },
              { name: 'AI Chatbot', client: 'ServicePro', progress: 20, status: 'on-track' },
            ].map((project) => (
              <div key={project.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{project.name}</p>
                  <p className="text-xs text-gray-500">{project.client}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${project.status === 'at-risk' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-600">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">🏅 Top Performers</h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Somchai J.', role: 'Senior Backend', xp: 2450, medal: '🥇' },
              { rank: 2, name: 'Ploy S.', role: 'Tech Lead', xp: 2280, medal: '🥈' },
              { rank: 3, name: 'Natt P.', role: 'Senior Frontend', xp: 2100, medal: '🥉' },
              { rank: 4, name: 'Krit W.', role: 'DevOps Engineer', xp: 1950, medal: '4' },
              { rank: 5, name: 'Fah M.', role: 'QA Lead', xp: 1820, medal: '5' },
            ].map((person) => (
              <div key={person.rank} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{person.medal}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-purple-600">{person.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

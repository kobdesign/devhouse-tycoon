import { UserCircle, Star, Building, Handshake, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';
import { formatCurrency } from '@/lib/utils/format';

const clients = [
  { id: '1', name: 'BankX Corp', industry: 'FinTech', satisfaction: 92, budgetTier: 'ENTERPRISE', activeProjects: 2, totalRevenue: 8500000, contractType: 'time_material' },
  { id: '2', name: 'ShopEase', industry: 'E-commerce', satisfaction: 78, budgetTier: 'HIGH', activeProjects: 1, totalRevenue: 4200000, contractType: 'fixed_price' },
  { id: '3', name: 'DataFlow Inc', industry: 'SaaS', satisfaction: 88, budgetTier: 'HIGH', activeProjects: 1, totalRevenue: 5000000, contractType: 'retainer' },
  { id: '4', name: 'ServicePro', industry: 'Services', satisfaction: 85, budgetTier: 'MEDIUM', activeProjects: 1, totalRevenue: 1500000, contractType: 'fixed_price' },
  { id: '5', name: 'MegaCorp', industry: 'Manufacturing', satisfaction: 65, budgetTier: 'ENTERPRISE', activeProjects: 1, totalRevenue: 12000000, contractType: 'time_material' },
  { id: '6', name: 'PeopleSoft Co', industry: 'HR Tech', satisfaction: 95, budgetTier: 'MEDIUM', activeProjects: 0, totalRevenue: 800000, contractType: 'fixed_price' },
];

const satisfactionEmoji = (score: number) => score >= 80 ? '😊' : score >= 60 ? '😐' : '😟';
const satisfactionColor = (score: number) => score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600';
const tierVariant = (tier: string) => {
  const map: Record<string, 'danger' | 'warning' | 'info' | 'success'> = { ENTERPRISE: 'danger', HIGH: 'warning', MEDIUM: 'info', LOW: 'success' };
  return map[tier] ?? 'info';
};

export default function ClientsPage() {
  const activeClients = clients.filter(c => c.activeProjects > 0).length;
  const avgSatisfaction = Math.round(clients.reduce((s, c) => s + c.satisfaction, 0) / clients.length);
  const totalRevenue = clients.reduce((s, c) => s + c.totalRevenue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="text-sm text-gray-500">Manage client relationships, satisfaction & contracts</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Clients" value={clients.length} icon={<UserCircle className="h-6 w-6" />} color="blue" />
        <StatCard title="Active Clients" value={activeClients} icon={<Handshake className="h-6 w-6" />} color="green" />
        <StatCard title="Avg Satisfaction" value={avgSatisfaction} format="percent" icon={<Star className="h-6 w-6" />} color="yellow" />
        <StatCard title="Lifetime Revenue" value={totalRevenue} format="currency" icon={<TrendingUp className="h-6 w-6" />} color="purple" />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Budget Tier</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Satisfaction</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Active Projects</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contract</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 text-sm font-bold text-white">
                        {client.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{client.name}</p>
                        <p className="text-xs text-gray-500">{client.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge variant={tierVariant(client.budgetTier)}>{client.budgetTier}</Badge></td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${satisfactionColor(client.satisfaction)}`}>
                      {satisfactionEmoji(client.satisfaction)} {client.satisfaction}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{client.activeProjects}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-700">{formatCurrency(client.totalRevenue)}</td>
                  <td className="px-6 py-4"><Badge>{client.contractType.replace('_', ' ')}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

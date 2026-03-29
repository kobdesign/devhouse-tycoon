import { DollarSign, TrendingUp, TrendingDown, Wallet, Receipt, PiggyBank, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { formatCurrency } from '@/lib/utils/format';

// Mock data for MVP
const monthlyData = {
  revenue: 4250000,
  expenses: 3180000,
  profit: 1070000,
  cashOnHand: 12500000,
  accountsReceivable: 3200000,
  accountsPayable: 890000,
  runway: 9.2,
};

const recentTransactions = [
  { id: '1', description: 'BankX Corp - Milestone 3 Payment', type: 'REVENUE', amount: 1200000, date: '2026-03-25', category: 'project_revenue' },
  { id: '2', description: 'Monthly Salaries', type: 'EXPENSE', amount: 2100000, date: '2026-03-25', category: 'salary' },
  { id: '3', description: 'AWS Cloud Services', type: 'EXPENSE', amount: 185000, date: '2026-03-22', category: 'cloud' },
  { id: '4', description: 'ShopEase - Retainer Fee', type: 'REVENUE', amount: 450000, date: '2026-03-20', category: 'project_revenue' },
  { id: '5', description: 'Office Rent - Q1', type: 'EXPENSE', amount: 350000, date: '2026-03-15', category: 'rent' },
  { id: '6', description: 'Jira + GitHub Licenses', type: 'EXPENSE', amount: 45000, date: '2026-03-10', category: 'tools' },
  { id: '7', description: 'DataFlow Inc - Sprint 8 Payment', type: 'REVENUE', amount: 890000, date: '2026-03-08', category: 'project_revenue' },
];

const expenseBreakdown = [
  { category: 'Salaries', amount: 2100000, percent: 66 },
  { category: 'Office & Rent', amount: 350000, percent: 11 },
  { category: 'Cloud & Hosting', amount: 285000, percent: 9 },
  { category: 'Tools & Licenses', amount: 145000, percent: 5 },
  { category: 'Marketing', amount: 180000, percent: 6 },
  { category: 'Other', amount: 120000, percent: 3 },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
        <p className="text-sm text-gray-500">Revenue, expenses, cash flow & P&L tracking</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Monthly Revenue" value={monthlyData.revenue} format="currency" change={12} icon={<TrendingUp className="h-6 w-6" />} color="green" />
        <StatCard title="Monthly Expenses" value={monthlyData.expenses} format="currency" change={-3} icon={<TrendingDown className="h-6 w-6" />} color="red" />
        <StatCard title="Net Profit" value={monthlyData.profit} format="currency" icon={<DollarSign className="h-6 w-6" />} color="green" />
        <StatCard title="Cash on Hand" value={monthlyData.cashOnHand} format="currency" icon={<Wallet className="h-6 w-6" />} color="blue" />
      </div>

      {/* Runway Banner */}
      <div className={`rounded-lg p-4 flex items-center gap-3 ${monthlyData.runway > 6 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
        <PiggyBank className={`h-5 w-5 ${monthlyData.runway > 6 ? 'text-emerald-600' : 'text-amber-600'}`} />
        <span className={`text-sm font-medium ${monthlyData.runway > 6 ? 'text-emerald-700' : 'text-amber-700'}`}>
          Runway: {monthlyData.runway} months — {monthlyData.runway > 6 ? 'Healthy' : 'Monitor closely'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Receipt className="h-5 w-5" /> Recent Transactions
          </h3>
          <div className="space-y-2">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.date} · {tx.category}</p>
                </div>
                <span className={`text-sm font-mono font-bold ${tx.type === 'REVENUE' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.type === 'REVENUE' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <AlertCircle className="h-5 w-5" /> Expense Breakdown
          </h3>
          <div className="space-y-3">
            {expenseBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.category}</span>
                  <span className="text-sm font-mono text-gray-500">{formatCurrency(item.amount)} ({item.percent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

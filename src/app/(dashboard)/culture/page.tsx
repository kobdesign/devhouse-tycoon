import { Heart, Smile, Users, PartyPopper, Trophy, TrendingDown, Coffee, Briefcase } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { MoraleIndicator } from '@/components/common/MoraleIndicator';

const departments = [
  { name: 'Engineering', headcount: 42, morale: 74, attrition: 8 },
  { name: 'Design', headcount: 8, morale: 88, attrition: 0 },
  { name: 'QA', headcount: 12, morale: 68, attrition: 12 },
  { name: 'DevOps', headcount: 6, morale: 82, attrition: 5 },
  { name: 'Project Management', headcount: 8, morale: 55, attrition: 15 },
  { name: 'Sales & Marketing', headcount: 7, morale: 71, attrition: 10 },
  { name: 'HR & Admin', headcount: 4, morale: 80, attrition: 0 },
];

const upcomingEvents = [
  { name: 'Monthly Town Hall', date: '2026-04-01', type: 'meeting', emoji: '📢' },
  { name: 'Songkran Party', date: '2026-04-11', type: 'party', emoji: '🎉' },
  { name: 'Hackathon: AI Edition', date: '2026-04-18', type: 'hackathon', emoji: '💻' },
  { name: 'Team Building - Koh Samet', date: '2026-05-02', type: 'offsite', emoji: '🏖️' },
  { name: 'Tech Talk: Rust in Production', date: '2026-04-08', type: 'learning', emoji: '📚' },
];

const benefits = [
  { name: 'Health Insurance', enrolled: 87, total: 87, icon: '🏥' },
  { name: 'Gym Membership', enrolled: 34, total: 87, icon: '💪' },
  { name: 'Learning Budget', enrolled: 52, total: 87, icon: '📚' },
  { name: 'Remote Work', enrolled: 45, total: 87, icon: '🏠' },
  { name: 'Meal Allowance', enrolled: 87, total: 87, icon: '🍱' },
];

export default function CulturePage() {
  const avgMorale = Math.round(departments.reduce((s, d) => s + d.morale * d.headcount, 0) / departments.reduce((s, d) => s + d.headcount, 0));
  const totalHeadcount = departments.reduce((s, d) => s + d.headcount, 0);
  const avgAttrition = Math.round(departments.reduce((s, d) => s + d.attrition, 0) / departments.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Culture & Wellbeing</h1>
        <p className="text-sm text-gray-500">Team morale, events, benefits & company culture</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Overall Morale" value={avgMorale} format="percent" icon={<Smile className="h-6 w-6" />} color="green" />
        <StatCard title="Culture Score" value={78} format="percent" icon={<Heart className="h-6 w-6" />} color="purple" />
        <StatCard title="Headcount" value={totalHeadcount} icon={<Users className="h-6 w-6" />} color="blue" />
        <StatCard title="Avg Attrition Rate" value={avgAttrition} format="percent" icon={<TrendingDown className="h-6 w-6" />} color="red" />
      </div>

      {/* Glassdoor-style Culture Banner */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">🌟 Culture Quest Active</h3>
            <p className="mt-1 text-emerald-100">Improve team morale to 80%+ across all departments this quarter</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{avgMorale}%</p>
            <p className="text-sm text-emerald-200">Current avg → Target: 80%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Department Morale */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Department Morale</h3>
          <div className="space-y-3">
            {departments.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <p className="text-sm font-medium text-gray-900">{dept.name}</p>
                    <p className="text-xs text-gray-500">{dept.headcount} people</p>
                  </div>
                  <MoraleIndicator value={dept.morale} size="sm" />
                </div>
                <div className="text-xs text-gray-500">
                  Attrition: <span className={dept.attrition > 10 ? 'text-red-500 font-bold' : 'text-gray-600'}>{dept.attrition}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <PartyPopper className="h-5 w-5" /> Upcoming Events
            </h3>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div key={event.name} className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5">
                  <span className="text-lg">{event.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.name}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Coffee className="h-5 w-5" /> Benefits Enrollment
            </h3>
            <div className="space-y-2">
              {benefits.map((b) => (
                <div key={b.name} className="flex items-center justify-between text-sm">
                  <span>{b.icon} {b.name}</span>
                  <span className="text-xs text-gray-500">{b.enrolled}/{b.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

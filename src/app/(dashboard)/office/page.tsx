import { Building2, Monitor, Cloud, Wifi, DoorOpen, Server } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';
import { formatCurrency } from '@/lib/utils/format';

const offices = [
  { id: '1', name: 'HQ - Sathorn Tower', location: 'Bangkok', size: '450 sqm', capacity: 120, currentOccupancy: 87, monthlyRent: 350000, type: 'owned' },
  { id: '2', name: 'Dev Hub - Ari', location: 'Bangkok', size: '200 sqm', capacity: 50, currentOccupancy: 38, monthlyRent: 150000, type: 'rented' },
  { id: '3', name: 'Remote Office - Chiang Mai', location: 'Chiang Mai', size: '80 sqm', capacity: 20, currentOccupancy: 12, monthlyRent: 45000, type: 'coworking' },
];

const infrastructure = [
  { name: 'AWS (Production)', cost: 185000, status: 'healthy', usage: 72 },
  { name: 'GCP (Staging)', cost: 45000, status: 'healthy', usage: 35 },
  { name: 'GitHub Enterprise', cost: 28000, status: 'healthy', usage: 95 },
  { name: 'Jira Cloud', cost: 18000, status: 'healthy', usage: 88 },
  { name: 'Slack Business+', cost: 32000, status: 'healthy', usage: 92 },
  { name: 'Figma Enterprise', cost: 15000, status: 'healthy', usage: 65 },
];

export default function OfficePage() {
  const totalRent = offices.reduce((sum, o) => sum + o.monthlyRent, 0);
  const totalCloudCost = infrastructure.reduce((sum, i) => sum + i.cost, 0);
  const totalCapacity = offices.reduce((sum, o) => sum + o.capacity, 0);
  const totalOccupancy = offices.reduce((sum, o) => sum + o.currentOccupancy, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Office & Infrastructure</h1>
        <p className="text-sm text-gray-500">Manage offices, equipment, cloud & tool licenses</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Capacity" value={totalCapacity} icon={<Building2 className="h-6 w-6" />} color="blue" />
        <StatCard title="Occupancy" value={Math.round((totalOccupancy / totalCapacity) * 100)} format="percent" icon={<DoorOpen className="h-6 w-6" />} color="green" />
        <StatCard title="Office Rent/mo" value={totalRent} format="currency" icon={<Building2 className="h-6 w-6" />} color="yellow" />
        <StatCard title="Cloud & Tools/mo" value={totalCloudCost} format="currency" icon={<Cloud className="h-6 w-6" />} color="purple" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Offices */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Building2 className="h-5 w-5" /> Office Locations
          </h3>
          <div className="space-y-3">
            {offices.map((office) => (
              <div key={office.id} className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{office.name}</p>
                    <p className="text-xs text-gray-500">{office.location} · {office.size}</p>
                  </div>
                  <Badge variant={office.type === 'owned' ? 'success' : office.type === 'rented' ? 'info' : 'warning'}>
                    {office.type}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Occupancy: {office.currentOccupancy}/{office.capacity}</span>
                  <span className="font-mono text-gray-600">{formatCurrency(office.monthlyRent)}/mo</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${(office.currentOccupancy / office.capacity) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Server className="h-5 w-5" /> Cloud & Tools
          </h3>
          <div className="space-y-3">
            {infrastructure.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Usage: {item.usage}%</p>
                  </div>
                </div>
                <span className="text-sm font-mono text-gray-600">{formatCurrency(item.cost)}/mo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

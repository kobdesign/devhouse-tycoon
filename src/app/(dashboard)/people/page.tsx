import { Users, UserPlus, GraduationCap, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';
import { MoraleIndicator } from '@/components/common/MoraleIndicator';
import { XpBar } from '@/components/common/XpBar';

// Mock data for MVP
const employees = [
  { id: '1', name: 'Somchai Jaidee', position: 'Senior Backend Developer', department: 'ENGINEERING', skills: ['Java', 'Spring', 'AWS'], salary: 85000, morale: 82, xp: 2450, level: 5, isActive: true },
  { id: '2', name: 'Ploy Srisuwan', position: 'Tech Lead', department: 'ENGINEERING', skills: ['React', 'TypeScript', 'Node.js'], salary: 120000, morale: 78, xp: 2280, level: 5, isActive: true },
  { id: '3', name: 'Nattapong Pimpa', position: 'Senior Frontend Developer', department: 'ENGINEERING', skills: ['React', 'Vue', 'Tailwind'], salary: 80000, morale: 65, xp: 2100, level: 5, isActive: true },
  { id: '4', name: 'Krit Wongsakul', position: 'DevOps Engineer', department: 'DEVOPS', skills: ['Docker', 'K8s', 'Terraform'], salary: 95000, morale: 88, xp: 1950, level: 4, isActive: true },
  { id: '5', name: 'Fah Maneerat', position: 'QA Lead', department: 'QA', skills: ['Selenium', 'Cypress', 'Jest'], salary: 75000, morale: 71, xp: 1820, level: 4, isActive: true },
  { id: '6', name: 'Boom Thanakrit', position: 'Project Manager', department: 'PROJECT_MANAGEMENT', skills: ['Agile', 'Scrum', 'Jira'], salary: 90000, morale: 55, xp: 1600, level: 4, isActive: true },
  { id: '7', name: 'Mint Parichat', position: 'UI/UX Designer', department: 'DESIGN', skills: ['Figma', 'Sketch', 'Prototyping'], salary: 70000, morale: 90, xp: 1400, level: 4, isActive: true },
  { id: '8', name: 'Top Thanawat', position: 'Junior Backend Developer', department: 'ENGINEERING', skills: ['Python', 'Django', 'PostgreSQL'], salary: 35000, morale: 85, xp: 600, level: 2, isActive: true },
];

const departmentColors: Record<string, 'info' | 'success' | 'warning' | 'danger' | 'default'> = {
  ENGINEERING: 'info',
  DEVOPS: 'success',
  QA: 'warning',
  PROJECT_MANAGEMENT: 'default',
  DESIGN: 'danger',
};

export default function PeoplePage() {
  const avgMorale = Math.round(employees.reduce((sum, e) => sum + e.morale, 0) / employees.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">People</h1>
          <p className="text-sm text-gray-500">Manage your team, track performance & growth</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
          <UserPlus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Employees" value={employees.length} icon={<Users className="h-6 w-6" />} color="blue" />
        <StatCard title="Avg Morale" value={avgMorale} format="percent" icon={<TrendingUp className="h-6 w-6" />} color="green" />
        <StatCard title="In Training" value={3} icon={<GraduationCap className="h-6 w-6" />} color="yellow" />
        <StatCard title="Open Positions" value={5} icon={<UserPlus className="h-6 w-6" />} color="purple" />
      </div>

      {/* Employee Table */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Skills</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Morale</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Level & XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-sm font-bold text-white">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={departmentColors[emp.department] ?? 'default'}>
                      {emp.department.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {emp.skills.map((skill) => (
                        <span key={skill} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <MoraleIndicator value={emp.morale} size="sm" />
                  </td>
                  <td className="px-6 py-4 w-48">
                    <XpBar xp={emp.xp} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

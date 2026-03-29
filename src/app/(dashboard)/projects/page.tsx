import { FolderKanban, Plus, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';

// Mock data for MVP
const projects = [
  { id: '1', name: 'FinTech Mobile App', client: 'BankX Corp', status: 'ACTIVE', techStack: ['React Native', 'Node.js', 'PostgreSQL'], deadline: '2026-05-15', progress: 75, budget: 3500000, methodology: 'agile' },
  { id: '2', name: 'E-commerce Platform', client: 'ShopEase', status: 'ACTIVE', techStack: ['Next.js', 'Prisma', 'Stripe'], deadline: '2026-04-30', progress: 45, budget: 2800000, methodology: 'agile' },
  { id: '3', name: 'Cloud Migration', client: 'DataFlow Inc', status: 'ACTIVE', techStack: ['AWS', 'Terraform', 'Docker'], deadline: '2026-04-10', progress: 90, budget: 5000000, methodology: 'kanban' },
  { id: '4', name: 'AI Chatbot', client: 'ServicePro', status: 'ACTIVE', techStack: ['Python', 'LangChain', 'FastAPI'], deadline: '2026-07-01', progress: 20, budget: 1500000, methodology: 'agile' },
  { id: '5', name: 'Legacy ERP Migration', client: 'MegaCorp', status: 'PLANNING', techStack: ['Java', 'Spring Boot', 'Oracle'], deadline: '2026-12-31', progress: 5, budget: 12000000, methodology: 'waterfall' },
  { id: '6', name: 'HR Portal Redesign', client: 'PeopleSoft Co', status: 'COMPLETED', techStack: ['React', 'Tailwind', 'Supabase'], deadline: '2026-03-01', progress: 100, budget: 800000, methodology: 'agile' },
];

const statusVariant: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
  ACTIVE: 'info',
  COMPLETED: 'success',
  PLANNING: 'warning',
  ON_HOLD: 'default',
};

function getDaysUntilDeadline(deadline: string): number {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function getDeadlineColor(days: number): string {
  if (days < 0) return 'text-red-600';
  if (days < 7) return 'text-red-500';
  if (days < 30) return 'text-amber-500';
  return 'text-gray-500';
}

export default function ProjectsPage() {
  const activeProjects = projects.filter(p => p.status === 'ACTIVE').length;
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500">Track project delivery, deadlines & budgets</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Projects" value={activeProjects} icon={<FolderKanban className="h-6 w-6" />} color="blue" />
        <StatCard title="Completed" value={completedProjects} icon={<CheckCircle2 className="h-6 w-6" />} color="green" />
        <StatCard title="At Risk" value={1} icon={<AlertTriangle className="h-6 w-6" />} color="red" />
        <StatCard title="Total Budget" value={totalBudget} format="currency" icon={<Clock className="h-6 w-6" />} color="purple" />
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const daysLeft = getDaysUntilDeadline(project.deadline);
          const deadlineColor = getDeadlineColor(daysLeft);

          return (
            <div
              key={project.id}
              className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-xs text-gray-500">{project.client}</p>
                </div>
                <Badge variant={statusVariant[project.status] ?? 'default'}>
                  {project.status}
                </Badge>
              </div>

              {/* Tech Stack */}
              <div className="mt-3 flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded bg-purple-50 px-2 py-0.5 text-xs text-purple-600">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-mono font-bold text-gray-700">{project.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      project.progress === 100 ? 'bg-emerald-500' : project.progress >= 75 ? 'bg-blue-500' : project.progress >= 50 ? 'bg-amber-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className={deadlineColor}>
                  {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today!' : `${Math.abs(daysLeft)} days overdue`}
                </span>
                <span className="font-mono text-gray-500">
                  ฿{(project.budget / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

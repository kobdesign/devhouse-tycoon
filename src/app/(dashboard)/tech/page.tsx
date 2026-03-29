import { Cpu, GitBranch, Package, Lightbulb, TrendingUp, Star } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';

type AdoptionLevel = 'ADOPT' | 'TRIAL' | 'ASSESS' | 'HOLD';

const techRadar: { name: string; category: string; adoption: AdoptionLevel; trend: 'up' | 'stable' | 'down'; inUse: boolean }[] = [
  { name: 'React / Next.js', category: 'Frontend', adoption: 'ADOPT', trend: 'up', inUse: true },
  { name: 'TypeScript', category: 'Language', adoption: 'ADOPT', trend: 'up', inUse: true },
  { name: 'Node.js', category: 'Backend', adoption: 'ADOPT', trend: 'stable', inUse: true },
  { name: 'PostgreSQL', category: 'Database', adoption: 'ADOPT', trend: 'stable', inUse: true },
  { name: 'AWS', category: 'Cloud', adoption: 'ADOPT', trend: 'stable', inUse: true },
  { name: 'Docker / K8s', category: 'DevOps', adoption: 'ADOPT', trend: 'up', inUse: true },
  { name: 'Rust', category: 'Language', adoption: 'TRIAL', trend: 'up', inUse: false },
  { name: 'Go', category: 'Backend', adoption: 'TRIAL', trend: 'up', inUse: true },
  { name: 'GraphQL', category: 'API', adoption: 'TRIAL', trend: 'stable', inUse: true },
  { name: 'AI/ML (LangChain)', category: 'AI', adoption: 'TRIAL', trend: 'up', inUse: true },
  { name: 'Deno', category: 'Runtime', adoption: 'ASSESS', trend: 'up', inUse: false },
  { name: 'Web3 / Blockchain', category: 'Platform', adoption: 'ASSESS', trend: 'down', inUse: false },
  { name: 'jQuery', category: 'Frontend', adoption: 'HOLD', trend: 'down', inUse: false },
  { name: 'AngularJS (1.x)', category: 'Frontend', adoption: 'HOLD', trend: 'down', inUse: false },
];

const adoptionColors: Record<AdoptionLevel, 'success' | 'info' | 'warning' | 'danger'> = {
  ADOPT: 'success', TRIAL: 'info', ASSESS: 'warning', HOLD: 'danger',
};

const githubStats = [
  { name: 'fintech-mobile-app', stars: 0, prs: 12, commits: 234, language: 'TypeScript' },
  { name: 'ecommerce-platform', stars: 3, prs: 8, commits: 189, language: 'TypeScript' },
  { name: 'cloud-migration-scripts', stars: 15, prs: 5, commits: 78, language: 'Go' },
  { name: 'ai-chatbot-service', stars: 42, prs: 18, commits: 156, language: 'Python' },
  { name: 'shared-ui-components', stars: 28, prs: 3, commits: 312, language: 'TypeScript' },
];

export default function TechPage() {
  const adoptCount = techRadar.filter(t => t.adoption === 'ADOPT').length;
  const inUseCount = techRadar.filter(t => t.inUse).length;
  const totalCommits = githubStats.reduce((s, r) => s + r.commits, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tech & R&D</h1>
        <p className="text-sm text-gray-500">Technology radar, GitHub activity & innovation tracking</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Tech Stack Size" value={inUseCount} icon={<Cpu className="h-6 w-6" />} color="blue" />
        <StatCard title="Adopted Technologies" value={adoptCount} icon={<Star className="h-6 w-6" />} color="green" />
        <StatCard title="Active Repos" value={githubStats.length} icon={<GitBranch className="h-6 w-6" />} color="purple" />
        <StatCard title="Total Commits (month)" value={totalCommits} icon={<TrendingUp className="h-6 w-6" />} color="yellow" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tech Radar */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Lightbulb className="h-5 w-5" /> Tech Radar
          </h3>
          {(['ADOPT', 'TRIAL', 'ASSESS', 'HOLD'] as AdoptionLevel[]).map((level) => (
            <div key={level} className="mb-4">
              <h4 className="mb-2 text-xs font-bold text-gray-400 uppercase">{level}</h4>
              <div className="flex flex-wrap gap-2">
                {techRadar.filter(t => t.adoption === level).map((tech) => (
                  <div key={tech.name} className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5">
                    <Badge variant={adoptionColors[level]} size="sm">{tech.category}</Badge>
                    <span className="text-sm text-gray-700">{tech.name}</span>
                    <span className="text-xs">{tech.trend === 'up' ? '📈' : tech.trend === 'down' ? '📉' : '➡️'}</span>
                    {tech.inUse && <span className="text-[10px] text-emerald-500">●</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Repos */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GitBranch className="h-5 w-5" /> GitHub Repositories
          </h3>
          <div className="space-y-3">
            {githubStats.map((repo) => (
              <div key={repo.name} className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{repo.name}</p>
                    <p className="text-xs text-gray-500">{repo.language}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="h-3 w-3" /> {repo.stars}
                  </div>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>{repo.prs} open PRs</span>
                  <span>{repo.commits} commits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

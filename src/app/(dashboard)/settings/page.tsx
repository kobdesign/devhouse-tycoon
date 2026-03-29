import { Settings, Link2, Database, Shield, Bell, Globe } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

const integrations = [
  { name: 'Google Workspace', description: 'Sheets, Calendar, Drive', status: 'connected', icon: '🟢' },
  { name: 'Jira Cloud', description: 'Projects, sprints, tasks', status: 'connected', icon: '🟢' },
  { name: 'GitHub', description: 'Repos, PRs, commits', status: 'connected', icon: '🟢' },
  { name: 'Slack', description: 'Notifications, team comms', status: 'disconnected', icon: '🔴' },
  { name: 'Linear', description: 'Issue tracking (alternative)', status: 'not_configured', icon: '⚪' },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Configure integrations, roles & system preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Integrations */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Link2 className="h-5 w-5" /> Integrations
          </h3>
          <div className="space-y-3">
            {integrations.map((int) => (
              <div key={int.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span>{int.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{int.name}</p>
                    <p className="text-xs text-gray-500">{int.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={int.status === 'connected' ? 'success' : int.status === 'disconnected' ? 'danger' : 'default'}>
                    {int.status.replace('_', ' ')}
                  </Badge>
                  <button className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                    {int.status === 'connected' ? 'Configure' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Settings */}
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Database className="h-5 w-5" /> Data Sync
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Auto-sync interval</span>
                <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
                  <option>Every 15 minutes</option>
                  <option>Every 30 minutes</option>
                  <option>Every hour</option>
                  <option>Manual only</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Last sync</span>
                <span className="text-sm text-gray-500">5 minutes ago</span>
              </div>
              <button className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
                Sync Now
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Shield className="h-5 w-5" /> Roles & Access
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between"><span>Admin</span><Badge variant="danger">Full Access</Badge></div>
              <div className="flex items-center justify-between"><span>Manager</span><Badge variant="warning">Department Data</Badge></div>
              <div className="flex items-center justify-between"><span>Team Lead</span><Badge variant="info">Team Data</Badge></div>
              <div className="flex items-center justify-between"><span>Member</span><Badge variant="default">Own Data</Badge></div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Globe className="h-5 w-5" /> Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Currency</span>
                <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
                  <option>฿ THB</option>
                  <option>$ USD</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Language</span>
                <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
                  <option>ไทย</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

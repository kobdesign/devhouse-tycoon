export interface AchievementDef {
  code: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  category: string;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDef[] = [
  // Delivery
  { code: 'FIRST_TASK', name: 'First Blood', description: 'Complete your first task', icon: '🎯', xpReward: 50, category: 'delivery' },
  { code: 'TASK_MASTER_50', name: 'Task Master', description: 'Complete 50 tasks', icon: '⚡', xpReward: 200, category: 'delivery' },
  { code: 'ON_TIME_STREAK_5', name: 'Punctual Pro', description: '5 consecutive on-time deliveries', icon: '⏰', xpReward: 300, category: 'delivery' },
  { code: 'ZERO_BUG_SPRINT', name: 'Bug Slayer', description: 'Complete a sprint with zero bugs', icon: '🛡️', xpReward: 150, category: 'quality' },

  // Growth
  { code: 'XP_1000', name: 'Rising Star', description: 'Earn 1,000 total XP', icon: '⭐', xpReward: 100, category: 'growth' },
  { code: 'XP_5000', name: 'Veteran', description: 'Earn 5,000 total XP', icon: '🌟', xpReward: 250, category: 'growth' },
  { code: 'LEVEL_5', name: 'Level Up!', description: 'Reach level 5', icon: '🎮', xpReward: 200, category: 'growth' },
  { code: 'LEVEL_10', name: 'Elite', description: 'Reach level 10', icon: '👑', xpReward: 500, category: 'growth' },
  { code: 'CERT_EARNED', name: 'Certified', description: 'Earn a professional certification', icon: '📜', xpReward: 300, category: 'growth' },

  // Teamwork
  { code: 'CODE_REVIEW_20', name: 'Reviewer', description: 'Complete 20 code reviews', icon: '👀', xpReward: 150, category: 'teamwork' },
  { code: 'MENTOR', name: 'Mentor', description: 'Help 3 junior devs level up', icon: '🧑‍🏫', xpReward: 300, category: 'teamwork' },

  // Finance
  { code: 'REVENUE_1M', name: 'Money Maker', description: 'Project generates ฿1M+ revenue', icon: '💰', xpReward: 200, category: 'finance' },
  { code: 'REVENUE_10M', name: 'Cash Machine', description: 'Project generates ฿10M+ revenue', icon: '💎', xpReward: 500, category: 'finance' },
  { code: 'UNDER_BUDGET', name: 'Budget Hero', description: 'Deliver a project under budget', icon: '📉', xpReward: 200, category: 'finance' },

  // Company
  { code: 'COMPANY_LEVEL_5', name: 'Growing Business', description: 'Company reaches level 5', icon: '🏢', xpReward: 300, category: 'company' },
  { code: 'COMPANY_LEVEL_10', name: 'Industry Leader', description: 'Company reaches level 10', icon: '🏛️', xpReward: 500, category: 'company' },
];

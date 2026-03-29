import { prisma } from '@/lib/db';

// XP values for different actions
export const XP_VALUES = {
  TASK_COMPLETED: 10,
  BUG_FIXED: 15,
  PR_MERGED: 5,
  CODE_REVIEW: 3,
  ON_TIME_DELIVERY: 100,
  EARLY_DELIVERY: 150,
  LATE_DELIVERY: -50,
  TRAINING_COMPLETED: 50,
  CERTIFICATION_EARNED: 200,
  ZERO_BUG_SPRINT: 75,
  CLIENT_SATISFACTION_90: 100,
  REVENUE_MILESTONE: 500,
} as const;

export async function awardXp(userId: string, amount: number, source: string, sourceId?: string) {
  const record = await prisma.xpRecord.create({
    data: { userId, amount, source, sourceId },
  });

  // Update employee XP total
  const employee = await prisma.employee.findFirst({ where: { userId } });
  if (employee) {
    await prisma.employee.update({
      where: { id: employee.id },
      data: { xp: { increment: amount } },
    });
  }

  // Check for achievement unlocks
  await checkAchievements(userId);

  return record;
}

export async function getLeaderboard(limit: number = 10) {
  const employees = await prisma.employee.findMany({
    where: { isActive: true },
    orderBy: { xp: 'desc' },
    take: limit,
    include: {
      user: {
        include: {
          achievements: true,
        },
      },
    },
  });

  return employees.map((emp, index) => ({
    rank: index + 1,
    employeeId: emp.id,
    name: emp.name,
    avatar: emp.avatar,
    position: emp.position,
    department: emp.department,
    totalXp: emp.xp,
    level: emp.level,
    achievementCount: emp.user?.achievements.length ?? 0,
  }));
}

export async function getUserXpHistory(userId: string, days: number = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  return prisma.xpRecord.findMany({
    where: {
      userId,
      createdAt: { gte: since },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

async function checkAchievements(userId: string) {
  const employee = await prisma.employee.findFirst({
    where: { userId },
    include: { user: { include: { achievements: true } } },
  });
  if (!employee || !employee.user) return;

  const existingCodes = new Set(
    employee.user.achievements.map((a) => a.achievementId)
  );

  const allAchievements = await prisma.achievement.findMany();

  for (const achievement of allAchievements) {
    if (existingCodes.has(achievement.id)) continue;

    const earned = await evaluateAchievement(achievement.code, userId, employee.xp);
    if (earned) {
      await prisma.userAchievement.create({
        data: { userId, achievementId: achievement.id },
      });
      // Award bonus XP for achievement
      await prisma.xpRecord.create({
        data: {
          userId,
          amount: achievement.xpReward,
          source: 'achievement_unlocked',
          sourceId: achievement.id,
        },
      });
    }
  }
}

async function evaluateAchievement(code: string, userId: string, totalXp: number): Promise<boolean> {
  switch (code) {
    case 'FIRST_TASK':
      return (await prisma.xpRecord.count({ where: { userId, source: 'TASK_COMPLETED' } })) >= 1;
    case 'XP_1000':
      return totalXp >= 1000;
    case 'XP_5000':
      return totalXp >= 5000;
    case 'LEVEL_5':
      return calculateLevel(totalXp) >= 5;
    case 'LEVEL_10':
      return calculateLevel(totalXp) >= 10;
    default:
      return false;
  }
}

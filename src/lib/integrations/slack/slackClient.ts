import { WebClient } from '@slack/web-api';

function getSlackClient(): WebClient {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) throw new Error('SLACK_BOT_TOKEN not configured');
  return new WebClient(token);
}

export async function sendNotification(channel: string, text: string, blocks?: object[]) {
  const client = getSlackClient();
  await client.chat.postMessage({
    channel,
    text,
    blocks: blocks as never[],
  });
}

export async function sendAchievementNotification(channel: string, userName: string, achievement: string, xp: number) {
  await sendNotification(channel, `🏆 ${userName} unlocked: ${achievement}`, [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `🏆 *Achievement Unlocked!*\n*${userName}* just earned *${achievement}*\n+${xp} XP`,
      },
    },
  ]);
}

export async function sendDeadlineAlert(channel: string, projectName: string, daysLeft: number) {
  const emoji = daysLeft <= 3 ? '🚨' : '⏰';
  await sendNotification(channel, `${emoji} ${projectName}: ${daysLeft} days until deadline`, [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${emoji} *Deadline Alert*\n*${projectName}* has *${daysLeft} days* remaining`,
      },
    },
  ]);
}

export async function sendWeeklySummary(channel: string, summary: {
  projectsCompleted: number;
  tasksCompleted: number;
  revenue: number;
  topPerformer: string;
  companyXp: number;
}) {
  await sendNotification(channel, 'Weekly DevHouse Tycoon Summary', [
    {
      type: 'header',
      text: { type: 'plain_text', text: '📊 Weekly Summary — DevHouse Tycoon' },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Projects Completed:* ${summary.projectsCompleted}` },
        { type: 'mrkdwn', text: `*Tasks Done:* ${summary.tasksCompleted}` },
        { type: 'mrkdwn', text: `*Revenue:* ฿${summary.revenue.toLocaleString()}` },
        { type: 'mrkdwn', text: `*Top Performer:* ${summary.topPerformer}` },
        { type: 'mrkdwn', text: `*Company XP:* +${summary.companyXp}` },
      ],
    },
  ]);
}

export async function getChannelActivity(channelId: string, days: number = 7) {
  const client = getSlackClient();
  const oldest = Math.floor((Date.now() - days * 24 * 60 * 60 * 1000) / 1000).toString();

  const result = await client.conversations.history({
    channel: channelId,
    oldest,
    limit: 200,
  });

  const messages = result.messages ?? [];
  const uniqueUsers = new Set(messages.map((m) => m.user).filter(Boolean));

  return {
    messageCount: messages.length,
    activeUsers: uniqueUsers.size,
    avgMessagesPerDay: Math.round(messages.length / days),
  };
}

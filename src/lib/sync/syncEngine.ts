import { prisma } from '@/lib/db';
import { syncHrData, syncProjectData, syncFinanceData } from '@/lib/integrations/google/sheetsClient';

type SyncSource = 'google' | 'jira' | 'github' | 'slack';

async function logSync(source: SyncSource, action: string, status: string, details?: string, recordsAffected: number = 0) {
  return prisma.syncLog.create({
    data: {
      source,
      action,
      status,
      details,
      recordsAffected,
      completedAt: status !== 'in_progress' ? new Date() : undefined,
    },
  });
}

export async function syncGoogleSheets(): Promise<{ hr: number; projects: number; finance: number }> {
  const log = await logSync('google', 'full_sync', 'in_progress');

  try {
    // Sync HR data
    const hrData = await syncHrData();
    let hrCount = 0;
    for (const emp of hrData) {
      await prisma.employee.upsert({
        where: { email: emp.email },
        update: {
          name: emp.name,
          position: emp.position,
          department: emp.department as never,
          skills: emp.skills,
          salary: emp.salary,
        },
        create: {
          name: emp.name,
          email: emp.email,
          position: emp.position,
          department: emp.department as never,
          skills: emp.skills,
          salary: emp.salary,
          hireDate: new Date(emp.hireDate),
        },
      });
      hrCount++;
    }

    // Sync Project data
    const projectData = await syncProjectData();
    let projectCount = 0;
    for (const proj of projectData) {
      const client = proj.client
        ? await prisma.client.findFirst({ where: { name: proj.client } })
        : null;

      await prisma.project.upsert({
        where: { id: proj.name }, // Use name as lookup for now
        update: {
          status: proj.status as never,
          techStack: proj.techStack,
          progress: proj.progress,
        },
        create: {
          name: proj.name,
          clientId: client?.id,
          status: proj.status as never,
          techStack: proj.techStack,
          deadline: proj.deadline ? new Date(proj.deadline) : null,
          budget: proj.budget,
          progress: proj.progress,
        },
      });
      projectCount++;
    }

    // Sync Finance data
    const financeData = await syncFinanceData();
    let financeCount = 0;
    for (const tx of financeData) {
      await prisma.finance.create({
        data: {
          type: tx.type as never,
          amount: tx.amount,
          category: tx.category,
          description: tx.description,
          date: new Date(tx.date),
        },
      });
      financeCount++;
    }

    const total = hrCount + projectCount + financeCount;
    await prisma.syncLog.update({
      where: { id: log.id },
      data: { status: 'success', recordsAffected: total, completedAt: new Date() },
    });

    return { hr: hrCount, projects: projectCount, finance: financeCount };
  } catch (error) {
    await prisma.syncLog.update({
      where: { id: log.id },
      data: {
        status: 'failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      },
    });
    throw error;
  }
}

export async function getLastSyncStatus(source?: SyncSource) {
  return prisma.syncLog.findFirst({
    where: source ? { source } : undefined,
    orderBy: { startedAt: 'desc' },
  });
}

export async function getSyncHistory(limit: number = 20) {
  return prisma.syncLog.findMany({
    orderBy: { startedAt: 'desc' },
    take: limit,
  });
}

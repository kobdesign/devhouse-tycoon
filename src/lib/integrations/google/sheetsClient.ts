import { google, sheets_v4 } from 'googleapis';

export function getGoogleAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export function getSheetsClient(): sheets_v4.Sheets {
  const auth = getGoogleAuth();
  return google.sheets({ version: 'v4', auth });
}

export async function readSheet(spreadsheetId: string, range: string): Promise<string[][]> {
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return (response.data.values as string[][]) ?? [];
}

export async function writeSheet(spreadsheetId: string, range: string, values: string[][]): Promise<void> {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

export async function appendSheet(spreadsheetId: string, range: string, values: string[][]): Promise<void> {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

// Sync helpers for each module
export async function syncHrData() {
  const sheetId = process.env.GOOGLE_SHEETS_HR_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEETS_HR_ID not configured');

  const rows = await readSheet(sheetId, 'Employees!A2:Z');
  return rows.map((row) => ({
    name: row[0],
    email: row[1],
    position: row[2],
    department: row[3],
    skills: row[4]?.split(',').map((s) => s.trim()) ?? [],
    salary: parseFloat(row[5] ?? '0'),
    hireDate: row[6],
    status: row[7] ?? 'active',
  }));
}

export async function syncProjectData() {
  const sheetId = process.env.GOOGLE_SHEETS_PROJECTS_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEETS_PROJECTS_ID not configured');

  const rows = await readSheet(sheetId, 'Projects!A2:Z');
  return rows.map((row) => ({
    name: row[0],
    client: row[1],
    status: row[2],
    techStack: row[3]?.split(',').map((s) => s.trim()) ?? [],
    deadline: row[4],
    budget: parseFloat(row[5] ?? '0'),
    progress: parseInt(row[6] ?? '0', 10),
  }));
}

export async function syncFinanceData() {
  const sheetId = process.env.GOOGLE_SHEETS_FINANCE_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEETS_FINANCE_ID not configured');

  const rows = await readSheet(sheetId, 'Transactions!A2:Z');
  return rows.map((row) => ({
    date: row[0],
    type: row[1] as 'REVENUE' | 'EXPENSE',
    amount: parseFloat(row[2] ?? '0'),
    category: row[3],
    description: row[4],
  }));
}

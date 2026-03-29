interface JiraConfig {
  baseUrl: string;
  email: string;
  apiToken: string;
}

function getConfig(): JiraConfig {
  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;
  if (!baseUrl || !email || !apiToken) {
    throw new Error('Jira configuration missing. Set JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN');
  }
  return { baseUrl, email, apiToken };
}

function getHeaders(config: JiraConfig): HeadersInit {
  const credentials = Buffer.from(`${config.email}:${config.apiToken}`).toString('base64');
  return {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

async function jiraFetch<T>(path: string): Promise<T> {
  const config = getConfig();
  const response = await fetch(`${config.baseUrl}/rest/api/3${path}`, {
    headers: getHeaders(config),
  });
  if (!response.ok) throw new Error(`Jira API error: ${response.status} ${response.statusText}`);
  return response.json() as Promise<T>;
}

export async function getProjects() {
  return jiraFetch<{ values: JiraProject[] }>('/project/search?maxResults=50');
}

export async function getProjectIssues(projectKey: string) {
  return jiraFetch<{ issues: JiraIssue[] }>(
    `/search?jql=project=${projectKey}&maxResults=100&fields=summary,status,assignee,priority,issuetype,story_points,sprint`
  );
}

export async function getSprints(boardId: number) {
  const config = getConfig();
  const response = await fetch(
    `${config.baseUrl}/rest/agile/1.0/board/${boardId}/sprint?state=active,future`,
    { headers: getHeaders(config) }
  );
  if (!response.ok) throw new Error(`Jira API error: ${response.status}`);
  return response.json() as Promise<{ values: JiraSprint[] }>;
}

export async function getVelocity(boardId: number) {
  const config = getConfig();
  const response = await fetch(
    `${config.baseUrl}/rest/agile/1.0/board/${boardId}/sprint?state=closed&maxResults=5`,
    { headers: getHeaders(config) }
  );
  if (!response.ok) throw new Error(`Jira API error: ${response.status}`);
  return response.json() as Promise<{ values: JiraSprint[] }>;
}

// Types
interface JiraProject {
  id: string;
  key: string;
  name: string;
  projectCategory?: { name: string };
}

interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary: string;
    status: { name: string };
    assignee?: { displayName: string; accountId: string };
    priority: { name: string };
    issuetype: { name: string };
  };
}

interface JiraSprint {
  id: number;
  name: string;
  state: string;
  startDate: string;
  endDate: string;
  completeDate?: string;
}

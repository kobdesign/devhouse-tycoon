import { Octokit } from '@octokit/rest';

function getOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not configured');
  return new Octokit({ auth: token });
}

function getOrg(): string {
  const org = process.env.GITHUB_ORG;
  if (!org) throw new Error('GITHUB_ORG not configured');
  return org;
}

export async function getOrgRepos() {
  const octokit = getOctokit();
  const org = getOrg();
  const { data } = await octokit.repos.listForOrg({
    org,
    sort: 'updated',
    per_page: 50,
  });
  return data.map((repo) => ({
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    openIssues: repo.open_issues_count,
    updatedAt: repo.updated_at,
    url: repo.html_url,
  }));
}

export async function getRepoPullRequests(repo: string) {
  const octokit = getOctokit();
  const org = getOrg();
  const { data } = await octokit.pulls.list({
    owner: org,
    repo,
    state: 'open',
    per_page: 50,
  });
  return data.map((pr) => ({
    number: pr.number,
    title: pr.title,
    author: pr.user?.login ?? 'unknown',
    state: pr.state,
    createdAt: pr.created_at,
    url: pr.html_url,
    reviewers: pr.requested_reviewers?.map((r) => ('login' in r ? r.login : r.name)) ?? [],
  }));
}

export async function getRepoCommitActivity(repo: string) {
  const octokit = getOctokit();
  const org = getOrg();

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data } = await octokit.repos.listCommits({
    owner: org,
    repo,
    since: since.toISOString(),
    per_page: 100,
  });
  return {
    totalCommits: data.length,
    contributors: [...new Set(data.map((c) => c.author?.login).filter(Boolean))],
    recentCommits: data.slice(0, 10).map((c) => ({
      sha: c.sha.substring(0, 7),
      message: c.commit.message.split('\n')[0],
      author: c.author?.login ?? 'unknown',
      date: c.commit.author?.date,
    })),
  };
}

export async function getCodeReviewStats(repo: string) {
  const octokit = getOctokit();
  const org = getOrg();

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data: prs } = await octokit.pulls.list({
    owner: org,
    repo,
    state: 'closed',
    sort: 'updated',
    per_page: 50,
  });

  const merged = prs.filter((pr) => pr.merged_at);
  const avgTimeToMerge = merged.length > 0
    ? merged.reduce((sum, pr) => {
        const created = new Date(pr.created_at).getTime();
        const mergedAt = new Date(pr.merged_at!).getTime();
        return sum + (mergedAt - created);
      }, 0) / merged.length / (1000 * 60 * 60)
    : 0;

  return {
    mergedPRs: merged.length,
    avgTimeToMergeHours: Math.round(avgTimeToMerge),
  };
}

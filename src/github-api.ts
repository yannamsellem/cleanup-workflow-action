import * as github from '@actions/github'

import type { Status } from './types'

export async function getWorkflows(
  token: string,
  owner: string,
  repo: string,
  status?: Status,
) {
  const octokit = github.getOctokit(token)
  return octokit.paginate(
    'GET /repos/{owner}/{repo}/actions/runs',
    { owner, repo, status },
    response => response.data.map(w => w.id),
  )
}

export async function deleteWorkflow(
  token: string,
  owner: string,
  repo: string,
  run_id: number,
) {
  const octokit = github.getOctokit(token)
  await octokit.request('DELETE /repos/{owner}/{repo}/actions/runs/{run_id}', {
    owner,
    repo,
    run_id,
  })
}

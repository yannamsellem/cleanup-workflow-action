import * as core from '@actions/core'
import * as github from '@actions/github'

import type { Status, ActionInput } from './types'

function getRepositoryAndOwner(repository: string) {
  const splitRepository = repository.split('/')
  if (
    splitRepository.length !== 2 ||
    !splitRepository[0] ||
    !splitRepository[1]
  ) {
    throw new Error(
      `Invalid repository '${repository}'. Expected format {owner}/{repo}.`,
    )
  }
  const [owner, repo] = splitRepository

  return { owner, repo }
}

const VALID_STATUS = [
  'completed',
  'action_required',
  'cancelled',
  'failure',
  'neutral',
  'skipped',
  'stale',
  'success',
  'timed_out',
  'in_progress',
  'queued',
  'requested',
  'waiting',
]

function getWorkflowStatus(status: string): Status {
  if (VALID_STATUS.includes(status)) return status as Status

  throw new Error(
    `Invalid status '${status}'. Expected value one of: ${VALID_STATUS.join(
      ', ',
    )}`,
  )
}

export function getInputs(): ActionInput {
  const repository =
    core.getInput('repository') ||
    `${github.context.repo.owner}/${github.context.repo.repo}`
  core.debug(`repository = '${repository}'`)
  const { owner, repo } = getRepositoryAndOwner(repository)

  const token = core.getInput('token', { required: true })

  const rawStatus = core.getInput('status') || 'failure'
  const status = getWorkflowStatus(rawStatus)
  core.debug(`workflow status = '${status}'`)

  return { owner, repo, token, status }
}

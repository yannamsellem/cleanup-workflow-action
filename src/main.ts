import * as core from '@actions/core'

import { getWorkflows, deleteWorkflow } from './github-api'
import { getInputs } from './input'
import { sleep } from './utils'

async function run() {
  try {
    const input = getInputs()

    const run_ids = await getWorkflows(
      input.token,
      input.owner,
      input.repo,
      input.status,
    )

    if (run_ids.length === 0) {
      core.info(`No workflow with '${input.status}' status found`)
      return
    }

    for (let i = 0; i < run_ids.length; i += 1) {
      const run_id = run_ids[i]
      await sleep(200)
      await deleteWorkflow(input.token, input.owner, input.repo, run_id)
      core.debug(`workflow run ${run_id} deleted`)
    }

    core.info(
      `✅ Job done. ${run_ids.length} workflow with '${input.status}' status removed`,
    )
  } catch (error) {
    core.setFailed(`${(error as any)?.message ?? error}`)
  }
}

run()

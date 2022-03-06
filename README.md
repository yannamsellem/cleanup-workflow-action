# Cleanup workflow action

This action removes all workflow by status (default: 'failure')

## Inputs

### `repository`

Repository name with owner. For example, yannamsellem/cleanup-actions.  
Default: `${{ github.repository }}`

### `token`

Personal access token (PAT) used to fetch and delete the workflows of the repository.  
Default: `${{ github.token }}`

### `status`

Status of the workflows to delete.  
Default: `failure`

## Usage

```yaml
- uses: @yannamsellem/cleanup-workflow
  with:
    # Default ${{ github.repository }}
    repository: ''
    # Default ${{ github.token }}
    token: ''
    # Default 'failure'
    status: 'failure'
```

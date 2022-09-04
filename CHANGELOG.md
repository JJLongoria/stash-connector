# Change Log
All notable changes to this project will be documented in this file.

## [0.0.1 - 2022-08-31]
### Added
- **Implemented all Administration Endpoints (`/rest/api/1.0/admin/`)**:

    - `/rest/api/1.0/admin/`

    ---

    - `/rest/api/1.0/admin/groups`
    - `/rest/api/1.0/admin/groups/add-users`
    - `/rest/api/1.0/admin/groups/more-members`
    - `/rest/api/1.0/admin/groups/more-non-members`

    ---

    - `/rest/api/1.0/admin/users`
    - `/rest/api/1.0/admin/users/add-groups`
    - `/rest/api/1.0/admin/users/captcha`
    - `/rest/api/1.0/admin/users/credentials`
    - `/rest/api/1.0/admin/users/more-members`
    - `/rest/api/1.0/admin/users/more-non-members`
    - `/rest/api/1.0/admin/users/remove-group`
    - `/rest/api/1.0/admin/users/rename`

    ---

    - `/rest/api/1.0/admin/cluster`

    ---

    - `/rest/api/1.0/admin/license`

    ---

    - `/rest/api/1.0/admin/mail-server`
    - `/rest/api/1.0/admin/mail-server/sender-address`

    ---

    - `/rest/api/1.0/admin/permissions`
    - `/rest/api/1.0/admin/permissions/groups`
    - `/rest/api/1.0/admin/permissions/groups/none`
    - `/rest/api/1.0/admin/permissions/users`
    - `/rest/api/1.0/admin/permissions/users/none`

---

- **Implemented all Application Properties Endpoints (`/rest/api/1.0/application-properties`)**:

    - `/rest/api/1.0/application-properties/`

---

- **Implemented all Groups Endpoints (`/rest/api/1.0/groups`)**:

  - `/rest/api/1.0/groups/`

---

- **Implemented all Hooks Endpoints (`/rest/api/1.0/hooks`)**:

    - `/rest/api/1.0/hooks/`

    ---

    - `/rest/api/1.0/hooks/{hookKey}/avatar`

---

- **Implemented all Logs Endpoints (`/rest/api/1.0/logs`)**:

    - `/rest/api/1.0/logs`

    ---

    - `/rest/api/1.0/logs/logger/{loggerName}`
    - `/rest/api/1.0/logs/logger/{loggerName}/{levelName}`
    - `/rest/api/1.0/logs/rootLogger`
    - `/rest/api/1.0/logs/rootLogger/{levelName}`

---

- **Implemented all Markup Endpoints (`/rest/api/1.0/markup`)**:

    - `/rest/api/1.0/markup`

    ---

    - `/rest/api/1.0/markup/preview`

--- 

- **Implemented all Profile Endpoints (`/rest/api/1.0/profile/recent/repos`)**:

    - `/rest/api/1.0/profile/recent/repos`

---

- **Implemented all Project Endpoints (`/rest/api/1.0/projects`)**:

    - `/rest/api/1.0/projects`

    --- 

    - `/rest/api/1.0/projects/{projectKey}`
    - `/rest/api/1.0/projects/{projectKey}/avatar.png`

    --- 

    - `/rest/api/1.0/projects/{projectKey}/permissions`
    - `/rest/api/1.0/projects/{projectKey}/permissions/groups`
    - `/rest/api/1.0/projects/{projectKey}/permissions/groups/none`
    - `/rest/api/1.0/projects/{projectKey}/permissions/users`
    - `/rest/api/1.0/projects/{projectKey}/permissions/users/none`

    ---

    - `/rest/api/1.0/projects/{projectKey}/repos`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/forks`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/recreate`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/related`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/branches`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/branches/default`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/browse`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/changes`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/changes`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/comments`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/diff`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/watch`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare/changes`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare/commits`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare/diff`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare/files`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/permissions`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/permissions/groups`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/permissions/groups/none`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/permissions/users`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/permissions/users/none`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/activities`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/decline`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/merge`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/reopen`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/approve`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/changes`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/comments`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/comments/{commentId}`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/commits`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/diff`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/participants`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/tasks`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/taskts/count`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/watch`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks/{hookKey}`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks/{hookKey}/enabled`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks/{hookKey}/settings`
    - `/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/tags`

---

- **Implemented all Repos Endpoints (`/rest/api/1.0/repos`)**:

    - `/rest/api/1.0/repos`

---

- **Implemented all Tasks Endpoints (`/rest/api/1.0/tasks`)**:

    - `/rest/api/1.0/tasks`
    - `/rest/api/1.0/tasks/{taskId}`

---

- **Implemented all Users Endpoints (`/rest/api/1.0/users`)**:

    - `/rest/api/1.0/users`
  
    ---

    - `/rest/api/1.0/users/credentials` 
    - `/rest/api/1.0/users/{userSlug}`
    - `/rest/api/1.0/users/{userSlug}/avatar.png`
    - `/rest/api/1.0/users/{userSlug}/settings`




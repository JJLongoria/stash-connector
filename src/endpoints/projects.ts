import { Basic, EndpointService, Page, PageOptions, ProjectInput, ProjectOutput, CreateRepoInput, RepoOutput, ForkRepoInput, UpdateRepoInput, ListBranchesOptions, BranchOutput, RepoBrowseOptions, RepoChangesOptions, RepoChangesOutput, CommitOptions, CommitOutput, CommitChangesOptions, CommitCommentInput, CommitCommentOutput, CommitCommentOptions, CommitDiffOptions, CommitDiffOutput, CompareChangesOptions, CompareCommitsOptions, CompareDiffOptions, RepoDiffOptions, RepoFileOptions, PermissionUserOutput, PermissionGroupOutput, PermissionUsersOutput, RepoPullRequestOptions, PullRequestOutput, PullRequestInput, PullRequestActivitiesOptions, PullRequestActivitiesOutput, Participant, PullRequestDiffOptions, TaskOutput, TaskCountOutput, HookOutput, HookInput, TagsOptions, TagOutput, PermissionGroupsOutput, PermitedOutput } from "../types";

class ProjectInputImp {

    key: string;
    name: string;
    description?: string;
    avatar?: string;

    constructor(input: ProjectInput) {
        this.key = input.key;
        this.name = input.name;
        this.description = input.description;
        this.avatar = input.avatar ? input.avatar.getAvatar() : undefined;
    }
}




/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/settings'
 */
export class ProjectRepoSettingsEndpoint extends EndpointService {

    /**
    * Contains all operations related with project repository settings hooks
    * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks'. 
    * @param {number} pullRequestId Pull Request Id
    * @returns {ProjectRepoSettingsHooksEndpoint} Get all operations about the project repository settings hooks
    */
    hooks = (): ProjectRepoSettingsHooksEndpoint => {
        return new ProjectRepoSettingsHooksEndpoint(this.auth);
    };

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/settings');
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/settings/hooks'
 */
export class ProjectRepoSettingsHooksEndpoint extends EndpointService {

    /**
    * Contains all operations related with project repository settings hooks configurations
    * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks/{hookKey}/settings'
    * @param {string} hookKey Hook Key
    * @returns {ProjectRepoSettingsHooksSettingsEndpoint} Get all operations about the project repository settings hooks configurations
    */
    settings = (hookKey: string): ProjectRepoSettingsHooksSettingsEndpoint => {
        return new ProjectRepoSettingsHooksSettingsEndpoint(this.auth, hookKey);
    };

    constructor(auth: Basic) {
        super(auth, '/hooks');
    }

    /**
     * Retrieve a page of repository hooks for this repository
     * @param {string} [type] The optional type to filter by. Valid values are PRE_RECEIVE or POST_RECEIVE
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<HookOutput>>} Promise with the requested page data.
     */
    async list(type?: 'PRE_RECEIVE' | 'POST_RECEIVE', pageOptions?: PageOptions): Promise<Page<HookOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (type) {
                request.addQueryParam('type', type);
            }
            const result = await request.execute();
            return result.data as Page<HookOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a repository hook for this repositories.
     * @param hookKey The key of the hook to retrieve
     * @returns {Promise<HookOutput>} Promise with the requested hook data
     */
    async get(hookKey: string): Promise<HookOutput> {
        const request = this.doGet({
            param: hookKey,
        });
        try {
            const result = await request.execute();
            return result.data as HookOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Enable a repository hook for this repositories and optionally applying new configuration.
     * @param hookKey The key of the hook to enable
     * @returns {Promise<HookOutput>} Promise with the requested hook data
     */
    async enable(hookKey: string): Promise<HookOutput> {
        const request = this.doPut({
            param: hookKey + '/enabled',
        });
        try {
            const result = await request.execute();
            return result.data as HookOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Disable a repository hook for this repositories.
     * @param hookKey The key of the hook to disable
     * @returns {Promise<HookOutput>} Promise with the requested hook data
     */
    async disable(hookKey: string): Promise<HookOutput> {
        const request = this.doDelete({
            param: hookKey + '/enabled',
        });
        try {
            const result = await request.execute();
            return result.data as HookOutput;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/settings/hooks/{hookKey}/settings'
 */
export class ProjectRepoSettingsHooksSettingsEndpoint extends EndpointService {

    constructor(auth: Basic, hookKey: string) {
        super(auth, '/' + hookKey + '/settings');
    }

    /**
     * Retrieve the settings for a repository hook for this repositories
     * @returns {Promise<HookOutput>} Promise with the requested hook settings
     */
    async get(): Promise<HookOutput> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as HookOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Modify the settings for a repository hook for this repositories
     * @returns {Promise<HookOutput>} Promise with the requested hook settings
     */
    async update(hookSettings: HookInput): Promise<HookOutput> {
        const request = this.doPost().asJson().withBody(hookSettings);
        try {
            const result = await request.execute();
            return result.data as HookOutput;
        } catch (error) {
            throw error;
        }
    }
}




/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests'
 */
export class ProjectRepoPullRequestsEndpoint extends EndpointService {

    /**
     * Contains all operations related with project repository pull request activities
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/activities'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsActivitiesEndpoint} Get all operations about the project repositories pull request activities
     */
    activities = (pullRequestId: number): ProjectRepoPullRequestsActivitiesEndpoint => {
        return new ProjectRepoPullRequestsActivitiesEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request declination
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/decline'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsDeclineEndpoint} Get all operations about the project repositories pull request declination
     */
    decline = (pullRequestId: number): ProjectRepoPullRequestsDeclineEndpoint => {
        return new ProjectRepoPullRequestsDeclineEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request merge
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/merge'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsMergeEndpoint} Get all operations about the project repositories pull request merge
     */
    merge = (pullRequestId: number): ProjectRepoPullRequestsMergeEndpoint => {
        return new ProjectRepoPullRequestsMergeEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request re-open
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/reopen'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsReopenEndpoint} Get all operations about the project repositories pull request re-open
     */
    reopen = (pullRequestId: number): ProjectRepoPullRequestsReopenEndpoint => {
        return new ProjectRepoPullRequestsReopenEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request approval
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/approve'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsApproveEndpoint} Get all operations about the project repositories pull request approval
     */
    approval = (pullRequestId: number): ProjectRepoPullRequestsApproveEndpoint => {
        return new ProjectRepoPullRequestsApproveEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request changes
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/changes'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsChangesEndpoint} Get all operations about the project repositories pull request changes
     */
    changes = (pullRequestId: number): ProjectRepoPullRequestsChangesEndpoint => {
        return new ProjectRepoPullRequestsChangesEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request comments
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/comments'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsCommentsEndpoint} Get all operations about the project repositories pull request comments
     */
    comments = (pullRequestId: number): ProjectRepoPullRequestsCommentsEndpoint => {
        return new ProjectRepoPullRequestsCommentsEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request commits
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/commits'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestsCommitsEndpoint} Get all operations about the project repositories pull request commits
     */
    commits = (pullRequestId: number): ProjectRepoPullRequestsCommitsEndpoint => {
        return new ProjectRepoPullRequestsCommitsEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request diff
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/diff'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestDiffEndpoint} Get all operations about the project repositories pull request diff
     */
    diff = (pullRequestId: number): ProjectRepoPullRequestDiffEndpoint => {
        return new ProjectRepoPullRequestDiffEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request participants
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/participants'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestParticipantEndpoint} Get all operations about the project repositories pull request participants
     */
    participants = (pullRequestId: number): ProjectRepoPullRequestParticipantEndpoint => {
        return new ProjectRepoPullRequestParticipantEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request tasks
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/tasks'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestTasksEndpoint} Get all operations about the project repositories pull request tasks
     */
    tasks = (pullRequestId: number): ProjectRepoPullRequestTasksEndpoint => {
        return new ProjectRepoPullRequestTasksEndpoint(this.auth, pullRequestId);
    };

    /**
     * Contains all operations related with project repository pull request watch
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/watch'. 
     * @param {number} pullRequestId Pull Request Id
     * @returns {ProjectRepoPullRequestWatchEndpoint} Get all operations about the project repositories pull request watch
     */
    watch = (pullRequestId: number): ProjectRepoPullRequestWatchEndpoint => {
        return new ProjectRepoPullRequestWatchEndpoint(this.auth, pullRequestId);
    };

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/pull-requests');
    }

    /**
     * Retrieve a page of pull requests to or from the specified repository. 
     * @param {RepoPullRequestOptions} [pullRequestOptions] Pull Request options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PullRequestOutput>>} Promise with the requested page data.
     */
    async list(pullRequestOptions?: RepoPullRequestOptions): Promise<Page<PullRequestOutput>> {
        const request = this.doGet({
            pageOptions: pullRequestOptions?.pageOptions,
        });
        try {
            this.processOptions(request, pullRequestOptions);
            const result = await request.execute();
            return result.data as Page<PullRequestOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new pull request between two branches. The branches may be in the same repository, or different ones. When using different repositories, they must still be in the same hierarchy 
     * @param {PullRequestInput} [pullRequestInput] Pull Request data to create it
     * @returns {Promise<PullRequestOutput>} Promise with the created pull request data.
     */
    async create(pullRequestInput: PullRequestInput): Promise<PullRequestOutput> {
        const request = this.doPost().asJson().withBody(pullRequestInput);
        try {
            const result = await request.execute();
            return result.data as PullRequestOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a pull request
     * @param {number} [pullRequestId] Pull Request id to get it
     * @returns {Promise<PullRequestOutput>} Promise with the requested pull request data.
     */
    async get(pullRequestId: number): Promise<PullRequestOutput> {
        const request = this.doGet({
            param: pullRequestId
        });
        try {
            const result = await request.execute();
            return result.data as PullRequestOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update the title, description, reviewers or destination branch of an existing pull request
     * @param {number} [pullRequestId] Pull Request id to update it
     * @param {PullRequestInput} [pullRequestInput] Pull Request data to update it
     * @returns {Promise<PullRequestOutput>} Promise with the updated pull request data.
     */
    async update(pullRequestId: number, pullRequestInput: PullRequestInput): Promise<PullRequestOutput> {
        const request = this.doPut({
            param: pullRequestId
        }).asJson().withBody(pullRequestInput);
        try {
            const result = await request.execute();
            return result.data as PullRequestOutput;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/activities'
 */
export class ProjectRepoPullRequestsActivitiesEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/activities');
    }

    /**
     * Retrieve a page of activity associated with a pull request. Activity items include comments, approvals, rescopes (i.e. adding and removing of commits), merges and more
     * @param {PullRequestActivitiesOptions} activitiesOptions Pull Request Activities options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PullRequestActivitiesOutput>>} Promise with the requested page data.
     */
    async list(activitiesOptions: PullRequestActivitiesOptions): Promise<Page<PullRequestActivitiesOutput>> {
        const request = this.doGet({
            pageOptions: activitiesOptions.pageOptions,
        });
        try {
            this.processOptions(request, activitiesOptions);
            const result = await request.execute();
            return result.data as Page<PullRequestActivitiesOutput>;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/decline'
 */
export class ProjectRepoPullRequestsDeclineEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/decline');
    }

    /**
     * Decline a pull request
     * @param {number} [version] The current version of the pull request. If the server's version isn't the same as the specified version the operation will fail. To determine the current version of the pull request it should be fetched from the server prior to this operation
     * @returns {Promise<void>} If not throw errors, operation finishs succesfully.
     */
    async execute(version?: number): Promise<void> {
        const request = this.doPost();
        try {
            if (version !== undefined) {
                request.addQueryParam('version', version);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/merge'
 */
export class ProjectRepoPullRequestsMergeEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/merge');
    }

    /**
     * Test whether a pull request can be merged
     * @returns {Promise<PullRequestOutput>} Return the pull request data and mergin status.
     */
    async test(): Promise<PullRequestOutput> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as PullRequestOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Merge the specified pull request
     * @returns {Promise<PullRequestOutput>} Return the merged pull request data.
     */
    async execute() {
        const request = this.doPost();
        try {
            const result = await request.execute();
            return result.data as PullRequestOutput;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/reopen'
 */
export class ProjectRepoPullRequestsReopenEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/reopen');
    }

    /**
     * Re-open a declined pull request
     * @param {number} [version] The current version of the pull request. If the server's version isn't the same as the specified version the operation will fail. To determine the current version of the pull request it should be fetched from the server prior to this operation
     * @returns {Promise<void>} If not throw errors, operation finishs succesfully.
     */
    async execute(version?: number): Promise<void> {
        const request = this.doPost();
        try {
            if (version !== undefined) {
                request.addQueryParam('version', version);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/approve'
 */
export class ProjectRepoPullRequestsApproveEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/approve');
    }

    /**
     * Approve a pull request as the current user. Implicitly adds the user as a participant if they are not already
     * @returns {Promise<Participant>} Return the participant data.
     */
    async execute(): Promise<Participant> {
        const request = this.doPost();
        try {
            const result = await request.execute();
            return result.data as Participant;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Remove approval from a pull request as the current user. This does not remove the user as a participant
    * @returns {Promise<Participant>} Return the participant data.
    */
    async delete(): Promise<Participant> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return result.data as Participant;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/changes'
 */
export class ProjectRepoPullRequestsChangesEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/changes');
    }

    /**
     * Gets changes for the specified PullRequest.
     * @param {boolean} [withComments] true to apply comment counts in the changes (the default); otherwise, false to stream changes without comment counts
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoChangesOutput>>} Promise with the requested page data.
     */
    async list(withComments?: boolean, pageOptions?: PageOptions): Promise<Page<RepoChangesOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions
        });
        try {
            if (withComments !== undefined) {
                request.addQueryParam('withComments', withComments);
            }
            const result = await request.execute();
            return result.data as Page<RepoChangesOutput>;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/comments'
 */
export class ProjectRepoPullRequestsCommentsEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/comments');
    }

    /**
     * Retrieve a page of comments made in a specified pull request
     * @param {string} [filePath] File path
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<CommitCommentOutput>>} Promise with the requested page data.
     */
    async list(filePath?: string, pageOptions?: PageOptions): Promise<Page<CommitCommentOutput>> {
        const request = this.doGet({
            param: filePath ? encodeURIComponent(filePath) : undefined,
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<CommitCommentOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add a new comment
     * @param {CommitCommentInput} commentInput Comment input data to create new comment
     * @returns {Promise<CommitCommentOutput>} Promise with the created comment data.
     */
    async create(commentInput: CommitCommentInput): Promise<CommitCommentOutput> {
        const request = this.doPost().asJson().withBody(commentInput);
        try {
            const result = await request.execute();
            return result.data as CommitCommentOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get specific comment
     * @param {number} commentId Comment Id get comment data
     * @returns {Promise<CommitCommentOutput>} Promise with the requested comment data.
     */
    async get(commentId: number): Promise<CommitCommentOutput> {
        const request = this.doGet({
            param: commentId
        }).asJson();
        try {
            const result = await request.execute();
            return result.data as CommitCommentOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update specific comment
     * @param {number} commentId Comment Id get comment data
     * @param {CommitCommentInput} commentInput Comment input data to update the comment
     * @returns {Promise<CommitCommentOutput>} Promise with the requested comment data.
     */
    async update(commentId: number, commentInput: CommitCommentInput): Promise<CommitCommentOutput> {
        const request = this.doPut({
            param: commentId
        }).asJson().withBody(commentInput);
        try {
            const result = await request.execute();
            return result.data as CommitCommentOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete specific comment and version
     * @param {number} commentId Comment Id delete
     * @param {number} [version] Comment version to delete
     * @returns {Promise<void>} If finish without errors, operation finish succesfully
     */
    async delete(commentId: number, version?: number): Promise<void> {
        const request = this.doDelete({
            param: commentId
        }).asJson();
        try {
            if (version !== undefined) {
                request.addQueryParam('version', version);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/commits'
 */
export class ProjectRepoPullRequestsCommitsEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/commits');
    }

    /**
     * Retrieve changesets for the specified pull request
     * @param {boolean} [withComments] if set to true, the service will add "authorCount" and "totalCount" at the end of the page. "authorCount" is the number of different authors and "totalCount" is the total number of changesets
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<CommitOutput>>} Promise with the requested page data.
     */
    async list(withComments?: boolean, pageOptions?: PageOptions): Promise<Page<CommitOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (withComments !== undefined) {
                request.addQueryParam('withComments', withComments);
            }
            const result = await request.execute();
            return result.data as Page<CommitOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a single commit identified by its ID>. In general, that ID is a SHA1. 
     * From 2.11, ref names like "refs/heads/master" are no longer accepted by this resource.
     * @param {string} commitId Commit Id to retrieve data from
     * @param {string} [path] an optional path to filter the commit by. If supplied the details returned may not be for the specified commit. Instead, starting from the specified commit, they will be the details for the first commit affecting the specified path.
     * @returns {Promise<CommitOutput>} Promise with the requested commit data
     */
    async get(commitId: string, path?: string): Promise<CommitOutput> {
        const request = this.doGet({
            param: commitId,
        });
        try {
            if (path) {
                request.addQueryParam('path', path);
            }
            const result = await request.execute();
            return result.data as CommitOutput;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/diff'
 */
export class ProjectRepoPullRequestDiffEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/diff');
    }

    /**
     * Retrieve the diff between two provided revisions
     * @param {PullRequestDiffOptions} [diffOptions] Pull Request Diff options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<CommitDiffOutput>} Promise with the requested page data.
     */
    async list(diffOptions?: PullRequestDiffOptions, filePath?: string): Promise<CommitDiffOutput> {
        const request = this.doGet({
            param: filePath ? encodeURIComponent(filePath) : undefined,
            pageOptions: diffOptions?.pageOptions,
        });
        try {
            this.processOptions(request, diffOptions);
            const result = await request.execute();
            return result.data as CommitDiffOutput;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/participants'
 */
export class ProjectRepoPullRequestParticipantEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/participants');
    }

    /**
     * Retrieves a page of the participants for a given pull request
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<Participant>>} Promise with the requested page data.
     */
    async list(pageOptions?: PageOptions): Promise<Page<Participant>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<Participant>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Assigns a participant to an explicit role in pull request. Currently only the REVIEWER role may be assigned. 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Participant>} Promise with the requested page data.
     */
    async assign(participantInput: Participant): Promise<Participant> {
        const request = this.doPost().asJson().withBody(participantInput);
        try {
            const result = await request.execute();
            return result.data as Participant;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Unassigns a participant from the REVIEWER role they may have been given in a pull request.  
     * @param {string} [username] The participant's user name
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async unassign(username: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('username', username);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/tasks'
 */
export class ProjectRepoPullRequestTasksEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/tasks');
    }

    /**
     * Retrieve the tasks associated with a pull request
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<TaskOutput>>} Promise with the requested page data.
     */
    async list(pageOptions?: PageOptions): Promise<Page<TaskOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<TaskOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve the total number of open and resolved tasks associated with a pull request
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<TaskCountOutput>} Promise with the requested page data.
     */
    async count(): Promise<TaskCountOutput> {
        const request = this.doGet({
            param: 'count'
        });
        try {
            const result = await request.execute();
            return result.data as TaskCountOutput;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/watch'
 */
export class ProjectRepoPullRequestWatchEndpoint extends EndpointService {

    constructor(auth: Basic, pullRequestId: number) {
        super(auth, '/' + pullRequestId + '/watch');
    }

    /**
     * Start to watching pull request
     * @returns {Promise<void>} If return without errors, operations finish succesfully.
     */
    async start(): Promise<void> {
        const request = this.doPost();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Stop to watching pull request
     * @returns {Promise<void>} If return without errors, operations finish succesfully.
     */
    async stop(): Promise<void> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}




/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/commits'
 */
export class ProjectRepoCommitsEndpoint extends EndpointService {

    /**
     * Contains all operations related with project repository commit changes
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/changes'. 
     * @param {string} commitId Commit Id
     * @returns {ProjectRepoCommitChangesEndpoint} Get all operations about the project repository commit changes
     */
    changes = (commitId: string): ProjectRepoCommitChangesEndpoint => {
        return new ProjectRepoCommitChangesEndpoint(this.auth, commitId);
    };

    /**
     * Contains all operations related with project repository commit comments
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/comments'. 
     * @param {string} commitId Commit Id
     * @returns {ProjectRepoCommitCommentsEndpoint} Get all operations about the project repository commit comments
     */
    comments = (commitId: string): ProjectRepoCommitCommentsEndpoint => {
        return new ProjectRepoCommitCommentsEndpoint(this.auth, commitId);
    };

    /**
     * Contains all operations related with project repository commit diffs
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/diffs'. 
     * @param {string} commitId Commit Id
     * @returns {ProjectRepoCommitDiffEndpoint} Get all operations about the project repository commit diffs
     */
    diffs = (commitId: string): ProjectRepoCommitDiffEndpoint => {
        return new ProjectRepoCommitDiffEndpoint(this.auth, commitId);
    };

    /**
     * Contains all operations related with project repository commit watch
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits/{commitId}/watch'. 
     * @param {string} commitId Commit Id
     * @returns {ProjectRepoCommitWatchEndpoint} Get all operations about the project repository commit watch
     */
    watch = (commitId: string): ProjectRepoCommitWatchEndpoint => {
        return new ProjectRepoCommitWatchEndpoint(this.auth, commitId);
    };

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/commits');
    }

    /**
     * Retrieve a page of commits from a given starting commit or "between" two commits. 
     * If no explicit commit is specified, the tip of the repository's default branch is assumed. 
     * Commits may be identified by branch or tag name or by ID. 
     * A path may be supplied to restrict the returned commits to only those which affect that path
     * @param {CommitOptions} [commitOptions] Commits options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<CommitOutput>>} Promise with the requested page data.
     */
    async list(commitOptions?: CommitOptions): Promise<Page<CommitOutput>> {
        const request = this.doGet({
            pageOptions: commitOptions?.pageOptions,
        });
        try {
            this.processOptions(request, commitOptions);
            const result = await request.execute();
            return result.data as Page<CommitOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a single commit identified by its ID>. In general, that ID is a SHA1. 
     * From 2.11, ref names like "refs/heads/master" are no longer accepted by this resource.
     * @param {string} commitId Commit Id to retrieve data from
     * @param {string} [path] an optional path to filter the commit by. If supplied the details returned may not be for the specified commit. Instead, starting from the specified commit, they will be the details for the first commit affecting the specified path.
     * @returns {Promise<CommitOutput>} Promise with the requested commit data
     */
    async get(commitId: string, path?: string): Promise<CommitOutput> {
        const request = this.doGet({
            param: commitId,
        });
        try {
            if (path) {
                request.addQueryParam('path', path);
            }
            const result = await request.execute();
            return result.data as CommitOutput;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/commits/{commitId}/changes'
 */
export class ProjectRepoCommitChangesEndpoint extends EndpointService {

    constructor(auth: Basic, commitId: string) {
        super(auth, '/' + commitId + '/changes');
    }

    /**
     * Retrieve a page of changes made in a specified commit
     * @param {CommitChangesOptions} [commitOptions] Commit Changes options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoChangesOutput>>} Promise with the requested page data.
     */
    async list(commitChangesOptions?: CommitChangesOptions): Promise<Page<RepoChangesOutput>> {
        const request = this.doGet({
            pageOptions: commitChangesOptions?.pageOptions,
        });
        try {
            this.processOptions(request, commitChangesOptions);
            const result = await request.execute();
            return result.data as Page<RepoChangesOutput>;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/commits/{commitId}/comments'
 */
export class ProjectRepoCommitCommentsEndpoint extends EndpointService {

    constructor(auth: Basic, commitId: string) {
        super(auth, '/' + commitId + '/comments');
    }

    /**
     * Retrieve a page of comments made in a specified commit
     * @param {CommitCommentOptions} [commentOptions] Commit Comment options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<CommitCommentOutput>>} Promise with the requested page data.
     */
    async list(commentOptions?: CommitCommentOptions): Promise<Page<CommitCommentOutput>> {
        const request = this.doGet({
            pageOptions: commentOptions?.pageOptions,
        });
        try {
            this.processOptions(request, commentOptions);
            const result = await request.execute();
            return result.data as Page<CommitCommentOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add a new comment
     * @param {CommitCommentInput} commentInput Comment input data to create new comment
     * @returns {Promise<CommitCommentOutput>} Promise with the created comment data.
     */
    async create(commentInput: CommitCommentInput): Promise<CommitCommentOutput> {
        const request = this.doPost().asJson().withBody(commentInput);
        try {
            const result = await request.execute();
            return result.data as CommitCommentOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get specific comment
     * @param {number} commentId Comment Id get comment data
     * @returns {Promise<CommitCommentOutput>} Promise with the requested comment data.
     */
    async get(commentId: number): Promise<CommitCommentOutput> {
        const request = this.doGet({
            param: commentId
        }).asJson();
        try {
            const result = await request.execute();
            return result.data as CommitCommentOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update specific comment
     * @param {number} commentId Comment Id get comment data
     * @param {CommitCommentInput} commentInput Comment input data to update the comment
     * @returns {Promise<CommitCommentOutput>} Promise with the requested comment data.
     */
    async update(commentId: number, commentInput: CommitCommentInput): Promise<CommitCommentOutput> {
        const request = this.doPut({
            param: commentId
        }).asJson().withBody(commentInput);
        try {
            const result = await request.execute();
            return result.data as CommitCommentOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete specific comment and version
     * @param {number} commentId Comment Id delete
     * @param {number} [version] Comment version to delete
     * @returns {Promise<void>} If finish without errors, operation finish succesfully
     */
    async delete(commentId: number, version?: number): Promise<void> {
        const request = this.doDelete({
            param: commentId
        }).asJson();
        try {
            if (version !== undefined) {
                request.addQueryParam('version', version);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/commits/{commitId}/diff'
 */
export class ProjectRepoCommitDiffEndpoint extends EndpointService {

    constructor(auth: Basic, commitId: string) {
        super(auth, '/' + commitId + '/diff');
    }

    /**
     * Retrieve the diff between two provided revisions
     * @param {CommitDiffOptions} [diffOptions] Commit Diff options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<CommitDiffOutput>} Promise with the requested page data.
     */
    async list(diffOptions?: CommitDiffOptions, filePath?: string): Promise<CommitDiffOutput> {
        const request = this.doGet({
            param: filePath ? encodeURIComponent(filePath) : undefined,
            pageOptions: diffOptions?.pageOptions,
        });
        try {
            this.processOptions(request, diffOptions);
            const result = await request.execute();
            return result.data as CommitDiffOutput;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/commits/{commitId}/watch'
 */
export class ProjectRepoCommitWatchEndpoint extends EndpointService {

    constructor(auth: Basic, commitId: string) {
        super(auth, '/' + commitId + '/watch');
    }

    /**
     * Start to watching commit
     * @returns {Promise<void>} If return without errors, operations finish succesfully.
     */
    async start(): Promise<void> {
        const request = this.doPost();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Stop to watching commit
     * @returns {Promise<void>} If return without errors, operations finish succesfully.
     */
    async stop(): Promise<void> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}





/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/compare'
 */
export class ProjectRepoCompareEndpoint extends EndpointService {

    /**
     * Contains all operations related with project repository compare changes
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare/changes'. 
     * @returns {ProjectRepoCompareChangesEndpoint} Get all operations about the project repository compare changes
     */
    changes = (): ProjectRepoCompareChangesEndpoint => {
        return new ProjectRepoCompareChangesEndpoint(this.auth);
    };

    /**
     * Contains all operations related with project repository compare commits
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare/commits'. 
     * @returns {ProjectRepoCompareCommitsEndpoint} Get all operations about the project repository compare commits
     */
    commits = (): ProjectRepoCompareCommitsEndpoint => {
        return new ProjectRepoCompareCommitsEndpoint(this.auth);
    };

    /**
     * Contains all operations related with project repository compare diff
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare/diff'. 
     * @returns {ProjectRepoCompareDiffEndpoint} Get all operations about the project repository compare diff
     */
    diff = (): ProjectRepoCompareDiffEndpoint => {
        return new ProjectRepoCompareDiffEndpoint(this.auth);
    };

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/compare');
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/compare/changes'
 */
export class ProjectRepoCompareChangesEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/changes');
    }

    /**
     * Gets the file changes available in the "from" changeset but not in the "to" changeset. .
     * @param {CompareChangesOptions} [compareChangesOptions] Compare Changes options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoChangesOutput>>} Promise with the requested page data.
     */
    async list(compareChangesOptions?: CompareChangesOptions): Promise<Page<RepoChangesOutput>> {
        const request = this.doGet({
            pageOptions: compareChangesOptions?.pageOptions,
        });
        try {
            this.processOptions(request, compareChangesOptions);
            const result = await request.execute();
            return result.data as Page<RepoChangesOutput>;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/compare/commits'
 */
export class ProjectRepoCompareCommitsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/commits');
    }

    /**
     * Gets the commits accessible from the  "from" changeset but not in the "to" changeset. .
     * @param {CompareCommitsOptions} [compareCommitsOptions] Compare Commits options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<CommitOutput>>} Promise with the requested page data.
     */
    async list(compareCommitsOptions?: CompareCommitsOptions): Promise<Page<CommitOutput>> {
        const request = this.doGet({
            pageOptions: compareCommitsOptions?.pageOptions,
        });
        try {
            this.processOptions(request, compareCommitsOptions);
            const result = await request.execute();
            return result.data as Page<CommitOutput>;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/compare/diff'
 */
export class ProjectRepoCompareDiffEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/diff');
    }

    /**
     * Retrieve the diff for a specified file path between two provided revisions.
     * @param {CompareDiffOptions} [compareDiffOptions] Compare Commits options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<CommitDiffOutput>} Promise with the requested diff changes.
     */
    async list(compareDiffOptions?: CompareDiffOptions, filePath?: string): Promise<CommitDiffOutput> {
        const request = this.doGet({
            param: filePath ? encodeURIComponent(filePath) : undefined,
            pageOptions: compareDiffOptions?.pageOptions,
        });
        try {
            this.processOptions(request, compareDiffOptions);
            const result = await request.execute();
            return result.data as CommitDiffOutput;
        } catch (error) {
            throw error;
        }
    }
}




/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/permissions'
 */
export class ProjectRepoPermissionsEndpoint extends EndpointService {

    /**
    * Contains all operations related with project repository users permissions
    * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/permissions/users'. 
    * @returns {ProjectRepoPermissionsUsersEndpoint} Get all operations about the project repository users permissions
    */
    users = (): ProjectRepoPermissionsUsersEndpoint => {
        return new ProjectRepoPermissionsUsersEndpoint(this.auth);
    };

    /**
    * Contains all operations related with project repository groups permissions
    * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/permissions/groups'. 
    * @returns {ProjectRepoPermissionsGroupsEndpoint} Get all operations about the project repository groups permissions
    */
    groups = (): ProjectRepoPermissionsGroupsEndpoint => {
        return new ProjectRepoPermissionsGroupsEndpoint(this.auth);
    };

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/permissions');
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/permissions/users'
 */
export class ProjectRepoPermissionsUsersEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/users');
    }

    /**
     * Retrieve a page of licensed users that have no granted permissions for the specified repository.
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionUserOutput>>} Promise with the requested page data.
     */
    async none(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionUserOutput>> {
        const request = this.doGet({
            param: 'none',
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionUserOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a page of users that have been granted at least one permission for the specified repository
     * @param {string} [filter] If specified only group names containing the supplied string will be returned 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionUsersOutput>>} Promise with the requested page data.
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionUsersOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionUsersOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Promote or demote a user's permission level for the specified repository.
     * @param {string} name The name of the user 
     * @param {string} permission The permission to grant
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async update(name: string, permission: 'REPO_READ' | 'REPO_WRITE' | 'REPO_ADMIN'): Promise<void> {
        const request = this.doPut();
        try {
            request.addQueryParam('name', name);
            request.addQueryParam('permission', permission);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Revoke all permissions for the specified repository for a user
     * @param {string} name The name of the user
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async revoke(name: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }


}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/permissions/users'
 */
export class ProjectRepoPermissionsGroupsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/groups');
    }

    /**
     * Retrieve a page of groups that have no granted permissions for the specified repository.
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroupOutput>>} Promise with the requested page data.
     */
    async none(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionGroupOutput>> {
        const request = this.doGet({
            param: 'none',
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionGroupOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a page of groups that have been granted at least one permission for the specified repository
     * @param {string} [filter] If specified only group names containing the supplied string will be returned 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroupsOutput>>} Promise with the requested page data.
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionGroupsOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionGroupsOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Promote or demote a group's permission level for the specified repository
     * @param {string} name The name of the group 
     * @param {string} permission The permission to grant
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async update(name: string, permission: 'REPO_READ' | 'REPO_WRITE' | 'REPO_ADMIN'): Promise<void> {
        const request = this.doPut();
        try {
            request.addQueryParam('name', name);
            request.addQueryParam('permission', permission);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Revoke all permissions for the specified repository for a group
     * @param {string} name The name of the group
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async revoke(name: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}


/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/tags'
 */
export class ProjectRepoTagsEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/tags');
    }

    /**
     * Retrieve the tags matching the supplied filterText param..
     * @param {RepoChangesOptions} [tagsOptions] Tags Options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<TagOutput>>} Promise with the requested page data.
     */
    async list(tagsOptions?: TagsOptions): Promise<Page<TagOutput>> {
        const request = this.doGet({
            pageOptions: tagsOptions?.pageOptions,
        });
        try {
            this.processOptions(request, tagsOptions);
            const result = await request.execute();
            return result.data as Page<TagOutput>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/changes'
 */
export class ProjectRepoChangesEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/changes');
    }

    /**
     * Retrieve a page of changes made in a specified commit.
     * @param {RepoChangesOptions} [changesOptions] Changes options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoChangesOutput>>} Promise with the requested page data.
     */
    async list(changesOptions?: RepoChangesOptions): Promise<Page<RepoChangesOutput>> {
        const request = this.doGet({
            pageOptions: changesOptions?.pageOptions,
        });
        try {
            this.processOptions(request, changesOptions);
            const result = await request.execute();
            return result.data as Page<RepoChangesOutput>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/compare/diff'
 */
export class ProjectRepoDiffEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/diff');
    }

    /**
     * Retrieve the diff for a specified file path between two provided revisions
     * @param {RepoDiffOptions} [repoDiffOptions] Repository Diff options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @param {string} [filePath] The path to the file which should be diffed
     * @returns {Promise<CommitDiffOutput>} Promise with the requested diff changes.
     */
    async list(compareDiffOptions?: RepoDiffOptions, filePath?: string): Promise<CommitDiffOutput> {
        const request = this.doGet({
            param: filePath ? encodeURIComponent(filePath) : undefined,
            pageOptions: compareDiffOptions?.pageOptions,
        });
        try {
            this.processOptions(request, compareDiffOptions);
            const result = await request.execute();
            return result.data as CommitDiffOutput;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/compare/files'
 */
export class ProjectRepoFilesEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/files');
    }

    /**
     * Retrieve a page of files from particular directory of a repository. The search is done recursively, so all files from any sub-directory of the specified directory will be returned. 
     * @param {RepoFileOptions} [fileOptions] Repository File options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @param {string} [folderPath] The directory to list files for
     * @returns {Promise<Page<string>>} Promise with the requested diff changes.
     */
    async list(fileOptions?: RepoFileOptions, folderPath?: string): Promise<Page<string>> {
        const request = this.doGet({
            param: folderPath ? encodeURIComponent(folderPath) : undefined,
            pageOptions: fileOptions?.pageOptions,
        });
        try {
            this.processOptions(request, fileOptions);
            const result = await request.execute();
            return result.data as Page<string>;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/forks'
 */
export class ProjectRepoBrowseEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/browse');
    }

    /**
     * Retrieve a page of content for a file path at a specified revision.
     * @param {RepoBrowseOptions} [browseOptions] Browse options include the pagination options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @param {string} [filePath] File path to retrieve content from
     * @returns {Promise<Page<any>>} Promise with the requested page data with found lines.
     */
    async list(browseOptions?: RepoBrowseOptions, filePath?: string): Promise<Page<any>> {
        const request = this.doGet({
            param: filePath ? encodeURIComponent(filePath) : undefined,
            pageOptions: browseOptions?.pageOptions,
        });
        try {
            this.processOptions(request, browseOptions);
            const result = await request.execute();
            return result.data as Page<any>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/forks'
 */
export class ProjectRepoForksEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/forks');
    }

    /**
     * List all forks from a specific repository. The results are paginated. You can use the pagination options you need to get the desired results. 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoOutput>>} Promise with the requested page data.
     */
    async list(pageOptions?: PageOptions): Promise<Page<RepoOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<RepoOutput>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/recreate'
 */
export class ProjectRepoRecreateEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/recreate');
    }

    /**
     * If a create or fork operation fails, calling this method will clean up the broken repository and try again. 
     * The repository must be in an INITIALISATION_FAILED state.
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<RepoOutput>} Promise with the recreated Reposiitory data.
     */
    async rebuild(): Promise<RepoOutput> {
        const request = this.doPost();
        try {
            const result = await request.execute();
            return result.data as RepoOutput;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/recreate'
 */
export class ProjectRepoRelatedEndpoint extends EndpointService {

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/recreate');
    }

    /**
     * Retrieve repositories which are related to this one.
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoOutput>>} Promise with the requested page data.
     */
    async list(pageOptions?: PageOptions): Promise<Page<RepoOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<RepoOutput>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/branches'
 */
export class ProjectRepoBranchesEndpoint extends EndpointService {

    /**
     * Contains all operations related with project repository default branches
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/branches/default'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoBranchesDefaultEndpoint} Get all operations about the project repository default branches
     */
    default = (): ProjectRepoBranchesDefaultEndpoint => {
        return new ProjectRepoBranchesDefaultEndpoint(this.auth);
    };

    constructor(auth: Basic, slug: string) {
        super(auth, '/' + slug + '/branches');
    }

    /**
     * Retrieve the branches matching the supplied filterText param. 
     * @param {ListBranchesOptions} [listOptions] List Branches options including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<BranchOutput>>} Promise with the requested page data.
     */
    async list(listOptions?: ListBranchesOptions): Promise<Page<BranchOutput>> {
        const request = this.doGet({
            pageOptions: listOptions?.pageOptions,
        });
        try {
            this.processOptions(request, listOptions);
            const result = await request.execute();
            return result.data as Page<BranchOutput>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/{repositorySlug}/branches/default'
 */
export class ProjectRepoBranchesDefaultEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/default');
    }

    /**
     * Get the default branch of the repository. 
     * @returns {BranchOutput} Promise with the default branch data.
     */
    async get(): Promise<BranchOutput> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as BranchOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update the default branch of a repository. 
     * @param {string} id Id branch to update (ex: refs/heads/master)
     * @returns {void} If return without errors means all its ok.
     */
    async update(id: string): Promise<void> {
        const request = this.doPost().withBody({
            id: id
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/repos/*'
 */
export class ProjectReposEndpoint extends EndpointService {

    /**
     * Contains all operations related with project repository forks
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/forks'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoForksEndpoint} Get all operations about the project repositories forks
     */
    forks = (slug: string): ProjectRepoForksEndpoint => {
        return new ProjectRepoForksEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository recreation when fail
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/recreate'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoRecreateEndpoint} Get all operations about the project repositories forks
     */
    recreate = (slug: string): ProjectRepoRecreateEndpoint => {
        return new ProjectRepoRecreateEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository related repos
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/related'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoRelatedEndpoint} Get all operations about the project repositories related repos
     */
    related = (slug: string): ProjectRepoRelatedEndpoint => {
        return new ProjectRepoRelatedEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository branches
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/branches'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoBranchesEndpoint} Get all operations about the project repositories branches
     */
    branches = (slug: string): ProjectRepoBranchesEndpoint => {
        return new ProjectRepoBranchesEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository browse
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/branches'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoBrowseEndpoint} Get all operations about the project repository browse
     */
    browse = (slug: string): ProjectRepoBrowseEndpoint => {
        return new ProjectRepoBrowseEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository changes
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/changes'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoChangesEndpoint} Get all operations about the project repository changes
     */
    changes = (slug: string): ProjectRepoChangesEndpoint => {
        return new ProjectRepoChangesEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository commits
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/commits'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoCommitsEndpoint} Get all operations about the project repository commits
     */
    commits = (slug: string): ProjectRepoCommitsEndpoint => {
        return new ProjectRepoCommitsEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository compare
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/compare'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoCompareEndpoint} Get all operations about the project repository compare
     */
    compare = (slug: string): ProjectRepoCompareEndpoint => {
        return new ProjectRepoCompareEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository diff
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/diff'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoDiffEndpoint} Get all operations about the project repository diff
     */
    diff = (slug: string): ProjectRepoDiffEndpoint => {
        return new ProjectRepoDiffEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository files
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/files'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoFilesEndpoint} Get all operations about the project repository files
     */
    files = (slug: string): ProjectRepoFilesEndpoint => {
        return new ProjectRepoFilesEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository pull requests
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoPullRequestsEndpoint} Get all operations about the project repository pull requests
     */
    pullRequests = (slug: string): ProjectRepoPullRequestsEndpoint => {
        return new ProjectRepoPullRequestsEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository settings
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoSettingsEndpoint} Get all operations about the project repository settings
     */
    settings = (slug: string): ProjectRepoSettingsEndpoint => {
        return new ProjectRepoSettingsEndpoint(this.auth, slug);
    };

    /**
     * Contains all operations related with project repository tags
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/tags'. 
     * @param {string} slug Repository slug
     * @returns {ProjectRepoTagsEndpoint} Get all operations about the project repository tags
     */
    tags = (slug: string): ProjectRepoTagsEndpoint => {
        return new ProjectRepoTagsEndpoint(this.auth, slug);
    };

    constructor(auth: Basic, projectKey: string) {
        super(auth, '/' + projectKey + '/repos');
    }

    /**
     * List all repositories from a specific project. The results are paginated. You can use the pagination options you need to get the desired results. 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoOutput>>} Promise with the requested page data.
     */
    async list(pageOptions?: PageOptions): Promise<Page<RepoOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<RepoOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new repository to a specific project.
     * @param {CreateRepoInput} repoOptions Repository data to create it
     * @returns {Promise<RepoOutput>} Promise with the created Repository data
     */
    async create(repoOptions: CreateRepoInput): Promise<RepoOutput> {
        const request = this.doPost().asJson().withBody(repoOptions);
        try {
            const result = await request.execute();
            return result.data as RepoOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get data from specific project repository.
     * @param {string} slug Repository slug
     * @returns {Promise<RepoOutput>} Promise with the requested Repository data
     */
    async get(slug: string): Promise<RepoOutput> {
        const request = this.doGet({
            param: slug,
        });
        try {
            const result = await request.execute();
            return result.data as RepoOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fork a specific repository from the project to another project.
     * @param {string} fromSlug Origin Repository slug
     * @param {ForkRepoInput} repoOptions Repository Data to fork it
     * @returns {Promise<RepoOutput>} Promise with the created Repository data
     */
    async fork(fromSlug: string, repoOptions: ForkRepoInput): Promise<RepoOutput> {
        const request = this.doPost({
            param: fromSlug,
        }).withBody(repoOptions);
        try {
            const result = await request.execute();
            return result.data as RepoOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update specific repository from the project
     * @param {string} slug Repository slug to update
     * @param {UpdateRepoInput} repoOptions Repository Data to update
     * @returns {Promise<RepoOutput>} Promise with the updated Repository data
     */
    async update(slug: string, repoOptions: UpdateRepoInput): Promise<RepoOutput> {
        const request = this.doPut({
            param: slug,
        }).withBody(repoOptions);
        try {
            const result = await request.execute();
            return result.data as RepoOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete specific repository from the project
     * @param {string} slug Repository slug to delete
     * @returns {Promise<RepoOutput>} Promise with the deleted repository slug
     */
    async delete(slug: string) {
        const request = this.doDelete({
            param: slug,
        }).asJson();
        try {
            const result = await request.execute();
            return result.data as string;
        } catch (error) {
            throw error;
        }
    }

}





/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/permissions'
 */
export class ProjectPermissionsEndpoint extends EndpointService {

    /**
     * Contains all operations related with project user permissions
     * All paths and operations from '/rest/api/1.0/projects/{prokectKey}/permissions/users'. 
     * @returns {ProjectPermissionsUsersEndpoint} Get all operations about the project user permissions
     */
    users = (): ProjectPermissionsUsersEndpoint => {
        return new ProjectPermissionsUsersEndpoint(this.auth);
    };

    /**
     * Contains all operations related with project groups permissions
     * All paths and operations from '/rest/api/1.0/projects/{prokectKey}/permissions/groups'. 
     * @returns {ProjectPermissionsGroupsEndpoint} Get all operations about the project groups permissions
     */
    groups = (): ProjectPermissionsGroupsEndpoint => {
        return new ProjectPermissionsGroupsEndpoint(this.auth);
    };

    /**
     * Contains all operations related with project specific permissions
     * All paths and operations from '/rest/api/1.0/projects/{prokectKey}/permissions/{permission}/all'. 
     * @returns {ProjectPermissionsAllEndpoint} Get all operations about the project specific permissions
     */
     all = (permission: string): ProjectPermissionsAllEndpoint => {
        return new ProjectPermissionsAllEndpoint(this.auth, permission);
    };

    constructor(auth: Basic, projectKey: string) {
        super(auth, '/' + projectKey + '/permissions');
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/permissions/users'
 */
export class ProjectPermissionsUsersEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/users');
    }

    /**
     * Retrieve a page of licensed users that have no granted permissions for the specified project.
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionUserOutput>>} Promise with the requested page data.
     */
     async none(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionUserOutput>> {
        const request = this.doGet({
            param: 'none',
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionUserOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a page of users that have been granted at least one permission for the specified project.
     * @param {string} [filter] If specified only group names containing the supplied string will be returned 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionUsersOutput>>} Promise with the requested page data.
     */
     async list(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionUsersOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionUsersOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Promote or demote a user's permission level for the specified project.
     * @param {string} name The name of the user 
     * @param {string} permission The permission to grant
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async update(name: string, permission: 'PROJECT_READ' | 'PROJECT_WRITE' | 'PROJECT_ADMIN'): Promise<void> {
        const request = this.doPut();
        try {
            request.addQueryParam('name', name);
            request.addQueryParam('permission', permission);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Revoke all permissions for the specified project for a user
     * @param {string} name The name of the user
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async revoke(name: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }


}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/permissions/groups'
 */
export class ProjectPermissionsGroupsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/groups');
    }

    /**
     * Retrieve a page of groups that have no granted permissions for the specified project
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroupOutput>>} Promise with the requested page data.
     */
     async none(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionGroupOutput>> {
        const request = this.doGet({
            param: 'none',
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionGroupOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a page of groups that have been granted at least one permission for the specified project. 
     * @param {string} [filter] If specified only group names containing the supplied string will be returned 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroupsOutput>>} Promise with the requested page data.
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionGroupsOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionGroupsOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Promote or demote a group's permission level for the specified project
     * @param {string} name The name of the group 
     * @param {string} permission The permission to grant
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async update(name: string, permission: 'PROJECT_READ' | 'PROJECT_WRITE' | 'PROJECT_ADMIN'): Promise<void> {
        const request = this.doPut();
        try {
            request.addQueryParam('name', name);
            request.addQueryParam('permission', permission);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Revoke all permissions for the specified project for a group
     * @param {string} name The name of the group
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async revoke(name: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/permissions/{permission}/all'
 */
 export class ProjectPermissionsAllEndpoint extends EndpointService {

    constructor(auth: Basic, permission: string) {
        super(auth, '/' + permission + '/all');
    }

    /**
     * Check whether the specified permission is the default permission (granted to all users) for a project.
     * @returns {Promise<PermitedOutput>} Promise with the permited result.
     */
     async check(): Promise<PermitedOutput> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as PermitedOutput;
        } catch (error) {
            throw error;
        }
    }

    async update(allow: boolean): Promise<PermitedOutput>{
        const request = this.doPost();
        try {
            request.addQueryParam('allow', allow);
            const result = await request.execute();
            return result.data as PermitedOutput;
        } catch (error) {
            throw error;
        }
    }

}



/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/{prokectKey}/avatar.png'
 */
export class ProjectAvatarEndpoint extends EndpointService {

    constructor(auth: Basic, projectKey: string) {
        super(auth, '/' + projectKey + '/avatar.png');
    }

    /**
     * Get the project avatar image
     * @param {number} [size] The desired size of the image
     * @returns {Promise<any>} Promise with the image data
     */
    async get(size?: number): Promise<any> {
        const request = this.doGet();
        
        try {
            if (size) {
                request.addQueryParam('s', size);
            }
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/*'
 * /rest/api/1.0/projects/{projectKey}
 * /rest/api/1.0/projects/{projectKey}/avatar.png
 * /rest/api/1.0/projects/{projectKey}/repos
 * /rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/forks
 * ...
 */
export class ProjectsEndpoint extends EndpointService {

    /**
     * Contains all operations related with project avatar
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/avatar.png'. 
     * @param {string} projectKey Project key to work with avatar
     * @returns {ProjectAvatarEndpoint} Get all operations about the project avatar
     */
    avatar = (projectKey: string): ProjectAvatarEndpoint => {
        return new ProjectAvatarEndpoint(this.auth, projectKey);
    };

    /**
     * Contains all operations related with project repositories
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/repos'. 
     * @param {string} projectKey Project key to work with repos
     * @returns {ProjectReposEndpoint} Get all operations about the project avatar
     */
    repos = (projectKey: string): ProjectReposEndpoint => {
        return new ProjectReposEndpoint(this.auth, projectKey);
    };

    /**
     * Contains all operations related with project permissions
     * All paths and operations from '/rest/api/1.0/projects/{projectKey}/permissions' 
     * @param {string} projectKey Project key to work with repos
     * @returns {ProjectPermissionsEndpoint} Get all operations about the project permissions
     */
    permissions = (projectKey: string): ProjectPermissionsEndpoint => {
        return new ProjectPermissionsEndpoint(this.auth, projectKey);
    };

    constructor(auth: Basic) {
        super(auth, '/projects');
    }

    /**
     * List all projets from Stash. The results are paginated. You can use the pagination options you need to get the desired results. 
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<ProjectOutput>>} Promise with the requested page data.
     */
    async list(pageOptions?: PageOptions): Promise<Page<ProjectOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<ProjectOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new projects into Stash.
     * @param {ProjectInput} projectOptions Project data to create it
     * @returns {Promise<ProjectOutput>} Promise with the Created project data
     */
    async create(projectOptions: ProjectInput): Promise<ProjectOutput> {
        const request = this.doPost().asJson().withBody(new ProjectInputImp(projectOptions));
        try {
            const result = await request.execute();
            return result.data as ProjectOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get a specific project from Stash.
     * @param {string} projectKey Project key to get it
     * @returns {Promise<ProjectOutput>} Promise with the requested project data
     */
    async get(projectKey: string): Promise<ProjectOutput> {
        const request = this.doGet({
            param: projectKey,
        }).asJson();
        try {
            const result = await request.execute();
            return result.data as ProjectOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update a specific project from Stash.
     * @param {string} projectKey Project key to update
     * @param {ProjectInput} projectOptions Project data to update
     * @returns {Promise<ProjectOutput>} Promise with the updated project data
     */
    async update(projectKey: string, projectOptions: ProjectInput): Promise<ProjectOutput> {
        const request = this.doPost({
            param: projectKey
        }).asJson().withBody(new ProjectInputImp(projectOptions));
        try {
            const result = await request.execute();
            return result.data as ProjectOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a specific project from Stash.
     * @param {string} projectKey Project key to delete
     * @returns {Promise<string>} Promise with the deleted project key
     */
    async delete(projectKey: string): Promise<string> {
        const request = this.doDelete({
            param: projectKey,
        }).asJson();
        try {
            const result = await request.execute();
            return result.data as string;
        } catch (error) {
            throw error;
        }
    }

}
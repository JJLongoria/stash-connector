import { AxiosError } from "axios";
import { HTTP, HTTPRequest } from "../core/http";

export class Basic {

    private readonly API_ENDPOINT = '/rest/api/1.0';

    user: string;
    password: string;
    host: string;
    apiEndpoint: string;

    constructor(auth: BasicAuth) {
        this.user = auth.user;
        this.password = auth.password;
        this.host = auth.host;
        this.apiEndpoint = this.processURL(auth.host) + this.API_ENDPOINT;
    }

    encode() {
        return btoa(this.user + ':' + this.password);
    }

    header() {
        return 'Basic ' + this.encode();
    }

    private processURL(url: string) {
        if (url.endsWith('/')) {
            return url.substring(0, url.length - 1);
        }
        return url;
    }

}

export interface BasicAuth {

    user: string;
    password: string;
    host: string;

}

export interface EndpointServiceOptions {
    pageOptions?: PageOptions;
    param?: any;
}

export class EndpointService {
    private readonly AUTH_HEADER = 'Authorization';
    protected auth: Basic;
    protected path: string;

    constructor(auth: Basic, path: string) {
        this.auth = new Basic({
            host: auth.host,
            user: auth.user,
            password: auth.password
        });
        this.auth.apiEndpoint = auth.apiEndpoint;
        this.path = path;
        this.auth.apiEndpoint += path;
    }

    private setPageOptions(request: HTTPRequest, pageOptions?: PageOptions) {
        this.processOptions(request, pageOptions);
    }

    private getEndpoint(options?: EndpointServiceOptions) {
        let endpoint = this.auth.apiEndpoint;
        if (options?.param) {
            endpoint += '/' + options?.param;
        }
        return endpoint;
    }

    protected processOptions(request: HTTPRequest, options?: any) {
        if (options) {
            for (const key of Object.keys(options)) {
                const value = options[key];
                if (key !== 'pageOptions' && value !== undefined) {
                    request.addQueryParam(key, value);
                }
            }
        }
    }

    protected doGet(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.get(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doPost(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.post(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doPut(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.put(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doDelete(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.delete(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }
}

export class StashError extends Error {

    statusCode: number;
    status?: string;
    statusText?: string;
    errors?: StashErrorData[];

    constructor(error: AxiosError) {
        super(error.message);
        this.statusCode = error.response?.status || 400;
        this.name = 'StashError';
        this.stack = error.stack;
        this.status = error.status;
        this.statusText = error.response?.statusText;
        if (error.response && error.response.data) {
            const data = error.response.data as any;
            if (data.errors) {
                this.errors = data.errors as StashErrorData[];
            }
        }
    }

}

export interface StashErrorData {
    context?: string;
    message: string;
    exceptionName: string;
}

export interface PageOptions {
    limit?: number;
    start?: number;
}

export class Page<T> {
    size: number = 0;
    limit: number = 0;
    isLastPage: boolean = true;
    values: T[] = [];
    start: number = 0;
    filter?: any;
    nextPageStart?: number = 0;
}

export interface Line {
    text: string;
}

export class Avatar {

    type: string;
    content: any;

    constructor(type: string, content: any) {
        this.type = type;
        this.content = content;
    }

    getAvatar() {
        return 'data:image/' + this.type + ';base64,' + this.content + '';
    }
}

export interface RestOutput {
    link: Link;
    links: { [key: string]: LinkRef[] }
}

export interface ProjectInput {
    key: string;
    name: string;
    description: string;
    avatar?: Avatar;
}

export interface Project extends RestOutput {
    key: string;
    id: string;
    name: string;
    description: string;
    public: boolean;
    type: string;
}

export interface CreateRepoInput {
    name: string;
    scmId: string;
}

export interface UpdateRepoInput {
    slug?: string;
    name?: string;
    scmId?: string;
    forkable?: boolean;
    project?: {
        key: string;
    };
    public?: boolean;
}

export interface ForkRepoInput {
    slug?: string;
    name?: string;
    project?: {
        key: string;
    };
}

export interface Repository extends RestOutput {
    slug: string;
    id: string;
    name: string;
    origin?: Repository;
    scmId: string;
    state: string;
    statusMessage: string;
    forkable: boolean;
    project: Project;
    public: boolean;
    cloneUr: string;
}

export interface ListBranchesOptions {
    base?: string;
    details?: boolean;
    filterText?: string;
    orderBy?: 'ALPHABETICAL' | 'MODIFICATION';
    pageOptions?: PageOptions
}

export interface Branch {
    id: string;
    displayId: string;
    latestChangeset: string;
    latestCommit: string;
    isDefault: boolean;
}

export interface RepoBrowseOptions {
    at?: string;
    type?: boolean;
    blame?: string;
    noContent?: string;
    pageOptions?: PageOptions
}

export interface RepoChangesOptions {
    since?: string;
    until?: string;
    pageOptions?: PageOptions;
}

export interface RepoChangesOutput extends RestOutput {
    contentId: string;
    fromContentId: string;
    path: FilePath;
    executable: boolean;
    percentUnchanged: number;
    type: string;
    nodeType: string;
    srcPath: FilePath;
    srcExecutable: boolean;
}

export interface CommitOptions {
    path?: string;
    since?: string;
    until?: string;
    withCounts?: boolean;
    pageOptions?: PageOptions;
}

export interface Commit extends RestOutput {
    id: string;
    displayId: string;
    author: User;
    authorTimestamp: number;
    message: string;
    parents: Commit[];
    attributes: { [key: string]: string };
}

export interface CommitChangesOptions {
    since?: string;
    withComments?: boolean;
    pageOptions?: PageOptions;
}

export interface UserInput {
    name?: string;
    emailAddress?: string;
    displayName?: string;
    type?: string;
    directoryName?: string;
    deletable?: boolean;
    lastAuthenticationTimestamp?: number;
    mutableDetails?: boolean;
    mutableGroups?: boolean;
}

export interface User {
    name: string;
    emailAddress: string;
    id: number;
    displayName: string;
    active: boolean;
    slug: string;
    type: string;
    directoryName?: string;
    deletable?: boolean;
    lastAuthenticationTimestamp?: number;
    mutableDetails?: boolean;
    mutableGroups?: boolean;
}

export interface CommentInput {
    text: string;
    parent?: {
        id: string;
    }
    anchor?: CommentAnchor;
}

export interface CommentAnchor {
    fromHash?: string;
    toHash?: string;
    line?: number;
    lineType?: 'ADDED' | 'REMOVED' | 'CONTEXT';
    fileType?: 'FROM' | 'TO';
    path?: string;
    srcPath?: string;
    orphaned?: boolean;
}

export interface Comment {
    properties: { [key: string]: string };
    id: number;
    version: number;
    text: string;
    author: User;
    createdDate: number;
    updatedDate: number;
    comments: Comment[];
    attributes: { [key: string]: string };
    tasks: { [key: string]: string };
    permittedOperations: {
        editable: boolean;
        deletable: boolean;
    }
}

export interface CommentOptions {
    since?: string;
    path?: string;
    pageOptions?: PageOptions;
}

export interface CommitDiffOptions {
    contextLines?: number;
    since?: string;
    srcPath?: string;
    whitespace?: string;
    withComments?: boolean;
    pageOptions?: PageOptions;
}

export interface CommitDiffOutput {
    diffs: CommitDiff[];
}

export interface CommitDiff {
    source: FilePath;
    destination: FilePath;
    hunks: CommitDiffHunk[];
    truncated: boolean;
}

export interface CommitDiffHunk {
    sourceLine: number;
    sourceSpan: number;
    destinationLine: number;
    destinationSpan: number;
    segments: CommitDiffHunkSegment[];
    truncated: boolean;
}

export interface CommitDiffHunkSegment {
    type: string;
    lines: CommitDiffLine[];
    truncated: boolean;
}

export interface CommitDiffLine {
    destination: number;
    source: number;
    line: string;
    truncated: boolean;
}

export interface CompareChangesOptions {
    from?: string;
    to?: string;
    fromRepo?: string;
    pageOptions?: PageOptions;
}

export interface CompareCommitsOptions {
    from?: string;
    to?: string;
    fromRepo?: string;
    pageOptions?: PageOptions;
}

export interface CompareDiffOptions {
    from?: string;
    to?: string;
    fromRepo?: string;
    srcPath?: string;
    contextLines?: number;
    whitespace?: string;
    pageOptions?: PageOptions;
}

export interface RepoDiffOptions {
    since?: string;
    srcPath?: string;
    until: string;
    contextLines?: number;
    whitespace?: string;
    pageOptions?: PageOptions;
}

export interface RepoFileOptions {
    at?: string;
    pageOptions?: PageOptions;
}

export interface PermissionUserOutput {
    name: string;
    deletable: boolean;
}

export interface Group {
    name: string;
    deletable: boolean;
}

export interface PermissionUsersOutput {
    user: User;
    permission: 'LICENSED_USER' | 'PROJECT_CREATE' | 'ADMIN' | 'SYS_ADMIN' | 'PROJECT_READ' | 'PROJECT_WRITE' | 'REPO_READ' | 'REPO_WRITE' | 'REPO_ADMIN';
}

export interface PermissionGroups {
    group: Group;
    permission: 'LICENSED_USER' | 'PROJECT_CREATE' | 'ADMIN' | 'SYS_ADMIN' | 'PROJECT_READ' | 'PROJECT_WRITE' | 'REPO_READ' | 'REPO_WRITE' | 'REPO_ADMIN';
}

export interface RepoPullRequestOptions {
    direction?: 'INCOMING' | 'OUTGOING';
    at?: string;
    state?: 'ALL' | 'OPEN' | 'DECLINED' | 'MERGED';
    order?: 'OLDEST' | 'NEWEST';
    withAttributes?: boolean;
    withProperties?: boolean;
    pageOptions?: PageOptions;
}

export interface PullRequestInput {
    title: string;
    description: string;
    state: 'ALL' | 'OPEN' | 'DECLINED' | 'MERGED';
    open?: boolean;
    closed?: boolean;
    fromRef: PullRequestRefInput;
    toRef: PullRequestRefInput;
    locked?: boolean;
    reviewers?: Participant[];
}

export interface PullRequestUpdateInput {
    title?: string;
    description?: string;
    toRef?: PullRequestRefInput;
    reviewers?: Participant[];
}

export interface PullRequest extends RestOutput {
    id: number;
    version: number;
    title: string;
    description: string;
    state: 'ALL' | 'OPEN' | 'DECLINED' | 'MERGED';
    open: boolean;
    closed: boolean;
    canMerge: boolean;
    conflicted: boolean;
    vetoes: PullRequestVeto[];
    createdDate: number;
    updatedDate: number;
    fromRef: PullRequestRef;
    toRef: PullRequestRef;
    locked: boolean;
    author: Participant;
    reviewers: Participant[];
    participants: Participant[];
}

export interface PullRequestVeto {
    summaryMessage: string;
    detailedMessage: string;
}

export interface PullRequestRef {
    id: string;
    repository: Repository;
}

export interface PullRequestRefInput {
    id: string;
    repository: {
        slug: string;
        project: {
            key: string;
        }
    };
}

export interface Participant {
    user: User;
    role: 'AUTHOR' | 'REVIEWER' | 'PARTICIPANT';
    approved: boolean;
}

export interface ParticipantInput {
    user: {
        name: string;
    };
    role: 'AUTHOR' | 'REVIEWER' | 'PARTICIPANT';
}

export interface PullRequestActivityOptions {
    fromId?: number;
    fromType: 'COMMENT' | 'ACTIVITY';
    pageOptions?: PageOptions;
}

export interface PullRequestActivity {
    id: number;
    createdDate: number;
    user: User;
    action: string;
    commentAction?: string;
    comment?: Comment;
    commentAnchor?: CommentAnchor;
    fromHash?: string;
    previousFromHash?: string;
    previousToHash?: string;
    toHash?: string;
    added?: PullRequestActivityChanges;
    removed?: PullRequestActivityChanges;
}

export interface PullRequestActivityChanges {
    changesets?: Commit[];
    commits?: Commit[];
    total: number;
}


export interface PullRequestDiffOptions {
    contextLines?: number;
    srcPath?: string;
    whitespace?: string;
    withComments?: boolean;
    pageOptions?: PageOptions;
}

export interface Task {
    id: number;
    properties: { [key: string]: string };
    anchor: Comment;
    author: User;
    createdDate: number;
    permittedOperations: {
        deletable: boolean;
        editable: boolean;
        transitionable: boolean;
    };
    text: string;
    state: 'OPEN' | 'RESOLVED';
}

export interface TaskInput {
    anchor?: Comment;
    text?: string;
    state?: 'OPEN' | 'RESOLVED';
}

export interface TaskCountOutput {
    open: number;
    resolved: number;
}

export interface HookInput {
    details: HookDetails;
    enabled: boolean;
    configured: boolean;
}

export interface HookOutput {
    details: HookDetails;
    enabled: boolean;
    configured: boolean;
}

export interface HookDetails {
    key: string;
    name: string;
    type: 'PRE_RECEIVE' | 'POST_RECEIVE';
    description: string;
    version: string;
    configFormKey?: string;
}

export interface TagsOptions {
    filterText?: string;
    orderBy?: 'ALPHABETICAL' | 'MODIFICATION';
    pageOptions?: PageOptions;
}

export interface TagOutput {
    id: string;
    displayId: string;
    latestChangeset: string;
    latestCommit: string;
    hash: string;
}

export interface PermittedOutput {
    permitted: boolean;
}

export interface AddUsersInput {
    group: string;
    users: string[];
}

export interface AddGroupInput {
    user: string;
    groups: string[];
}

export interface RemoveGroupInput {
    context: string;
    itemName: string;
}

export interface ChangeUserPasswordInput {
    password: string;
    passwordConfirm: string;
    name: string;
}

export interface ChangePasswordInput {
    password: string;
    passwordConfirm: string;
    oldPassword: string;
}

export interface GroupMembersOptions {
    context?: string;
    filter?: string;
    pageOptions?: PageOptions;
}

export interface CreateUserInput {
    name: string;
    password: string;
    displayName: string;
    emailAddress: string;
    addToDefaultGroup: boolean;
    notify: string;
}

export interface ClusterOutput {
    localNode: ClusterNode;
    nodes: ClusterNode[];
    running: boolean;
}

export interface ClusterNode {
    id: string;
    name: string;
    address: ClusterAddress;
    local: boolean;
}

export interface ClusterAddress {
    hostName: string;
    port: number;
}

export interface License {
    creationDate: number;
    purchaseDate: number;
    expiryDate: number;
    numberOfDaysBeforeExpiry: number;
    maintenanceExpiryDate: number;
    numberOfDaysBeforeMaintenanceExpiry: number;
    gracePeriodEndDate: number;
    numberOfDaysBeforeGracePeriodExpiry: number;
    maximumNumberOfUsers: number;
    unlimitedNumberOfUsers: boolean;
    serverId: string;
    supportEntitlementNumber: string;
    license: string;
    status: LicenseStatus;
}

export interface LicenseStatus {
    serverId: string;
    currentNumberOfUsers: number;
}

export interface MailHostConfigurationInput {
    hostname: string;
    port: number;
    protocol: string;
    'use-start-tls': boolean;
    'require-start-tls': boolean;
    username: string;
    'sender-address': string;
}

export interface MailHostConfiguration {
    hostname: string;
    port: number;
    protocol: string;
    'use-start-tls': boolean;
    'require-start-tls': boolean;
    username: string;
    'sender-address': string;
}

export interface FilePath {
    components: string[];
    parent: string;
    name: string;
    extension: string;
    toString: string;
}

export interface ApplicationProperties {
    version: string;
    buildNumber: number;
    buildDate: number;
    displayName: string;
}

export interface Logger {
    logLevel: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN ' | 'ERROR';
}

export interface MarkupPreviewOptions {
    urlMode: string;
    hardwrap: boolean;
    htmlEscape: boolean;
}

export interface MarkupPreviewOutput {
    html: string;
}

export interface ReposOptions {
    name?: string;
    projectname?: string;
    permission?: 'REPO_READ' | 'REPO_WRITE ' | 'REPO_ADMIN';
    visibility?: 'public' | 'private';
    pageOptions?: PageOptions;
}

export interface DeleteAvatarOutput {
    href: string;
}

export interface Link {
    url: string;
    rel: string;
}

export interface LinkRef {
    href: string;
}

import { AdminEndpoint } from "./endpoints/admin";
import { ApplicationEndpoint } from "./endpoints/applicaton";
import { GroupsEndpoint } from "./endpoints/groups";
import { HooksEndpoint } from "./endpoints/hooks";
import { LogsEndpoint } from "./endpoints/logs";
import { MarkupEndpoint } from "./endpoints/markup";
import { ProjectsEndpoint } from "./endpoints/projects";
import { ProfileEndpoint } from "./endpoints/profile";
import { Basic, BasicAuth } from "./types";
import { ReposEndpoint } from "./endpoints/repos";
export * from "./types";

/**
 * Atlassian Stash Connector.
 * Class to manage the Entire API REST provided by Atlassian to work with the Stash Enterprise Repositories.
 * Its designed with very semantic use and easy to understand.
 * 
 * Instance connector
 * const connector = new StashConnector({
 *      host: 'http://<stash-url-host>...',
 *      user: '<stash-username>',
 *      password: <stash-password>
 * });
 * 
 * For example, to list all projects from Stash (Endpoint (GET): /rest/api/1.0/projects):
 * connector.projects.list();   // Accept pagination options
 * 
 * To create a new project: (Endpoint (POST): /rest/api/1.0/projects):
 * connector.projects.create();
 * 
 * To list all repository from a project: (Endpoint (GET): /rest/api/1.0/projects/{projectKey}/repos)
 * connector.projects.repos('<project-key>').list();
 * 
 * To get a specific repository data
 * connector.projects.repos('<project-key>').get('<repo-slug>');
 * 
 * And to much more methods and operations with the same use.
 * 
 * See all available endpoints and operatios from Atlassian Stash API Rest:
 * https://docs.atlassian.com/DAC/rest/stash/3.11.3/stash-rest.html
 */
export class StashConnector {

    private auth: Basic;

    /**
     * Contains all operations from '/rest/api/1.0/admin/*'.
     */
    admin: AdminEndpoint;

    /**
     * Contains all operations from '/rest/api/1.0/application-properties/*'. 
     */
    applicationProperties: ApplicationEndpoint;

    /**
    * Contains all operations from '/rest/api/1.0/groups/.
    */
    groups: GroupsEndpoint;

    /**
    * Contains all operations from '/rest/api/1.0/hooks/.
    */
    hooks: HooksEndpoint;

    /**
    * Contains all operations from '/rest/api/1.0/logs/.
    */
    logs: LogsEndpoint;

    /**
     * Contains all operations from '/rest/api/1.0/markup/.
     */
    markup: MarkupEndpoint;

    /**
    * Contains all operations from '/rest/api/1.0/profile/.
    */
    profile: ProfileEndpoint;

    /**
     * Contains all operations from '/rest/api/1.0/projects/*'.
     */
     projects: ProjectsEndpoint;


    /**
    * Contains all operations from '/rest/api/1.0/repos/.
    */
     repos: ReposEndpoint;

    /**
     * Instance new Stash Connector with user credentials and stash host.
     * @param {BasicAuth} auth Basic Authorization info and stash host 
     */
    constructor(auth: BasicAuth) {
        this.auth = new Basic(auth);
        this.projects = new ProjectsEndpoint(this.auth);
        this.admin = new AdminEndpoint(this.auth);
        this.applicationProperties = new ApplicationEndpoint(this.auth);
        this.groups = new GroupsEndpoint(this.auth);
        this.hooks = new HooksEndpoint(this.auth);
        this.logs = new LogsEndpoint(this.auth);
        this.markup = new MarkupEndpoint(this.auth);
        this.profile = new ProfileEndpoint(this.auth);
        this.repos = new ReposEndpoint(this.auth);
    }
}








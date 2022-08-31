import { AdminEndpoint } from "./endpoints/admin";
import { ProjectsEndpoint } from "./endpoints/projects";
import { Basic, BasicAuth } from "./types";
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
     * Contains all operations related with projects.
     * All paths from '/rest/api/1.0/projects/*'. 
     */
    projects: ProjectsEndpoint;

    /**
     * Contains all operations related with administration.
     * All paths from '/rest/api/1.0/admin/*'. 
     */
    admin: AdminEndpoint;

    /**
     * Instance new Stash Connector with user credentials and stash host.
     * @param {BasicAuth} auth Basic Authorization info and stash host 
     */
    constructor(auth: BasicAuth) {
        this.auth = new Basic(auth);
        this.projects = new ProjectsEndpoint(this.auth);
        this.admin = new AdminEndpoint(this.auth);
    }
}








import { Basic, EndpointService, Page, PageOptions, Repository } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/profile/'
 */
export class ProfileEndpoint extends EndpointService {

    /**
     * Contains all operations related with recent records
     * All paths and operations from '/rest/api/1.0/profile/recent'. 
     * @returns {ProfileRecentEndpoint} Get all operations about recent records
     */
     recent = () => {
        return new ProfileRecentEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/profile');
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/recent/'
 */
export class ProfileRecentEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/recent');
    }

    /**
     * Retrieve a page of recently accessed repositories for the currently authenticated user. Repositories are ordered from most recently to least recently accessed
     * @param {string} [permission] (optional) if specified, it must be a valid repository permission level name and will limit the resulting repository list to ones that the requesting user has the specified permission level to. If not specified, the default REPO_READ permission level will be assumed.
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<Repository>>} Promise with requested page data
     */
    async repos(permission?: string, pageOptions?: PageOptions): Promise<Page<Repository>> {
        const request = this.doGet({
            param: 'repos',
            pageOptions: pageOptions
        });
        try {
            if (permission) {
                request.addQueryParam('permission', permission);
            }
            const result = await request.execute();
            return result.data as Page<Repository>;
        } catch (error) {
            throw error;
        }
    }

}
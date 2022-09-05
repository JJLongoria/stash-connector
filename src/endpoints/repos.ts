import { Basic, EndpointService, Page, Repository, ReposOptions } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/repos/*'
 */
export class ReposEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/repos');
    }

    /**
     * Retrieve a page of repositories based on query parameters that control the search. See the documentation of the parameters for more details
     * @param {ReposOptions} [reposOptions] Options to list repositories including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<Repository>>} Promise with the requested page data
     */
    async list(reposOptions?: ReposOptions): Promise<Page<Repository>> {
        const request = this.doGet({
            pageOptions: reposOptions?.pageOptions
        });
        try {
            this.processOptions(request, reposOptions);
            const result = await request.execute();
            return result.data as Page<Repository>;
        } catch (error) {
            throw error;
        }
    }



}
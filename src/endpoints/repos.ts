import { Basic, EndpointService, Page, RepoOutput, ReposOptions } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/groups/*'
 */
export class ReposEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/repos');
    }

    /**
     * Retrieve a page of repositories based on query parameters that control the search. See the documentation of the parameters for more details
     * @param {ReposOptions} [reposOptions] Options to list repositories including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<RepoOutput>>} Promise with the requested page data
     */
    async list(reposOptions?: ReposOptions): Promise<Page<RepoOutput>> {
        const request = this.doGet({
            pageOptions: reposOptions?.pageOptions
        });
        try {
            this.processOptions(request, reposOptions);
            const result = await request.execute();
            return result.data as Page<RepoOutput>;
        } catch (error) {
            throw error;
        }
    }



}
import { Basic, EndpointService, Page, PageOptions } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/groups/*'
 */
export class GroupsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/groups');
    }

    /**
     * Retrieve a page of group names
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<string>>} Promise with the application properties data
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<string>> {
        const request = this.doGet({
            pageOptions: pageOptions
        });
        try {
            if(filter){
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<string>;
        } catch (error) {
            throw error;
        }
    }



}
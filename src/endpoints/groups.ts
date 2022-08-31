import { Basic, EndpointService, Page } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/groups/*'
 */
export class GroupsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/groups');
    }

    /**
     * Retrieve a page of group names
     * @returns {Promise<Page<string>>} Promise with the application properties data
     */
    async list(): Promise<Page<string>> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as Page<string>;
        } catch (error) {
            throw error;
        }
    }



}
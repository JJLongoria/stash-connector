import { ApplicationProperties, Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/application-properties/*'
 */
export class ApplicationEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/application-properties');
    }

    /**
     * Retrieve version information and other application properties
     * @returns {Promise<ApplicationProperties>} Promise with the application properties data
     */
    async get(): Promise<ApplicationProperties> {
        const request = this.doGet({
            param: 'cluster'
        });
        try {
            const result = await request.execute();
            return result.data as ApplicationProperties;
        } catch (error) {
            throw error;
        }
    }



}
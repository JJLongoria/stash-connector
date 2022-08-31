import { Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/hooks'
 */
export class HooksEndpoint extends EndpointService {

    /**
     * Contains all operations related with hooks avatar
     * All paths and operations from '/rest/api/1.0/hooks/{hookKey}/avatar'. 
     * @returns {HookAvatarEndpoint} Get all operations about hooks avatar
     */
    avatar = (hookKey: string) => {
        return new HookAvatarEndpoint(this.auth, hookKey);
    };

    constructor(auth: Basic) {
        super(auth, '/hooks');
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/hooks/{hookKey}/avatar'
 */
export class HookAvatarEndpoint extends EndpointService {

    constructor(auth: Basic, hookKey: string) {
        super(auth, '/' + hookKey + '/avatar');
    }

    /**
     * Retrieve the avatar for the hook matching the supplied hookKey
     * @param {number} [version] Optional version used for HTTP caching only - any non-blank version will result in a large max-age Cache-Control header. Note that this does not affect the Last-Modified header.
     * @returns {Promise<any>} Promise with the image data
     */
    async get(version?: number): Promise<any> {
        const request = this.doGet();
        
        try {
            if (version !== undefined) {
                request.addQueryParam('version', version);
            }
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

}
import { Basic, ChangeUserPasswordInput, DeleteAvatarOutput, EndpointService, Page, User } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/users/{userSlug}/avatar.png'
 */
export class UserAvatarEndpoint extends EndpointService {

    constructor(auth: Basic, userSlug: string) {
        super(auth, '/' + userSlug + '/avatar.png');
    }

    /**
     * Update the avatar for the user with the supplied slug
     * @param {any} avatar The desired size of the image
     * @returns {Promise<void>} If not throw errors, operation finish susccesfully
     */
    async update(avatar: any): Promise<void> {
        const request = this.doPost().withBody(avatar);
        try {
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete the avatar associated to a user
     * @returns {Promise<DeleteAvatarOutput>} Return the deleted avatar path (href) data
     */
    async delete(): Promise<DeleteAvatarOutput> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/users/{userSlug}/settings'
 */
export class UserSettingsEndpoint extends EndpointService {

    constructor(auth: Basic, userSlug: string) {
        super(auth, '/' + userSlug + '/settings');
    }

    /**
     * Retrieve a map of user setting key values for a specific user identified by the user slug
     * @returns {Promise<{ [key: string]: any }>} Promise with user settings data
     */
    async get(): Promise<{ [key: string]: any }> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as { [key: string]: any };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update the entries of a map of user setting key/values for a specific user identified by the user slug
     * @param {{ [key: string]: any }} userSettings The desired size of the image
     * @returns {Promise<void>} If not throw errors, operation finish susccesfully
     */
    async update(userSettings: { [key: string]: any }): Promise<void> {
        const request = this.doPost().withBody(userSettings);
        try {
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/users/*'
 */
export class UsersEndpoint extends EndpointService {

    /**
     * Contains all operations related with user avatar
     * All paths and operations from '/rest/api/1.0/users/{userSlug}/avatar.png'. 
     * @param {string} userSlug User slug
     * @returns {UserAvatarEndpoint} Get all operations about the user avatar
     */
    avatar = (userSlug: string) => {
        return new UserAvatarEndpoint(this.auth, userSlug);
    };

    /**
     * Contains all operations related with user settings
     * All paths and operations from '/rest/api/1.0/users/{userSlug}/settings'. 
     * @param {string} userSlug User slug
     * @returns {UserSettingsEndpoint} Get all operations about the user settings
     */
    settings = (userSlug: string) => {
        return new UserSettingsEndpoint(this.auth, userSlug);
    };

    constructor(auth: Basic) {
        super(auth, '/users');
    }

    /**
     * Retrieve a page of users, optionally run through provided filters
     * @param {string} [filter] Return only users, whose username, name or email address contain the filter value
     * @returns {Promise<Page<User>>} Promise with the requested page data
     */
    async list(filter?: string): Promise<Page<User>> {
        const request = this.doGet();
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<User>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve the user matching the supplied userSlug
     * @param {string} userSlug User slug to get user data
     * @returns {Promise<User>} Promise with the requested user data
     */
    async get(userSlug: string): Promise<User> {
        const request = this.doGet({
            param: userSlug
        });
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update the currently authenticated user's details. Note that the name attribute is ignored, the update will always be applied to the currently authenticated user.
     * @param {User} userInput User input data to update
     * @returns {Promise<User>} Promise with the updated user data
     */
    async update(userInput: User): Promise<User> {
        const request = this.doPut().asJson().withBody(userInput);
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update the currently authenticated user's password
     * @param {ChangeUserPasswordInput} changePasswordInput Change password input to update it
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async changePassword(changePasswordInput: ChangeUserPasswordInput): Promise<void> {
        const request = this.doPut({
            param: 'credentials'
        }).asJson().withBody(changePasswordInput);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }



}
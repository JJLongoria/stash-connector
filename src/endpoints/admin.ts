import { AddGroupInput, AddUsersInput, Basic, ChangePasswordInput, CreateUserInput, EndpointService, GroupMembersOptions, Page, PageOptions, PermissionGroupOutput, User } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/admin/groups'
 */
export class AdminGroupsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/groups');
    }

    /**
     * Retrieve a page of groups
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroupOutput>>} Promise with the updated project data
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionGroupOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionGroupOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new group
     * @param {string} name Name of the group 
     * @returns {Promise<PermissionGroupOutput>} Promise with the created group data
     */
    async create(name: string): Promise<PermissionGroupOutput> {
        const request = this.doPost();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return result.data as PermissionGroupOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes the specified group, removing them from the system. This also removes any permissions that may have been granted to the group
     * @param {string} name Name of the group 
     * @returns {Promise<PermissionGroupOutput>} Promise with the deleted group data
     */
    async delete(name: string): Promise<PermissionGroupOutput> {
        const request = this.doDelete();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return result.data as PermissionGroupOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add multiple users to a group.
     * @param {AddUsersInput} addUsersInput Add users input data
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async addUsers(addUsersInput: AddUsersInput): Promise<void> {
        const request = this.doPost({
            param: 'add-users'
        }).asJson().withBody(addUsersInput);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a list of users that are members of a specified group.
     * @param {GroupMembersOptions} [groupMemberOptions] Group Members options including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<User>>} If not throw errors, operation finish succesfully
     */
    async members(groupMemberOptions?: GroupMembersOptions): Promise<Page<User>> {
        const request = this.doPost({
            param: 'more-members'
        });
        try {
            this.processOptions(request, groupMemberOptions);
            const result = await request.execute();
            return result.data as Page<User>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a list of users that are members of a specified group.
     * @param {GroupMembersOptions} [groupMemberOptions] Group Members options including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<User>>} If not throw errors, operation finish succesfully
     */
    async nonMembers(groupMemberOptions?: GroupMembersOptions): Promise<Page<User>> {
        const request = this.doPost({
            param: 'more-non-members'
        });
        try {
            this.processOptions(request, groupMemberOptions);
            const result = await request.execute();
            return result.data as Page<User>;
        } catch (error) {
            throw error;
        }
    }



}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/admin/groups'
 */
export class AdminUsersEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/users');
    }

    /**
     * Retrieve a page of users
     * @param {string} [filter] If specified only users with usernames, display name or email addresses containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<User>>} Promise with the updated project data
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<User>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
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
     * Creates a new user from the assembled query parameters
     * @param {CreateUserInput} userInput User data to create 
     * @returns {Promise<void>} If not throw erros, operation finish succesfully
     */
    async create(userInput: CreateUserInput): Promise<void> {
        const request = this.doPost();
        try {
            this.processOptions(request, userInput);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update a user's details
     * @param {string} name Name of the user 
     * @returns {Promise<User>} Promise with the updated user data
     */
    async update(user: User): Promise<User> {
        const request = this.doPut().asJson().withBody(user);
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Rename a user
     * @param {string} oldName Name of the user 
     * @param {string} newName Name of the user 
     * @returns {Promise<User>} Promise with the updated user data
     */
    async rename(oldName: string, newName: string): Promise<User> {
        const request = this.doPost({
            param: 'rename'
        }).asJson().withBody({
            name: oldName,
            newName: newName,
        });
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes the specified user, removing them from the system. This also removes any permissions that may have been granted to the user
     * @param {string} name Name of the user 
     * @returns {Promise<User>} Promise with the deleted user data
     */
    async delete(name: string): Promise<User> {
        const request = this.doDelete();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add multiple users to a group.
     * @param {AddGroupInput} addUsersInput Add users input data
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async addGroups(addGroupInput: AddGroupInput): Promise<void> {
        const request = this.doPost({
            param: 'add-groups'
        }).asJson().withBody(addGroupInput);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Remove a user from a group.
     * @param {string} user The username to remove it
     * @param {string} group The group to remove from
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async removeGroup(user: string, group: string): Promise<void> {
        const request = this.doPost({
            param: 'remove-group'
        }).asJson().withBody({
            context: user,
            itemName: group,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a list of groups the specified user is a member of.
     * @param {GroupMembersOptions} [groupMemberOptions] Group Members options including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroupOutput>>} If not throw errors, operation finish succesfully
     */
    async groups(groupMemberOptions?: GroupMembersOptions): Promise<Page<PermissionGroupOutput>> {
        const request = this.doPost({
            param: 'more-members'
        });
        try {
            this.processOptions(request, groupMemberOptions);
            const result = await request.execute();
            return result.data as Page<PermissionGroupOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a list of groups the specified user is not a member of.
     * @param {GroupMembersOptions} [groupMemberOptions] Group Members options including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroupOutput>>} If not throw errors, operation finish succesfully
     */
    async nonGroups(groupMemberOptions?: GroupMembersOptions): Promise<Page<PermissionGroupOutput>> {
        const request = this.doPost({
            param: 'more-non-members'
        });
        try {
            this.processOptions(request, groupMemberOptions);
            const result = await request.execute();
            return result.data as Page<PermissionGroupOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Clears any CAPTCHA challenge that may constrain the user with the supplied username when they authenticate. Additionally any counter or metric that contributed towards the user being issued the CAPTCHA challenge (for instance too many consecutive failed logins) will also be reset
     * @param {string} [name] The username to clear captchas
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async captcha(name: string): Promise<void> {
        const request = this.doDelete({
            param: 'captcha'
        });
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Update a user's password. 
     * @param {ChangePasswordInput} changePasswordInput Change Password input data
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async changePassword(changePasswordInput: ChangePasswordInput): Promise<void> {
        const request = this.doPut({
            param: 'credentials'
        }).asJson().withBody(changePasswordInput);
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/admin/*'
 * /rest/api/1.0/admin/groups
 * /rest/api/1.0/admin/users/add-groups
 * /rest/api/1.0/admin/cluster
 * ...
 */
export class AdminEndpoint extends EndpointService {

    /**
     * Contains all operations related with group administration
     * All paths and operations from '/rest/api/1.0/admin/groups'. 
     * @returns {AdminGroupsEndpoint} Get all operations about group administration
     */
    groups = () => {
        return new AdminGroupsEndpoint(this.auth);
    };

    /**
     * Contains all operations related with users administration
     * All paths and operations from '/rest/api/1.0/admin/users'. 
     * @returns {AdminUsersEndpoint} Get all operations about users administration
     */
    users = () => {
        return new AdminUsersEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/admin');
    }

}
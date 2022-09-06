import { AddGroupInput, AddUsersInput, Basic, ChangePasswordInput, ClusterOutput, CreateUserInput, EndpointService, GroupMembersOptions, License, MailHostConfigurationInput, MailHostConfiguration, Page, PageOptions, Group, PermissionGroups, PermissionUserOutput, PermissionUsersOutput, User } from "../types";

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
     * @returns {Promise<Page<Group>>} Promise with the updated project data
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<Group>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<Group>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new group
     * @param {string} name Name of the group 
     * @returns {Promise<Group>} Promise with the created group data
     */
    async create(name: string): Promise<Group> {
        const request = this.doPost();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return result.data as Group;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes the specified group, removing them from the system. This also removes any permissions that may have been granted to the group
     * @param {string} name Name of the group 
     * @returns {Promise<Group>} Promise with the deleted group data
     */
    async delete(name: string): Promise<Group> {
        const request = this.doDelete();
        try {
            request.addQueryParam('name', name);
            const result = await request.execute();
            return result.data as Group;
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
     * @param {string} oldName Old Name of the user 
     * @param {string} newName New Name of the user 
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
     * Add User to a multiple groups.
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
     * @returns {Promise<Page<Group>>} If not throw errors, operation finish succesfully
     */
    async groups(groupMemberOptions?: GroupMembersOptions): Promise<Page<Group>> {
        const request = this.doPost({
            param: 'more-members'
        });
        try {
            this.processOptions(request, groupMemberOptions);
            const result = await request.execute();
            return result.data as Page<Group>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a list of groups the specified user is not a member of.
     * @param {GroupMembersOptions} [groupMemberOptions] Group Members options including the paginations options. - pageOptions: Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<Group>>} If not throw errors, operation finish succesfully
     */
    async nonGroups(groupMemberOptions?: GroupMembersOptions): Promise<Page<Group>> {
        const request = this.doPost({
            param: 'more-non-members'
        });
        try {
            this.processOptions(request, groupMemberOptions);
            const result = await request.execute();
            return result.data as Page<Group>;
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
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/admin/license'
 */
export class AdminLicenseEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/license');
    }

    /**
     * Retrieves details about the current license, as well as the current status of the system with regards to the installed license. 
     * The status includes the current number of users applied toward the license limit, as well as any status messages about the license 
     * (warnings about expiry or user counts exceeding license limits). 
     * @returns {Promise<License>} Promise with the updated project data
     */
    async get(): Promise<License> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as License;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Decodes the provided encoded license and sets it as the active license. 
     * If no license was provided, a 400 is returned. If the license cannot be decoded, or cannot be applied, a 409 is returned
     * @param {string} license new license to update
     * @returns {Promise<License>} Promise with the updated project data
     */
    async update(license: string): Promise<License> {
        const request = this.doPost().asJson().withBody({
            license: license,
        });
        try {
            const result = await request.execute();
            return result.data as License;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/admin/mail-server'
 */
export class AdminMailServerEndpoint extends EndpointService {

    /**
     * Contains all operations related with mail server sender address administration
     * All paths and operations from '/rest/api/1.0/admin/mail-server/sender-address'. 
     * @returns {AdminMailServerSenderAddressEndpoint} Get all operations about mail server sender address administration
     */
    senderAddress = () => {
        return new AdminMailServerSenderAddressEndpoint(this.auth);
    };


    constructor(auth: Basic) {
        super(auth, '/mail-server');
    }

    /**
     * Retrieves the current mail configuration 
     * @returns {Promise<MailHostConfiguration>} Promise with the mail host configuration data
     */
    async get(): Promise<MailHostConfiguration> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as MailHostConfiguration;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the mail configuration
     * @param {MailHostConfigurationInput} mailServerInput Mail server data to update
     * @returns {Promise<MailHostConfiguration>} Promise with the updated mail host configuration data
     */
    async update(mailServerInput: MailHostConfigurationInput): Promise<MailHostConfiguration> {
        const request = this.doPut().asJson().withBody(mailServerInput);
        try {
            const result = await request.execute();
            return result.data as MailHostConfiguration;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes the current mail configuration
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async delete(): Promise<void> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/projects/admin/mail-server/sender-address'
 */
export class AdminMailServerSenderAddressEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/sender-address');
    }

    /**
     * Retrieves the server email address 
     * @returns {Promise<string>} Promise with the mail host configuration data
     */
    async get(): Promise<string> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the server email address 
     * @param {string} serverEmail Mail server data to update
     * @returns {Promise<string>} Promise with the updated mail host configuration data
     */
    async update(serverEmail: string): Promise<string> {
        const request = this.doPut().asJson().withBody(serverEmail);
        try {
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Clears the server email address
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async delete(): Promise<void> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/admin/permissions'
 */
export class AdminPermissionsEndpoint extends EndpointService {

    /**
     * Contains all operations related with admin user permissions
     * All paths and operations from '/rest/api/1.0/admin/permissions/users'. 
     * @returns {AdminPermissionsUsersEndpoint} Get all operations about admin user permissions
     */
    users = (): AdminPermissionsUsersEndpoint => {
        return new AdminPermissionsUsersEndpoint(this.auth);
    };

    /**
     * Contains all operations related with admin groups permissions
     * All paths and operations from '/rest/api/1.0/admin/permissions/groups'. 
     * @returns {AdminPermissionsGroupsEndpoint} Get all operations about admin groups permissions
     */
    groups = (): AdminPermissionsGroupsEndpoint => {
        return new AdminPermissionsGroupsEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/permissions');
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/admin/permissions/users'
 */
export class AdminPermissionsUsersEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/users');
    }

    /**
     * Retrieve a page of users that have no granted global permissions.
     * @param {string} [filter] If specified only user names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionUserOutput>>} Promise with the requested page data.
     */
    async none(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionUserOutput>> {
        const request = this.doGet({
            param: 'none',
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionUserOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a page of users that have been granted at least one global permission.
     * @param {string} [filter] If specified only user names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionUsersOutput>>} Promise with the requested page data.
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionUsersOutput>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionUsersOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Promote or demote the global permission level of a user.
     * @param {string} name The name of the user 
     * @param {string} permission The permission to grant
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async update(name: string, permission: 'PROJECT_READ' | 'PROJECT_WRITE' | 'PROJECT_ADMIN'): Promise<void> {
        const request = this.doPut();
        try {
            request.addQueryParam('name', name);
            request.addQueryParam('permission', permission);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Revoke all global permissions for a user
     * @param {string} name The name of the user
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async revoke(name: string): Promise<void> {
        const request = this.doDelete();
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
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/admin/permissions/groups'
 */
export class AdminPermissionsGroupsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/groups');
    }

    /**
     * Retrieve a page of groups that have no granted global permissions
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<Group>>} Promise with the requested page data.
     */
    async none(filter?: string, pageOptions?: PageOptions): Promise<Page<Group>> {
        const request = this.doGet({
            param: 'none',
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<Group>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a page of groups that have been granted at least one global permission. 
     * @param {string} [filter] If specified only group names containing the supplied string will be returned
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<PermissionGroups>>} Promise with the requested page data.
     */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<PermissionGroups>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            return result.data as Page<PermissionGroups>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Promote or demote a user's global permission level
     * @param {string} name The name of the group 
     * @param {string} permission The permission to grant
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async update(name: string, permission: 'LICENSED_USER' | 'PROJECT_CREATE' | 'ADMIN' | 'SYS_ADMIN'): Promise<void> {
        const request = this.doPut();
        try {
            request.addQueryParam('name', name);
            request.addQueryParam('permission', permission);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Revoke all global permissions for a group
     * @param {string} name The name of the group
     * @returns {Promise<void>} If not throw errors, operation finish succesfully.
     */
    async revoke(name: string): Promise<void> {
        const request = this.doDelete();
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

    /**
     * Contains all operations related with admin licenses
     * All paths and operations from '/rest/api/1.0/admin/license'. 
     * @returns {AdminLicenseEndpoint} Get all operations about admin licenses
     */
    license = () => {
        return new AdminLicenseEndpoint(this.auth);
    };

    /**
     * Contains all operations related with admin mail server
     * All paths and operations from '/rest/api/1.0/admin/mail-server'. 
     * @returns {AdminMailServerEndpoint} Get all operations about admin mail server
     */
    mailServer = () => {
        return new AdminMailServerEndpoint(this.auth);
    };

    /**
     * Contains all operations related with admin permissions
     * All paths and operations from '/rest/api/1.0/admin/permissions'. 
     * @returns {AdminPermissionsEndpoint} Get all operations about admin permissions
     */
    permissions = () => {
        return new AdminPermissionsEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/admin');
    }

    /**
     * Gets information about the nodes that currently make up the stash cluster
     * @returns {Promise<ClusterOutput>} Promise with the updated project data
     */
    async cluster(): Promise<ClusterOutput> {
        const request = this.doGet({
            param: 'cluster'
        });
        try {
            const result = await request.execute();
            return result.data as ClusterOutput;
        } catch (error) {
            throw error;
        }
    }



}
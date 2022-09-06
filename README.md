# [**Atlassian Stash Connector - BETA -**]()

[![Version](https://img.shields.io/npm/v/stash-connector?logo=npm)](https://www.npmjs.com/package/stash-connector)
[![Total Downloads](https://img.shields.io/npm/dt/stash-connector?logo=npm)](https://www.npmjs.com/package/stash-connector/core)
[![Downloads/Month](https://img.shields.io/npm/dm/stash-connector?logo=npm)](https://www.npmjs.com/package/stash-connector)
[![Issues](https://img.shields.io/github/issues/jjlongoria/stash-connector)](https://github.com/JJLongoria/stash-connector/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/JJLongoria/stash-connector/badge.svg)](https://snyk.io/test/github/JJLongoria/stash-connector)
[![Code Size](https://img.shields.io/github/languages/code-size/jjlongoria/stash-connector)](https://github.com/JJLongoria/stash-connector)
[![License](https://img.shields.io/github/license/jjlongoria/stash-connector?logo=github)](https://github.com/JJLongoria/stash-connector/blob/master/LICENSE)

**Atlassian Stash Connector** is a library to work, handle and manage all features and options from any Atlassian Stash project or repository. Developed in TypeScipts to make it more robuts and easy to use. 

The library is designed to make this use really easy. All endpoints and operations are grouped and named to make it more semantic and easy to understand.

To learn and get more information about the [**Stash Connector**]() library, all its features and how to use any operation, go to the [**Official Stash Connector Documentation**](https://github.com/JJLongoria/stash-connector/wiki).

**Atlassian Stash Connector** implement all REST API Endpoints to has a full controls of the *Stash Projects*, including peronal projects. To see all Atlassian Stash endpoints and operations, visit the [**Oficial Stash REST API Documentation**](https://docs.atlassian.com/DAC/rest/stash/3.11.3/stash-rest.html)

This is **not an Official Atlassian Project** but *use and work* with the **Atlassian Official REST API** developed for Stash.

Now Stil in BETA Version because is not fully tested.

# [**Usage**]()

```js
// Import Stash Connector package
import { StashConnector } from 'stash-connector';

// Instance the connector with the Stash URL and User credentials
const connector = new StashConnector({
    user: '<StashUserName>',
    password: '<StashPassword>',
    host: '<StashURLHost>',
});

// Use the connector...
connector.admin...
connector.projects...
connector.groups...
connector.users...
connector.markup...

```
# [**Paginated API**]()

The **Stash API Rest** work with **paginated results**, this means that the most of list commands return a **`Page<T>`** whith a collection of values of the requested data types. For example, when retrieve projects, get a **`Page<Project>`** with the paginated values.

The **`Page<T>`** object has the page data, size, limit and next page start among other data to use the paginated API. 

```ts
export class Page<T> {
    size: number = 0;               // The page size
    limit: number = 0;              // The page limit
    isLastPage: boolean = true;     // True if is the last page, false in otherwise
    values: T[] = [];               // Returned values collection.
    start: number = 0;              // First page record
    filter?: any;                   // Page filter
    nextPageStart?: number = 0;     // First record of the next page
}
```

**IMPORTANT**: If more than one page exists (i.e. the response contains "isLastPage": false), the response object will also contain a **nextPageStart** attribute which must be used by the client as the start parameter on the next request. Identifiers of adjacent objects in a page may not be contiguous, so the start of the next page is not necessarily the start of the last page plus the last page's size. A client should always use **nextPageStart** to avoid unexpected results from a paged API.

All operations that support pagination, has a `PageOptions` object as input to set the page options to the method execution and get the desired results. (In many cases, the `PageOptions` is a property of another input data object with more data).

```ts
export interface PageOptions {
    limit?: number;     // Indicates how many results to return per page 
    start?: number;     // Indicates which item should be used as the first item in the page of results
}
```

# [**Endpoints and Features**]()

Below you can see the main endpoints and operations that have the Stash REST API with a description of the feature or group. To get more information about all operations from **Stash Connector**, go to the [**Official Stash Connector Documentation**](https://github.com/JJLongoria/stash-connector/wiki).

All endpoints are grouped based on resource root, for example, all routes from `/rest/api/1.0/admin/` are grouped on [**Administration**](#administration) section or the routes from `/rest/api/1.0/projects` are grouped on [**Projects**](#projects) Section.

## [**Administration**]()

Section with all endpoints and operation from `/rest/api/1.0/admin/*`. 

This group contains all administration related tasks like **Create groups** or **users**, **grant** or **revoke** general **permissions**, get or update de **license**, manage the **mail server** or see the Stash **clusters**

## [**Application Properties**]()

Section with all endpoints and operation from `/rest/api/1.0/application-properties/*`. 

Group with operations to get the **Application Properties**

## [**Groups**]()

Section with all endpoints and operation from `/rest/api/1.0/groups/*`. 

Gorup with operations to **search groups** on Stash. To create or manage groups use the [**Admin groups operations**](#administration).

## [**Hooks**]()

Section with all endpoints and operation from `/rest/api/1.0/hooks/*`. 

Group to work with **Hook's avatars**. o work with Hooks (list, update...) use the [**Project Repo settings operations**](#project)

## [**Logs**]()

Section with all endpoints and operation from `/rest/api/1.0/logs/*`. 

This group contains all operations related with **Stash Logs** like **get** or **change** *log leves* from any logger, including root logger.

## [**Markup**]()

Section with all endpoints and operation from `/rest/api/1.0/markup/*`. 

Group with operations to **preview Markdown** content as HTML. 

## [**Profile**]()

Section with all endpoints and operation from `/rest/api/1.0/profile/*`. 

In this group can found operations to get the **recently viewed repositories**

## [**Projects**]()

Section with all endpoints and operation from `/rest/api/1.0/projects/*`.

The **bigger group** of Stash Connector because contains all operations to work with the **Stash Projects**. You can *create*, *update* *delete*... any **project**, can work with **project repositories**, make **pull request** to any branch for any repository, **list** *commits*, *changes*, handle **project** and **repository** **permissions** and to much more. Also can work with **personal repositories**

## [**Repos**]()

Section with all endpoints and operation from `/rest/api/1.0/repos/*`.

Group with operations to **search stash repositories**. To work with repositories, use [**Project Repository operations**](#projects).

## [**Tasks**]()

Section with all endpoints and operation from `/rest/api/1.0/tasks/*`.

The group with the operations to work with **Tasks** like *create*, *update*, *list* or *delete* any task.

## [**Users**]()

Section with all endpoints and operation from `/rest/api/1.0/users/*`.

Group with all operations related to **the users** (and the **logged user**). List or search users or update information about the logged user like details or avatar.

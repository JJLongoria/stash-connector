# [**Atlassian Stash Connector - BETA -**]()

[![Version](https://img.shields.io/npm/v/stash-connector?logo=npm)](https://www.npmjs.com/package/stash-connector)
[![Total Downloads](https://img.shields.io/npm/dt/stash-connector?logo=npm)](https://www.npmjs.com/package/stash-connector/core)
[![Downloads/Month](https://img.shields.io/npm/dm/stash-connector?logo=npm)](https://www.npmjs.com/package/stash-connector)
[![Issues](https://img.shields.io/github/issues/jjlongoria/stash-connector)](https://github.com/JJLongoria/stash-connector/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/JJLongoria/stash-connector/badge.svg)](https://snyk.io/test/github/JJLongoria/stash-connector)
[![Code Size](https://img.shields.io/github/languages/code-size/jjlongoria/stash-connector)](https://github.com/JJLongoria/stash-connector)
[![License](https://img.shields.io/github/license/jjlongoria/stash-connector?logo=github)](https://github.com/JJLongoria/stash-connector/blob/master/LICENSE)

**Atlassian Stash Connector** is a library to work, handle and manage all features and options from any Atlassian Stash project or repository. Developed in TypeScipts to make it more robuts and easy to use. 

The library is designed to make this use really easy. All endpoints and operations are grouped and named to make it more semantic and easy to undestand.

**Atlassian Stash Connector** implement all REST API Endpoints to has a full controls of the Stash Projects. To see all Atalassian Stash endpoints and operations, visit the [**Oficial Stash REST API Documentation**](https://docs.atlassian.com/DAC/rest/stash/3.11.3/stash-rest.html)

This is **not an Official Atlassian Project** but *use and work* with the **Atlassian Official REST API** developed for Stash.

Now Stil in BETA Version because is not fully tested.

## [**Endpoints**]()

Below you can see all the endpoints that have the Stash REST API and how to perform such an operation using the corresponding methods of the **Stash Connector**. 

All endpoints are grouped based on resource root, for example, all routes from `/rest/api/1.0/admin/` are grouped on [**Administration**](#administration) section or the routes from `/rest/api/1.0/projects` are grouped on [**Project**](#project) Section.

### [**Administration**]():

Section with all endpoints and operation from `/rest/api/1.0/admin/`

### `/rest/api/1.0/admin/groups`

```js
import { StashConnector } from 'stash-connector';
const connector = new StashConnector({
    user: '<StashUserName>',
    password: '<StashPassword>',
    host: '<StashURLHost>',
});


```

### [**Groups**]():

### [**Hooks**]():

### [**Logs**]():

### [**Markup**]():

### [**Profile**]():

### [**Projects**]():

### [**Repos**]():

### [**Tasks**]():

### [**Users**]():


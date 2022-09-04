import axios, { AxiosError } from "axios";
import * as https from 'https';
import { StashError } from "../types";
import { Utils } from './utils';

export class HTTPRequest {

    private readonly CONTENT_TYPE_HEADER = 'Content-Type';
    private readonly JSON_CONTENT_TYPE = 'application/json';
    private readonly FILE_TYPE = 'multipart/form-data';
    private method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET';
    private endpoint: string = '';
    private headers?: { [key: string]: string };
    private queryParams?: { [key: string]: string };
    private body?: any;

    constructor(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string) {
        this.method = method;
        this.endpoint = endpoint;
    }

    withBody(body: any) {
        this.body = body;
        return this;
    }

    asJson() {
        this.addHeader(this.CONTENT_TYPE_HEADER, this.JSON_CONTENT_TYPE);
        return this;
    }

    asFile() {
        this.addHeader(this.CONTENT_TYPE_HEADER, this.FILE_TYPE);
        return this;
    }

    addHeader(key: string, value: any) {
        if (!this.headers) {
            this.headers = {};
        }
        this.headers[key] = value;
        return this;
    }

    addQueryParam(key: string, value: any) {
        if (!this.queryParams) {
            this.queryParams = {};
        }
        this.queryParams[key] = value;
        return this;
    }

    execute(): Promise<HTTPResponse> {
        if (this.queryParams && Utils.hasKeys(this.queryParams)) {
            this.endpoint += '?' + processQueryParams(this.queryParams);
        }
        const options = {
            method: this.method,
            url: this.endpoint,
            headers: this.headers,
            data: this.body,
        };
        if (this.headers && this.headers[this.CONTENT_TYPE_HEADER] === this.FILE_TYPE) {
            const formData = new FormData();
            formData.append("image", this.body);
            options.data = formData;
        }
        return makeRequest(options);
    }

}

export class HTTPResponse {

    data: any;
    status: number = 200;
    headers?: { [key: string]: string };
    statusText: string = '';
}

export class HTTP {

    static get(endpoint: string) {
        return new HTTPRequest('GET', endpoint);
    }

    static post(endpoint: string) {
        return new HTTPRequest('POST', endpoint);
    }

    static put(endpoint: string) {
        return new HTTPRequest('PUT', endpoint);
    }

    static delete(endpoint: string) {
        return new HTTPRequest('DELETE', endpoint);
    }

}

function makeRequest(options: any): Promise<HTTPResponse> {
    return new Promise((resolve, reject) => {
        axios.request(options).then((response) => {
            const result = new HTTPResponse();
            result.status = response.status;
            result.statusText = response.statusText;
            result.data = response.data;
            if (response.headers) {
                result.headers = {};
                for (const headerKey of Object.keys(response.headers)) {
                    result.headers[headerKey] = response.headers[headerKey];
                }
            }
            resolve(result);
        }).catch((error) => {
            const stashError = new StashError(error as AxiosError);
            reject(stashError);
        });
    });
}

function processQueryParams(data?: { [key: string]: string }) {
    if (data) {
        const params: string[] = [];
        for (const key of Object.keys(data)) {
            const value = data[key];
            params.push(key + '=' + encodeURIComponent(value));
        }
        return params.join('&');
    }
    return '';
}
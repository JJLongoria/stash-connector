import { Basic, EndpointService, Logger } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/logs'
 */
export class LogsEndpoint extends EndpointService {

    /**
     * Contains all operations related with logs logger
     * All paths and operations from '/rest/api/1.0/logs/logger'. 
     * @returns {LogsLoggerEndpoint} Get all operations about logs logger
     */
    logger = () => {
        return new LogsLoggerEndpoint(this.auth);
    };

    /**
     * Contains all operations related with logs root logger
     * All paths and operations from '/rest/api/1.0/logs/rootLogger'. 
     * @returns {LogsRootLoggerEndpoint} Get all operations about root logger
     */
    rootLogger = () => {
        return new LogsRootLoggerEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/logs');
    }


}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/logs/logger'
 */
export class LogsLoggerEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/logger');
    }

    /**
     * Retrieve the current log level for a given logger
     * @param {string} loggerName The name of the logger
     * @returns {Promise<Logger>} Promise with the logger data
     */
    async get(loggerName: string): Promise<Logger> {
        const request = this.doGet({
            param: loggerName
        });
        try {

            const result = await request.execute();
            return result.data as Logger;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve the current log level for a given logger
     * @param {string} loggerName The name of the logger
     * @param {string} loggerLevel The level to set the logger to
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async changeLevel(loggerName: string, loggerLevel: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN ' | 'ERROR'): Promise<void> {
        const request = this.doGet({
            param: loggerName + '/' + loggerLevel,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/logs/logger'
 */
export class LogsRootLoggerEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/rootLogger');
    }

    /**
     * Retrieve the current log level for a given logger
     * @returns {Promise<Logger>} Promise with the logger data
     */
    async get(): Promise<Logger> {
        const request = this.doGet();
        try {

            const result = await request.execute();
            return result.data as Logger;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve the current log level for a given logger
     * @param {string} loggerLevel The level to set the logger to
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async changeLevel(loggerLevel: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN ' | 'ERROR'): Promise<void> {
        const request = this.doGet({
            param: loggerLevel,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}
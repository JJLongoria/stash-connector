import { Basic, EndpointService, Page, RepoOutput, ReposOptions, TaskInput, TaskOutput } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/tasks/*'
 */
export class TasksEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/tasks');
    }

    /**
     * Create a new task
     * @param {TaskInput} taskInput Task intput to create it
     * @returns {Promise<Page<TaskOutput>>} Promise with the created task data
     */
    async create(taskInput: TaskInput): Promise<Page<TaskOutput>> {
        const request = this.doPost().asJson().withBody(taskInput);
        try {
            const result = await request.execute();
            return result.data as Page<TaskOutput>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve a existing task
     * @param {number} taskId Task id to retrieve
     * @returns {Promise<TaskOutput>} Promise with the requested task data
     */
    async get(taskId: number): Promise<TaskOutput> {
        const request = this.doGet({
            param: taskId
        });
        try {
            const result = await request.execute();
            return result.data as TaskOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update a existing task
     * @param {number} taskId Task id to retrieve
     * @param {TaskInput} taskInput Task data to update
     * @returns {Promise<TaskOutput>} Promise with the updated task data
     */
    async update(taskId: number, taskInput: TaskInput): Promise<TaskOutput> {
        const request = this.doPut({
            param: taskId
        }).asJson().withBody(taskInput);
        try {
            const result = await request.execute();
            return result.data as TaskOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a existing task
     * @param {number} taskId Task id to retrieve
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
     async delete(taskId: number, taskInput: TaskInput): Promise<void> {
        const request = this.doDelete({
            param: taskId
        }).asJson().withBody(taskInput);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }


}
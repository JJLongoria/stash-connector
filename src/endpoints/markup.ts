import { Basic, EndpointService, MarkupPreviewOptions, MarkupPreviewOutput, Page } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/1.0/markup/'
 */
export class MarkupEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/markup');
    }

    /**
     * Preview the generated html for given markdown contents
     * @param {string} content Markup content to preview
     * @param {MarkupPreviewOptions} [previewOptions] Options to preview the markup
     * @returns {Promise<MarkupPreviewOutput>} Promise with the markup html preview
     */
    async preview(content: string, previewOptions?: MarkupPreviewOptions): Promise<MarkupPreviewOutput> {
        const request = this.doPost({
            param: 'preview'
        }).withBody(content);
        try {
            this.processOptions(request, previewOptions);
            const result = await request.execute();
            return result.data as MarkupPreviewOutput;
        } catch (error) {
            throw error;
        }
    }



}
import CNXML from '../cnxml'


export default class Storage {
    /**
     * Load a document by ID.
     *
     * Retrieves basic information about a document and prepares
     * a {@link Storage} for later work.
     *
     * @return {Storage}
     */
    static async load(id) {
        // TODO: implement
    }

    /**
     * Read the document.
     *
     * @return {Value}
     */
    async read() {
        // TODO: implement
    }

    /**
     * Write the document
     */
    async write(value) {
        // TODO: implement
    }

    /**
     * Write a file.
     */
    async writeFile(file) {
        // TODO: implement
    }

    /**
     * Check if a {@link Value} is current.
     */
    current(value) {
        // TODO: implement
    }

    /**
     * Return an URL for a given media file.
     */
    mediaUrl(name) {
        // TODO: implement
    }
}

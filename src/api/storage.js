// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/* istanbul ignore file */

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
        throw new Error("not implemented")
    }

    /**
     * Read the document.
     *
     * @return {Value}
     */
    async read() {
        throw new Error("not implemented")
    }

    /**
     * Write the document
     */
    async write(value) {
        throw new Error("not implemented")
    }

    /**
     * Write a file.
     */
    async writeFile(file) {
        throw new Error("not implemented")
    }

    /**
     * Check if a {@link Value} is current.
     */
    current(value) {
        throw new Error("not implemented")
    }

    /**
     * Return an URL for a given media file.
     */
    mediaUrl(name) {
        throw new Error("not implemented")
    }
}

import CNXML from '../cnxml'


class RequestError extends Error {
    constructor(response) {
        super(`${response.status} ${response.statusText}`)
        this.response = response
    }

    get status() {
        return this.response.status
    }
}


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
        const self = new Storage()

        self.id = id
        self.url = '/user/contents/' + id
        self.value = null

        const [data, files] = await Promise.all([
            self._request('/', 'json'),
            self._request('/files', 'json'),
        ])

        self.title = data.name
        self.files = files

        return self
    }

    /**
     * Read the document.
     *
     * @return {Value}
     */
    async read() {
        const index = await this._request('/files/index.cnxml')
        this.tag = index.headers.get('ETag')
        this.value = CNXML.deserialize(await index.text())
        return this.value
    }

    /**
     * Write the document
     */
    async write(value) {
        const text = CNXML.serialize(value, this.title)
        const headers = new Headers()
        headers.set('If-Match', this.tag)

        const req = await fetch(this.url + '/files/index.cnxml', {
            method: 'PUT',
            credentials: 'same-origin',
            body: text,
            headers,
        })

        if (!req.ok) {
            throw new RequestError(req)
        }

        this.tag = req.headers.get('ETag')
        this.value = value
    }

    /**
     * Write a file.
     */
    async writeFile(file) {
        const req = await fetch(this.url + '/files/' + file.name, {
            method: 'PUT',
            credentials: 'same-origin',
            body: file,
        })

        if (!req.ok) {
            throw new RequestError(req)
        }

        this.files.push({ name: file.name, mime: file.type })
    }

    /**
     * Check if a {@link Value} is current.
     */
    current(value) {
        return this.value !== null && this.value.document.equals(value.document)
    }

    /**
     * Return an URL for a given media file.
     */
    mediaUrl(name) {
        return this.url + '/files/' + name
    }

    async _request(path, data=null) {
        const req = await fetch(this.url + path, {
            credentials: 'same-origin',
        })

        if (!req.ok) {
            throw new RequestError(req)
        }

        return data ? await req[data]() : req
    }
}

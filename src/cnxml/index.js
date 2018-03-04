import Html from 'slate-html-serializer'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import deserialize from './deserialize'
import serialize from './serialize'


function parseHtml(html) {
    const parsed = new DOMParser().parseFromString(html, 'application/xml');
    const content = parsed.querySelector(':root > content')

    return {
        childNodes: content.children,
    }
}


const serializer = new Html({
    rules: [...deserialize, ...serialize],
    defaultBlock: 'invalid',
    parseHtml,
})


export default {
    deserialize: (...args) => serializer.deserialize(...args),

    serialize(value) {
        const r = <document
            xmlns="http://cnx.rice.edu/cnxml"
            cnxml-version="0.7"
            id="new"
            module-id="new"
            xmlLang="en"
            >
            <title>TODO: load and preserve titles</title>
            <content>
                {serializer.serialize(value, { render: false })}
            </content>
        </document>

        const text = renderToStaticMarkup(r)
        return '<?xml version="1.0" encoding="utf-8"?>\n' + text
    }
}

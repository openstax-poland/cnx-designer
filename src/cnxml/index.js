// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Html from 'slate-html-serializer'
import React from 'react'

import deserialize from './deserialize'
import render from './xml'
import serialize from './serialize'
import fixCNXML from './fixCNXML'


function parseHtml(html) {
    const parsed = new DOMParser().parseFromString(html, 'application/xml')
    const content = fixCNXML(parsed.querySelector(':root > content'))

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

        return render(r)
    }
}

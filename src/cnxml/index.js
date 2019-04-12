// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Html from 'slate-html-serializer'
import React from 'react'
import Value from 'slate'

import contentDeserialize from './content/deserialize'
import contentSerialize from './content/serialize'
import glossaryDeserialize from './glossary/deserialize'
import glossarySerialize from './glossary/serialize'
import render from './xml'

function parseContentHtml(html) {
    if (!html) {
        throw new Error('No content has been provided for parseContentHtml()')
    }
    
    const parsed = new DOMParser().parseFromString(html, 'application/xml');
    const content = parsed.querySelector(':root > content')

    if (content == null) {
        const error = parsed.getElementsByTagName('parsererror')
        if (error.length) {
            throw new Error('Invalid XML:' + error[0].textContent)
        }
        return {
            childNodes: [],
        }
    }

    return {
        childNodes: content.children,
    }
}

function parseGlossaryHtml(html) {
    if (!html) {
        throw new Error('No content has been provided for parseGlossaryHtml()')
    }

    const parsed = new DOMParser().parseFromString(html, 'application/xml');
    const content = parsed.querySelector(':root > glossary')

    if (content == null) {
        const error = parsed.getElementsByTagName('parsererror')
        if (error.length) {
            throw new Error('Invalid XML:' + error[0].textContent)
        }
        return {
            childNodes: [],
        }
    }

    return {
        childNodes: content.children,
    }
}

export default class CNXML {
    constructor(args /* { contentRules: [], glossaryRules: [] } */) {
        this.contentSerializer = new Html({
            rules: [...args.contentRules, ...contentDeserialize, ...contentSerialize],
            defaultBlock: 'invalid',
            parseHtml: parseContentHtml,
        })
        this.glossarySerializer = new Html({
            rules: [...args.glossaryRules, ...glossaryDeserialize, ...glossarySerialize],
            defaultBlock: 'invalid',
            parseHtml: parseGlossaryHtml,
        })
    }

    deserialize(...args) {
        return {
            content: this.contentSerializer.deserialize(...args),
            glossary: this.glossarySerializer.deserialize(...args),
        }
    }

    serialize(content, glossary, options={}) {
        const r = <document
            xmlns="http://cnx.rice.edu/cnxml"
            cnxml-version="0.7"
            id="new"
            module-id="new"
            xmlLang="en"
            >
            <title>TODO: load and preserve titles</title>
            <content>
                {this.contentSerializer.serialize(content, { render: false })}
            </content>
            {
                glossary ?
                    <glossary>
                        {this.glossarySerializer.serialize(glossary, { render: false })}
                    </glossary>
                : ''
            }
        </document>

        return render(r, options)
    }
}

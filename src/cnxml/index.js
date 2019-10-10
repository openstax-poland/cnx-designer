// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Html from 'slate-html-serializer'
import React from 'react'

import render from './xml'
import { TEXT_CONTENT } from './text'
import { DEFAULT } from './util'
import { DOCUMENT } from './document'
import { GLOSSARY } from './glossary'

export function parseXml(xml) {
    const parsed = new DOMParser().parseFromString(xml, 'application/xml')
    const error = parsed.getElementsByTagName('parsererror')

    if (error.length > 0) {
        throw new Error('Invalid XML:' + error[0].textContent)
    }

    return parsed.documentElement
}


export function writeXml({ document, glossary }, options={}) {
    const {
        title = '',
        language = 'en',
    } = options

    let glossaryContent = null

    if (glossary) {
        glossaryContent = <glossary>
            {glossary}
        </glossary>
    }

    const r = <document
        xmlns="http://cnx.rice.edu/cnxml"
        cnxml-version="0.7"
        id="new"
        module-id="new"
        xmlLang={language}
        >
        <title>{title}</title>
        <content>
            {document}
        </content>
        {glossaryContent}
    </document>

    return render(r, options)
}


export default class CNXML {
    constructor(args /* { documentRules: [], glossaryRules: [] } */) {
        const {
            documentRules = [],
            glossaryRules = [],
        } = args
        this.document = new Html({
            rules: [...documentRules, ...DOCUMENT, ...TEXT_CONTENT, DEFAULT],
            defaultBlock: 'invalid',
            parseHtml,
        })
        this.glossary = new Html({
            rules: [...glossaryRules, ...GLOSSARY, ...TEXT_CONTENT, DEFAULT],
            defaultBlock: 'invalid',
            parseHtml,
        })
    }

    deserialize(xml, options) {
        if (typeof xml === 'string') {
            xml = parseXml(xml)
        }

        return {
            language: xml.getAttributeNS(
                'http://www.w3.org/XML/1998/namespace', 'lang'),
            document: this.document.deserialize(
                find(xml.children, 'content'), options),
            glossary: this.glossary.deserialize(
                find(xml.children, 'glossary'), options),
        }
    }

    serialize(documentValue, glossaryValue, options={}) {
        const document = this.document.serialize(
            documentValue, { render: false })
        const glossary = glossaryValue
            ? this.glossary.serialize(glossaryValue, { render: false })
            : null

        return writeXml({ document, glossary }, options)
    }
}


function find(children, name) {
    for (const child of children) {
        if (child.tagName === name) {
            return child
        }
    }
    return {
        childNodes: [],
    }
}


function parseHtml(root) {
    // XXX: slate-html-serializer deserializes root element from childNodes
    // without using custom deserializers, which makes it impossible to ignore
    // white space in <content> and <glossary>.
    return { childNodes: root.children || [] }
}

// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Html from 'slate-html-serializer'
import React from 'react'

import render from './xml'
import { CONTENT } from './content'
import { DEFAULT } from './util'
import { DOCUMENT } from './document'

export function parseXml(xml) {
    const parsed = new DOMParser().parseFromString(xml, 'application/xml');
    const error = parsed.getElementsByTagName('parsererror')

    if (error.length > 0) {
        throw new Error('Invalid XML:' + error[0].textContent)
    }

    return parsed.documentElement
}


export function writeXml(content, options={}) {
    const r = <document
        xmlns="http://cnx.rice.edu/cnxml"
        cnxml-version="0.7"
        id="new"
        module-id="new"
        xmlLang="en"
        >
        <title>TODO: load and preserve titles</title>
        <content>
            {content}
        </content>
    </document>

    return render(r, options)
}


export default class CNXML {
    constructor(rules = []) {
        this.document = new Html({
            rules: [...rules, ...DOCUMENT, ...CONTENT, DEFAULT],
            defaultBlock: 'invalid',
            parseHtml: x => x,
        })
    }

    deserialize(xml, options) {
        if (typeof xml === 'string') {
            xml = parseXml(xml)
        }

        return this.document.deserialize(find(xml.children, 'content'), options)
    }

    serialize(value, options={}) {
        const content = this.document.serialize(value, { render: false })

        return writeXml(content, options)
    }
}


function find(children, name) {
    for (const child of children) {
        if (child.tagName === name) {
            return child
        }
    }
}

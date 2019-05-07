// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Html from 'slate-html-serializer'
import React from 'react'

import commonDeserialize from './common/deserialize'
import commonSerialize from './common/serialize'
import contentDeserialize from './content/deserialize'
import contentSerialize from './content/serialize'
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


export default class CNXML {
    constructor(rules = []) {
        this.contentSerializer = new Html({
            rules: [
                ...rules,
                ...contentDeserialize,
                ...contentSerialize,
                ...commonDeserialize,
                ...commonSerialize,
            ],
            defaultBlock: 'invalid',
            parseHtml: parseContentHtml,
        })
    }

    deserialize(...args) {
        return this.contentSerializer.deserialize(...args)
    }

    serialize(value, options={}) {
        const r = <document
            xmlns="http://cnx.rice.edu/cnxml"
            cnxml-version="0.7"
            id="new"
            module-id="new"
            xmlLang="en"
            >
            <title>TODO: load and preserve titles</title>
            <content>
                {this.contentSerializer.serialize(value, { render: false })}
            </content>
        </document>

        return render(r, options)
    }
}

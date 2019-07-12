// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * De/serialization rules for text content.
 */

import React from 'react'

import { inline } from './util'

export const DOCUMENT_REFERENCE = inline(null, null, 'docref', 'link')

/**
 * Process data for emphasis marks.
 */
function de_emphasis(el) {
    const EFFECTS = {
        bold: 'strong',
        italics: 'emphasis',
        underline: 'underline',
    }

    return {
        type: EFFECTS[el.getAttribute('effect') || 'bold'] || 'strong',
    }
}

/**
 * Serializer for CNXML emphasis tag.
 */
const se_emphasis = type => function(obj, children) {
    return <emphasis effect={type}>{children}</emphasis>
}

export const EMPHASIS = inline('emphasis', de_emphasis, 'emphasis', se_emphasis('italics'))

export const LINK = inline(null, null, 'link', 'link')

export const STRONG = inline(null, null, 'strong', se_emphasis('bold'))

export const SUBSCRIPT = inline('sub', 'subscript', 'subscript', 'sub')

export const SUPERSCRIPT = inline('sup', 'superscript', 'superscript', 'sup')

/**
 * Process data for terms.
 */
function de_term(el) {
    const reference = el.getAttributeNS('http://katalysteducation.org/cmlnle/1.0', 'reference')

    return {
        object: 'inline',
        type: 'term',
        data: { reference },
    }
}

/**
 * Serializer for terms.
 */
function se_term(obj, children) {
    let attrs = {}

    const reference = obj.data.get('reference')
    if (reference && reference !== obj.text) {
        attrs['cmlnleReference'] = reference
    }

    return <term {...attrs}>
        {children}
    </term>
}

export const TERM = inline('term', de_term, 'term', se_term)

/**
 * Serialize text.
 *
 * `slate-html-serializer` replaces newlines in text with `<br>` HTML elements,
 * which are not supported in CNXML. Instead we just emit newlines, as they
 * don't pose any problems in CNXML.
 *
 * As an additional benefit, this makes it simpler to write serializers for
 * nodes, such as `code`, in which newlines have special meaning and must
 * be preserved.
 */
const TEXT = {
    serialize(obj, children) {
        if (obj.object === 'string') return [children]
    }
}

export const UNDERLINE = inline(null, null, 'underline', se_emphasis('underline'))

/**
 * Process data for links and cross-references.
 */
function de_xref(el) {
    const target = el.getAttribute('target-id') || null
    const document = el.getAttribute('document') || null
    const url = el.getAttribute('url') || null
    const cmlnleCase = el.getAttributeNS('http://katalysteducation.org/cmlnle/1.0', 'case') || null

    if (target) {
        return {
            object: 'inline',
            type: 'xref',
            isVoid: true,
            data: { target, document, case: cmlnleCase },
        }
    } else if (url) {
        return {
            object: 'inline',
            type: 'link',
            data: { url },
        }
    } else if (document) {
        return {
            object: 'inline',
            type: 'docref',
            data: { document },
        }
    } else {
        // TODO: notify user perhaps?
        return null
    }
}

/**
 * Serializer for cross-references.
 */
function se_xref(obj, children) {
    let attrs = {
        'target-id': obj.data.get('target'),
    }

    const document = obj.data.get('document')
    if (document) {
        attrs.document = document
    }

    const cmlnleCase = obj.data.get('case')

    if (cmlnleCase) {
        attrs['cmlnleCase'] = cmlnleCase
    }

    return <link {...attrs}>
        {children}
    </link>
}

export const XREF = inline('link', de_xref, 'xref', se_xref)

export const TEXT_CONTENT = [
    DOCUMENT_REFERENCE,
    EMPHASIS,
    LINK,
    STRONG,
    SUBSCRIPT,
    SUPERSCRIPT,
    TERM,
    TEXT,
    UNDERLINE,
    XREF,
]

// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * List of valid cases for xrefs.
 *
 * @see xref
 */
const CASES = [
    "abessive",
    "ablative",
    "ablative",
    "absolutive",
    "accusative",
    "accusative",
    "adessive",
    "adverbial",
    "agentive",
    "allative",
    "antessive",
    "apudessive",
    "aversive",
    "benefactive",
    "causal",
    "causal-final",
    "comitative",
    "comparative",
    "dative",
    "delative",
    "distributive",
    "egressive",
    "elative",
    "equative",
    "ergative",
    "ergative-genitive",
    "essive",
    "essive",
    "essive-formal",
    "essive-modal",
    "exessive",
    "formal",
    "genitive",
    "identical",
    "illative",
    "inessive",
    "initiative",
    "instructive",
    "instrumental",
    "instrumental-comitative",
    "intransitive",
    "intrative",
    "lative",
    "locative",
    "nominative",
    "objective",
    "oblique",
    "orientative",
    "ornative",
    "partitive",
    "pegative",
    "perlative",
    "pertingent",
    "possessed",
    "possessive",
    "postessive",
    "prepositional",
    "privative",
    "prolative",
    "revertive",
    "semblative",
    "sociative",
    "subessive",
    "sublative",
    "superssive",
    "temporal",
    "terminative",
    "translative",
    "vocative",
]


function normalizeXRef(change, error) {
    /* istanbul ignore next */
    console.warn('Unhandled xref violation:', error.code)
}

function normalizeLink(change, error) {
    const { code, node, key } = error

    switch (code) {
    case 'node_data_invalid':
        if (key === 'url') {
            change.unwrapInlineByKey(node.key)
            return
        }

        console.warn('Unhandled link violation:', error.code)
        break

    /* istanbul ignore next */
    default:
        console.warn('Unhandled link violation:', error.code)
        break
    }
}

export default {
    inlines: {
        xref: {
            isVoid: true,
            // TODO: better data validation
            data: {
                document: value => value == null || typeof value === 'string',
                target: Boolean,
                case: c => c == null || CASES.includes(c),
            },
            normalize: normalizeXRef,
        },
        link: {
            data: {
                url: url => typeof url === 'string',
            },
            normalize: normalizeLink,
        },
    },
}

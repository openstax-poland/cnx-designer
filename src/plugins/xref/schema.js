// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * List of valid declensions for xrefs.
 * 
 * @see xref
 */
const DECLENSIONS = ["abessive","ablative","ablative","absolutive","accusative","accusative","adessive","adverbial","agentive","allative","antessive","apudessive","aversive","benefactive","causal","causal-final","comitative","comparative","dative","delative","distributive","egressive","elative","equative","ergative","ergative-genitive","essive","essive","essive-formal","essive-modal","exessive","formal","genitive","identical","illative","inessive","initiative","instructive","instrumental","instrumental-comitative","intransitive","intrative","lative","locative","nominative","objective","oblique","orientative","ornative","partitive","pegative","perlative","pertingent","possessed","possessive","postessive","prepositional","privative","prolative","revertive","semblative","sociative","subessive","sublative","superssive","temporal","terminative","translative","vocative"]


function normalizeXRef(change, error) {
    console.warn('Unhandled xref violation:', error.code)
}

function normalizeLink(change, error) {
    console.warn('Unhandled link violation:', error.code)
}

export default {
    inlines: {
        xref: {
            isVoid: true,
            // TODO: better data validation
            data: {
                document: value => value == null || typeof value === 'string',
                target: Boolean,
                case: c => c == null || DECLENSIONS.some(d => d === c),
            },
            normalize: normalizeXRef,
        },
        link: {
            // TODO: better data validation
            data: {
                url: Boolean,
            },
            normalize: normalizeLink,
        },
    },
}

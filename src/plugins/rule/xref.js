// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function renderXRef(target, counters, editor, next) {
    switch (target.type) {
    case 'rule':
        return `Exercise ${counters.get('rule')}`

    case 'rule_statement': {
        const rule = counters.get('rule')
        const statement = counters.get('rule_statement')
        return `Statement ${rule}.${statement}`
    }

    case 'rule_proof': {
        const rule = counters.get('rule')
        const proof = counters.get('rule_proof')
        return `Proof ${rule}.${proof}`
    }

    case 'rule_example': {
        const rule = counters.get('rule')
        const example = counters.get('rule_example')
        return `Example ${rule}.${example}`
    }

    default:
        return next()
    }
}

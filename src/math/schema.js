function normalizeMath(change, violation, context) {
    switch (violation) {
    default:
        console.warn("Unhandled figure violation", violation)
        break
    }
}


export default {
    blocks: {
        math: {
            normalize: normalizeMath,
            data: {
                mathml: v => typeof v === 'string',
            },
            counters: {
                equation: 'enter',
            },
        },
    },
    inlines: {
        math: {
            normalize: normalizeMath,
        },
    },
}

function normalizeXRef(change, violation, context) {
    console.warn('Unhandled xref violation:', violation, context)
}

function normalizeLink(change, violation, context) {
    console.warn('Unhandled link violation:', violation, context)
}

export default {
    inlines: {
        xref: {
            isVoid: true,
            // TODO: better data validation
            data: {
                target: Boolean,
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

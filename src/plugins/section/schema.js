function normalizeSection(change, violation, context) {
    // TODO: insert default title when missing
    switch (violation) {
    default:
        console.warn('Unhandled violation in section:', violation)
        break
    }
}

export default {
    blocks: {
        section: {
            // TODO:
            // nodes: [
            //     { types: ['title'], min: 1, max: 1 },
            // ]
            normalize: normalizeSection,
        }
    }
}

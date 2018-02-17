// Admonition types supported by both CNXML's <note> and HTMLBook. Missing are
// `aside` from CNXML and `caution` from HTMLBook.
const TYPES = ["note", "warning", "tip", "important"]


export default {
    blocks: {
        admonition: {
            data: {
                type: v => TYPES.includes(v),
            },
            nodes: [
                { types: ['title'], min: 0, max: 1 },
                { types: ['paragraph'] },
            ],
        }
    }
}

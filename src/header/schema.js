import { NODE_DATA_INVALID } from 'slate-schema-violations'


export default {
    blocks: {
        header: {
            data: {
                depth: v => typeof v === 'number' && v >= 0,
            },
            marks: [
                { type: 'strong' },
                { type: 'emphasis' },
                { type: 'underline' },
                { type: 'superscript' },
                { type: 'subscript' },
            ],
            normalize: (change, violation, context) => {
                switch (violation) {
                case NODE_DATA_INVALID:
                    switch (context.key) {
                    case 'depth':
                        change.setNodeByKey(context.node.key, { data: {
                            ...context.node.data.toJS(),
                            depth: 0,
                        }})
                        break

                    default:
                        return
                    }
                    break

                default:
                    console.warn('Unhandled header violation:', violation)
                    break
                }
            },
        },
    },
}

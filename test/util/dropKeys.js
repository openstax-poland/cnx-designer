export default function dropKeys(object) {
    switch (object.object) {
    case 'document':
    case 'block':
        return object.withMutations(node => {
            node.delete('key')
                .update('nodes', nodes => nodes ? nodes.map(dropKeys) : nodes)
        })

    case 'text':
        return object.withMutations(node => {
            node.delete('key')
                .update('leaves', leaves => leaves ? leaves.map(dropKeys) : leaves)
        })

    case 'leaf':
        return object

    case 'selection':
        if (object.marks) {
            throw new Error('not implemented: marks !== null')
        }
        return object.withMutations(selection => {
            selection
                .update('anchor', dropKeys)
                .update('focus', dropKeys)
        })

    case 'point':
        return object.delete('key')

    default:
        throw new Error(object.object)
    }
}

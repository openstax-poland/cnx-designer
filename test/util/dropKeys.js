export default function dropKeys(object) {
    switch (object.object) {
    case 'document':
    case 'block':
    case 'inline':
        return object.withMutations(node => {
            ;(node.get('key').match(/^\d+$/) ? node.delete('key') : node)
                .update('nodes', nodes => nodes ? nodes.map(dropKeys) : nodes)
        })

    case 'text':
        return object.withMutations(node => {
            ;(node.get('key').match(/^\d+$/) ? node.delete('key') : node)
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
        return object.get('key').match(/^\d+$/) ? object.delete('key') : object

    default:
        throw new Error(object.object)
    }
}

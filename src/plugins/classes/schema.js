import { List } from 'immutable'

function normalizeClasses(change, error) {
    const { code, key, node } = error

    /* istanbul ignore if */
    if (code !== 'node_data_invalid' || key !== 'class') {
        console.warn('Unhandled class violation:', code)
        return
    }


    const newClasses = List(node.data.get('class')
        .join(' ')
        .trim()
        .split(/\s+/))
    const newData = node.data.set('class', newClasses)
    change.setNodeByKey(node.key, { data: newData })
}

function checkClasses(classes) {
    if (classes == null) {
        return true
    }

    return List.isList(classes) && classes.every(x => x.match(/\s/) == null)
}

export default function schema(types) {
    return {
        rules: [
            {
                match: {
                    object: 'block',
                    type: type => types.includes(type),
                },
                data: {
                    class: checkClasses,
                },
                normalize: normalizeClasses,
            },
        ],
    }
}

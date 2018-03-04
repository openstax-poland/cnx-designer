import { GROUP, ACTION, WIDGET, group } from './model'


export function consolidate(actions, flatten=false) {
    const categories = {
        [null]: {
            map: {},
            items: [],
        },
    }
    const result = []

    function insertInto(group, item) {
        if (!item.title) {
            group.items.push(item)
            return
        }
        if (!(item.title in group.map)) {
            if (item.$$typeof === GROUP) {
                const items = []
                group.map[item.title] = { map: {}, items }
                group.item.push(group(group.title, null, items))
            } else {
                group.map[item.title] = item
                group.items.push(item)
            }
            return
        }
    }

    function mergeGroups(group, other) {
        for (const item of other.items) {
            insertInto(group, item)
        }
    }

    for (const item of actions) {
        const cat = item.category

        switch (item.$$typeof) {
        case GROUP:
            if (!(item.category in categories)) {
                const items = []
                categories[cat] = { map: {}, items }
                result.push(group(cat, '__ignore', items))
            }
            const category = categories[cat]
            if (item.title || !flatten) {
                insertInto(category, item)
            } else {
                mergeGroups(category, item)
            }
            break

        case ACTION:
        case WIDGET:
            insertInto(categories[null], item)
            break
        }
    }

    if (categories[null].items.length > 0) {
        result.push(group(null, '__ignore', categories[null].items))
    }

    return normalize(result)
}


function normalize(v) {
    if (v.$$typeof === WIDGET || v.$$typeof === ACTION) return v

    if (v instanceof Array) {
        return v.map(normalize).filter(Boolean)
    }

    v.items = normalize(v.items)

    if (v.items.length === 0) return null

    return v
}

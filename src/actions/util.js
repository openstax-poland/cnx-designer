import { GROUP, ACTION, WIDGET, group } from './model'


export function consolidate(actions, mapCategory=(x) => x) {
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
        const title = mapCategory(item.category)

        switch (item.$$typeof) {
        case GROUP:
            if (!(item.category in categories)) {
                const items = []
                categories[title] = { map: {}, items }
                result.push(group(title, '__ignore', items))
            }
            const category = categories[title]
            if (item.title) {
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

    return result
}

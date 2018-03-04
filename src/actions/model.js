export const GROUP = Symbol('menu.group')
export const ACTION = Symbol('menu.action')
export const WIDGET = Symbol('menu.widget')

export const TYPES = [GROUP, ACTION, WIDGET]


export function is(v) {
    return TYPES.includes(v.$$typeof)
}


/**
 * Create a new group.
 */
export function group(title, category, items) {
    if (!title && !category) {
        throw new Error("title and category can't both be null")
    }

    return {
        $$typeof: GROUP,
        category: category || null,
        title, items,
    }
}


/**
 * Create a new action.
 */
export function action(title, attributes) {
    const { action, active, enabled, key, icon, ...attrs } = attributes
    return {
        $$typeof: ACTION,
        title, action, active, enabled, key, icon, attrs
    }
}


/**
 * Wrap a native component so that it can be put in a group.
 */
export function widget(native) {
    return {
        $$typeof: WIDGET,
        native,
    }
}

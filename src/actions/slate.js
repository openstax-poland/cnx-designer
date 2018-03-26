/**
 * Derive set of all actions from a Slate plugin stack.
 */
export function deriveActions(plugins) {
    const actions = []

    for (const plugin of plugins) {
        if (plugin.actions) {
            actions.push(plugin.actions)
        }
    }

    return actions
}

export function getActiveAdmonition(editor, value) {
    const { document } = value

    const block = value.startBlock
    if (!block) return null

    const parent = document.getParent(block.key)
    return parent && parent.type === 'admonition' ? parent : null
}

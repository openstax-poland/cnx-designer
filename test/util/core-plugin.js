import Hotkeys from 'slate-hotkeys'

/**
 * Fake Slate core plugin.
 */
export default function CorePlugin() {
    return { onKeyDown }
}

function onKeyDown(event, change, next) {
    const { editor, value } = change
    const { document, selection } = value
    const hasVoidParent = document.hasVoidParent(selection.start.path, editor)

    if (Hotkeys.isSplitBlock(event)) {
      return hasVoidParent
        ? change.moveToStartOfNextText()
        : change.splitBlock()
    }
}

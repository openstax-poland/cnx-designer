import Hotkeys from 'slate-hotkeys'

/**
 * Fake Slate core plugin.
 */
export default function CorePlugin() {
    return { onKeyDown }
}

function onKeyDown(event, editor) {
    const { value } = editor
    const { document, selection } = value
    const hasVoidParent = document.hasVoidParent(selection.start.path, editor)

    if (Hotkeys.isSplitBlock(event)) {
      return hasVoidParent
        ? editor.moveToStartOfNextText()
        : editor.splitBlock()
    }

    if (Hotkeys.isDeleteBackward(event)) {
        return editor.deleteCharBackward()
    }

    if (Hotkeys.isDeleteForward(event)) {
        return editor.deleteCharForward()
    }
}

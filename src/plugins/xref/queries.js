export function getActiveXref(editor, value) {
  const inline = value.startInline
  if (!inline) return null

  return inline.type === 'xref' ? inline : null
}

export function getActiveLink(editor, value) {
  const inline = value.startInline
  if (!inline) return null

  return inline.type === 'link' ? inline : null
}

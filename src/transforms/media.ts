// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Location, Path, Transforms } from 'slate'

import { Audio, Image, Media, Video } from '../interfaces'

/** Add a new media item to a Media element */
export function addMediaItem(
    editor: Editor,
    item: Omit<Audio | Image | Video, 'children'>,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select } = options

        if (at == null) return

        const [media, mediaPath] = Editor.above(editor, {
            at,
            match: Media.isMedia,
        }) ?? []

        if (media == null) return

        const newIndex = Path.relative(Editor.end(editor, at).path, mediaPath!)[0] + 1

        Transforms.insertNodes(editor, {
            ...item,
            children: [{ text: '' }],
        }, { at: [...mediaPath!, newIndex], select })
    })
}

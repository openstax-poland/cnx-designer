// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor, Path, Transforms } from 'slate';
import { Media } from '../interfaces';
/** Add a new media item to a Media element */
export function addMediaItem(editor, item, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { at = editor.selection, select } = options;
        if (at == null)
            return;
        const [media, mediaPath] = (_a = Editor.above(editor, {
            at,
            match: Media.isMedia,
        })) !== null && _a !== void 0 ? _a : [];
        if (media == null)
            return;
        const newIndex = Path.relative(Editor.end(editor, at).path, mediaPath)[0] + 1;
        Transforms.insertNodes(editor, {
            ...item,
            children: [{ text: '' }],
        }, { at: [...mediaPath, newIndex], select });
    });
}

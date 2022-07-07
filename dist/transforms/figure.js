// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor, Path, Transforms } from 'slate';
import { AltText, Caption, Figure, Media } from '../interfaces';
function itemToChildren(media) {
    const alt = {
        type: 'media_alt',
        children: [{ text: '' }],
    };
    if (Media.isMedia(media)) {
        if (!media.children.some(AltText.isAltText)) {
            media.children.push(alt);
        }
        return [media];
    }
    return [{
            type: 'media',
            children: [{ ...media, children: [] }, alt],
        }];
}
/** Insert a new figure */
export function insertFigure(editor, media, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options;
        if (at == null)
            return;
        Transforms.insertNodes(editor, {
            type: 'figure',
            children: itemToChildren(media),
        }, { at });
    });
}
/**
 * Insert a new sub-figure
 *
 * Does nothing if selection contains no figure.
 */
export function insertSubfigure(editor, media, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { at = editor.selection } = options;
        if (at == null)
            return;
        const [figure, figurePath] = (_a = Editor.above(editor, {
            at,
            match: Figure.isFigure,
            mode: 'highest',
        })) !== null && _a !== void 0 ? _a : [];
        if (figure == null)
            return;
        let newIndex;
        if (!Figure.isFigure(figure.children[0])) {
            // Figure has no sub-figures yet; wrap its only child into
            // a sub-figure.
            Transforms.wrapNodes(editor, {
                type: 'figure',
                children: [],
            }, { at: [...figurePath, 0] });
            // There is only one possible location for the new sub-figure:
            // between the first sub-figure and (possibly) the caption.
            newIndex = 1;
        }
        else {
            // Place the new sub-figure after the currently selected one ...
            newIndex = Path.relative(Editor.end(editor, at).path, figurePath)[0] + 1;
            // ... but before the caption.
            if (newIndex === figure.children.length
                && Caption.isCaption(figure.children[newIndex])) {
                newIndex -= 1;
            }
        }
        Transforms.insertNodes(editor, {
            type: 'figure',
            children: itemToChildren(media),
        }, { at: [...figurePath, newIndex] });
    });
}
/**
 * Add caption to the inner-most selected figure which does not yet have one
 *
 * If select is set to true the selection will be collapsed into the new
 * caption.
 */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion --
    typescript-eslint#2248 */
export function insertCaption(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { select } = options;
        let { at = editor.selection } = options;
        if (at == null)
            return;
        for (;;) {
            const [figure, figurePath] = (_a = Editor.above(editor, {
                at,
                match: Figure.isFigure,
            })) !== null && _a !== void 0 ? _a : [];
            if (figure == null)
                return;
            if (Caption.isCaption(figure.children[figure.children.length - 1])) {
                at = figurePath;
                continue;
            }
            const newPath = [...figurePath, figure.children.length];
            Transforms.insertNodes(editor, {
                type: 'caption',
                children: [{ text: '' }],
            }, { at: newPath, select });
            break;
        }
    });
}
/* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */

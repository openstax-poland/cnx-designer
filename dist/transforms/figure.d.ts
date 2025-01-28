import { Editor, Location } from 'slate';
import { Audio, Image, Media, Video } from '../interfaces';
export type MediaItem = Media | Omit<Audio | Image | Video, 'children'>;
/** Insert a new figure */
export declare function insertFigure(editor: Editor, media: MediaItem, options?: {
    at?: Location;
}): void;
/**
 * Insert a new sub-figure
 *
 * Does nothing if selection contains no figure.
 */
export declare function insertSubfigure(editor: Editor, media: MediaItem, options?: {
    at?: Location;
}): void;
/**
 * Add caption to the inner-most selected figure which does not yet have one
 *
 * If select is set to true the selection will be collapsed into the new
 * caption.
 */
export declare function insertCaption(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;

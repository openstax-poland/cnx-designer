import { Editor, Location } from 'slate';
import { Audio, Image, Video } from '../interfaces';
/** Add a new media item to a Media element */
export declare function addMediaItem(editor: Editor, item: Omit<Audio | Image | Video, 'children'>, options?: {
    at?: Location;
    select?: boolean;
}): void;

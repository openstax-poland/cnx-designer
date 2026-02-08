import { Descendant, Node } from 'slate';
/** Collection of media elements */
export interface Media {
    type: 'media';
    children: Descendant[];
}
export declare const Media: {
    /** Check if value of unknown type is a collection of media elements */
    isMedia(this: void, value: Node | undefined | null): value is Media;
};
/**
 * Textual description of a media collection, intended for people who may not
 * be able to perceive the media item itself
 */
export interface AltText {
    type: 'media_alt';
    children: Descendant[];
}
export declare const AltText: {
    /**
     * Check if value of unknown type is a textual description of a media
     * collection
     */
    isAltText(this: void, value: Node | undefined | null): value is AltText;
};
/** Data common to all media types */
export interface MediaData {
    /** Name of the file to which this media item corresponds */
    src: string;
    /**
     * Intended use of a media file
     *
     * When a media collection ({@link Media}) contains multiple items, only one
     * item will be displayed, based on the environment. This field is a hint as
     * to which item is best suited for what environment.
     */
    intendedUse: MediaUse;
    children: Descendant[];
}
export declare const MediaData: {
    /** Check if value of unknown type contains media data */
    isMediaData(this: void, value: unknown): value is MediaData;
};
/** Hint as to the best use of a media item */
export type MediaUse = 'all' | 'pdf' | 'online';
export declare const MEDIA_USES: MediaUse[];
export declare const MediaUse: {
    /** Check if value of unknown type is a valid usage of a media item */
    isMediaUse(this: void, value: unknown): value is MediaUse;
};
/** Audio file */
export interface Audio extends MediaData {
    type: 'media_audio';
}
export declare const Audio: {
    /** Check if value of unknown type is an audio element */
    isAudio(this: void, value: Node | undefined | null): value is Audio;
};
/** Image file */
export interface Image extends MediaData {
    type: 'media_image';
}
export declare const Image: {
    /** Check if value of unknown type is an image element */
    isImage(this: void, value: Node | undefined | null): value is Image;
};
/** Video file */
export interface Video extends MediaData {
    type: 'media_video';
}
export declare const Video: {
    /** Check if value of unknown type is a video element */
    isVideo(this: void, value: Node | undefined | null): value is Video;
};

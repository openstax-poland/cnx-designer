// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const Media = {
    /** Check if value of unknown type is a collection of media elements */
    isMedia(value) {
        return Element.isElement(value) && value.type === 'media';
    },
};
export const AltText = {
    /**
     * Check if value of unknown type is a textual description of a media
     * collection
     */
    isAltText(value) {
        return Element.isElement(value) && value.type === 'media_alt';
    },
};
export const MediaData = {
    /** Check if value of unknown type contains media data */
    isMediaData(value) {
        return typeof value === 'object'
            && typeof value.src === 'string'
            && MediaUse.isMediaUse(value.intendedUse);
    },
};
export const MediaUse = {
    /** Check if value of unknown type is a valid usage of a media item */
    isMediaUse(value) {
        return typeof value === 'string'
            && (value === 'all' || value === 'pdf' || value === 'online');
    },
};
export const Audio = {
    /** Check if value of unknown type is an audio element */
    isAudio(value) {
        return Element.isElement(value) && value.type === 'media_audio';
    },
};
export const Image = {
    /** Check if value of unknown type is an image element */
    isImage(value) {
        return Element.isElement(value) && value.type === 'media_image';
    },
};
export const Video = {
    /** Check if value of unknown type is a video element */
    isVideo(value) {
        return Element.isElement(value) && value.type === 'media_video';
    },
};

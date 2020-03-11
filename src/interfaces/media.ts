// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** Collection of media elements */
export interface Media extends Element {
    type: 'media'
}

export const Media = {
    /** Check if value of unknown type is a collection of media elements */
    isMedia(value: unknown): value is Media {
        return Element.isElement(value) && value.type === 'media'
    },
}

/**
 * Textual description of a media collection, intended for people who may not
 * be able to perceive the media item itself
 */
export interface AltText extends Element {
    type: 'media_alt'
}

export const AltText = {
    /**
     * Check if value of unknown type is a textual description of a media
     * collection
     */
    isAltText(value: unknown): value is AltText {
        return Element.isElement(value) && value.type === 'media_alt'
    },
}

/** Data common to all media types */
export interface MediaData {
    /** Name of the file to which this media item corresponds */
    src: string
    /**
     * Intended use of a media file
     *
     * When a media collection ({@link Media}) contains multiple items, only one
     * item will be displayed, based on the environment. This field is a hint as
     * to which item is best suited for what environment.
     */
    intendedUse: MediaUse
}

export const MediaData = {
    /** Check if value of unknown type contains media data */
    isMediaData(value: unknown): value is MediaData {
        return typeof value === 'object'
            && typeof (value as any).src === 'string'
            && MediaUse.isMediaUse((value as any).intendedUse)
    },
}

/** Hint as to the best use of a media item */
export type MediaUse = 'all' | 'pdf' | 'online'

export const MediaUse = {
    /** Check if value of unknown type is a valid usage of a media item */
    isMediaUse(value: unknown): value is MediaUse {
        return typeof value === 'string'
            && (value === 'all' || value === 'pdf' || value === 'online')
    },
}

/** Audio file */
export interface Audio extends Element, MediaData {
    type: 'media_audio'
}

export const Audio = {
    /** Check if value of unknown type is an audio element */
    isAudio(value: unknown): value is Audio {
        return Element.isElement(value) && value.type === 'media_audio'
    },
}

/** Image file */
export interface Image extends Element, MediaData {
    type: 'media_image'
}

export const Image = {
    /** Check if value of unknown type is an image element */
    isImage(value: unknown): value is Image {
        return Element.isElement(value) && value.type === 'media_image'
    },
}

/** Video file */
export interface Video extends Element, MediaData {
    type: 'media_video'
}

export const Video = {
    /** Check if value of unknown type is a video element */
    isVideo(value: unknown): value is Video {
        return Element.isElement(value) && value.type === 'media_video'
    },
}

/** @jsx h */

import { Transforms } from 'slate'
import { Transforms as CnxTransforms, MediaData } from '../../..'

export default editor => {
    Transforms.setNodes(editor, { intendedUse: 'online' }, { match: MediaData.isMediaData })

    CnxTransforms.addMediaItem(editor, {
        type: 'media_image',
        src: 'second.jpg',
        intendedUse: 'pdf',
    }, { select: true })
}

export const input = <editor>
    <p><text/></p>
    <figure>
        <media>
            <img src="first.png" intendedUse="all">
                <text><cursor/></text>
            </img>
            <mediaalt>Two images</mediaalt>
        </media>
    </figure>
</editor>

export const output = <editor>
    <p><text/></p>
    <figure>
        <media>
            <img src="first.png" intendedUse="online">
                <text/>
            </img>
            <img src="second.jpg" intendedUse="pdf">
                <text><cursor/></text>
            </img>
            <mediaalt>Two images</mediaalt>
        </media>
    </figure>
</editor>

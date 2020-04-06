/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <figure id="f1">
        <media>
            <img src="f1.png" intendedUse="all"><text/></img>
            <mediaalt>Figure content</mediaalt>
        </media>
        <caption>Figure caption</caption>
    </figure>
    <figure id="f2">
        <media>
            <audio src="f2.wav" intendedUse="all"><text/></audio>
            <mediaalt>Audio alt text</mediaalt>
        </media>
    </figure>
    <figure id="f3">
        <media>
            <video src="f3.mpg" intendedUse="all"><text/></video>
            <mediaalt>Video alt text</mediaalt>
        </media>
    </figure>
</>

export const output = cnxml`
<figure id="f1">
    <media alt="Figure content">
        <image src="f1.png" mime-type="image/png"/>
    </media>
    <caption>Figure caption</caption>
</figure>
<figure id="f2">
    <media alt="Audio alt text">
        <audio src="f2.wav" mime-type="audio/x-wav"/>
    </media>
</figure>
<figure id="f3">
    <media alt="Video alt text">
        <video src="f3.mpg" mime-type="video/mpeg"/>
    </media>
</figure>
`

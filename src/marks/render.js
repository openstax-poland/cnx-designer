import React from 'react'


export default function renderMark({ children, mark }) {
    switch (mark.type) {
    case 'strong': return <strong>{children}</strong>
    case 'emphasis': return <em>{children}</em>
    case 'underline': return <u>{children}</u>
    case 'superscript': return <sup>{children}</sup>
    case 'subscript': return <sub>{children}</sub>
    }
}

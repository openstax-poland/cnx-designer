import { createHyperscript } from 'slate-hyperscript'

export default global.h = createHyperscript({
    blocks: {
        excomment: 'exercise_commentary',
        exercise: 'exercise',
        exproblem: 'exercise_problem',
        exsolution: 'exercise_solution',
        figcaption: 'figure_caption',
        figure: 'figure',
        h: 'heading',
        img: 'image',
        important: {
            type: 'admonition',
            data: { type: 'important' },
        },
        li: 'list_item',
        media: 'media',
        note: {
            type: 'admonition',
            data: { type: 'note' },
        },
        ol: 'ol_list',
        p: 'paragraph',
        quote: 'quotation',
        section: 'section',
        source: 'source_element',
        tip: {
            type: 'admonition',
            data: { type: 'tip' },
        },
        title: 'title',
        ul: 'ul_list',
        warning: {
            type: 'admonition',
            data: { type: 'warning' },
        },
    },
    inlines: {
        link: 'link',
        sourceinline: 'source_element',
        xref: 'xref',
    },
    marks: {
        b: 'strong',
        i: 'emphasis',
        sub: 'subscript',
        sup: 'superscript',
        u: 'underline',
    },
})

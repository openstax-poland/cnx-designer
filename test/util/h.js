import { createHyperscript } from 'slate-hyperscript'

export default global.h = createHyperscript({
    blocks: {
        definition: 'definition',
        example: 'definition_example',
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
        meaning: 'definition_meaning',
        note: {
            type: 'admonition',
            data: { type: 'note' },
        },
        ol: 'ol_list',
        p: 'paragraph',
        section: 'section',
        seealso: 'definition_seealso',
        term: 'definition_term',
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

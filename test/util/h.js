import { Element, Text } from 'slate'
import { createHyperscript } from 'slate-hyperscript'

function createMark(name, value = true) {
    const creator = (tagName, attrs, children) => {
        const ret = []

        for (let child of children) {
            if (Text.isText(child)) {
                child[name] = value
            } else if (Element.isElement(child)) {
                child = {
                    ...child,
                    children: creator(tagName, attrs, child.children),
                }
            } else if (typeof child === 'string') {
                child = { text: child, [name]: value }
            }

            ret.push(child)
        }

        return ret
    }

    return creator
}

export default global.h = createHyperscript({
    creators: {
        b: createMark('strong'),
        i: createMark('emphasis'),
        u: createMark('underline'),
        sup: createMark('position', 'superscript'),
        sub: createMark('position', 'subscript'),
        document: (tagName, attrs, content) => ({
            language: 'en',
            title: 'Test',
            moduleId: 'test',
            version: '0.7',
            ...attrs,
            content,
        }),
    },
    elements: {
        audio: { type: 'media_audio' },
        caption: { type: 'caption' },
        code: { type: 'code', placement: 'block' },
        codeline: { type: 'code', placement: 'line' },
        defexample: { type: 'definition_example' },
        definition: { type: 'definition' },
        defmeaning: { type: 'definition_meaning' },
        defseealso: { type: 'definition_seealso' },
        defterm: { type: 'definition_term' },
        docref: { type: 'docref' },
        enumlist: { type: 'list', style: 'enumerated', numberStyle: 'arabic', start: 1 },
        equation: { type: 'equation' },
        excomment: { type: 'exercise_commentary' },
        exercise: { type: 'exercise' },
        exproblem: { type: 'exercise_problem' },
        exsolution: { type: 'exercise_solution' },
        figure: { type: 'figure' },
        footnote: { type: 'footnote' },
        foreign: { type: 'foreign', language: 'en' },
        glossary: { type: 'glossary' },
        img: { type: 'media_image' },
        itemlist: { type: 'list', style: 'bulleted', bullet: 'bullet' },
        li: { type: 'list_item' },
        link: { type: 'link' },
        media: { type: 'media' },
        mediaalt: { type: 'media_alt' },
        note: { type: 'admonition', kind: 'note' },
        p: { type: 'paragraph' },
        pi: { type: 'processing_instruction' },
        preformat: { type: 'preformat' },
        proof: { type: 'rule_proof' },
        quote: { type: 'quotation' },
        rule: { type: 'rule', kind: 'rule' },
        ruleexample: { type: 'rule_example' },
        section: { type: 'section' },
        statement: { type: 'rule_statement' },
        term: { type: 'term' },
        title: { type: 'title' },
        video: { type: 'media_video' },
        xref: { type: 'xref' },
    },
})

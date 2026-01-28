// NOTE: you cannot use import statements in this file!

type Props<T> = Omit<T, 'type' | 'children'>
    & import('../src').ElementExtensions
    & { key?: string }

type DefaultProps<T, O extends keyof T> = Omit<T, 'type' | 'children' | O>
    & import('../src').ElementExtensions
    & { key?: string }
    & Partial<Pick<T, O>>

declare namespace JSX {
    interface IntrinsicElements {
        anchor: object
        cursor: object
        editor: object
        element: Record<string, unknown>
        focus: object
        text: object

        // Elements
        audio: Props<import('../src').Audio>
        caption: Props<import('../src').Caption>
        code: DefaultProps<import('../src').CodeBlock, 'placement'>
        codeline: DefaultProps<import('../src').CodeLine, 'placement'>
        defexample: Props<import('../src').DefinitionExample>
        definition: Props<import('../src').Definition>
        defmeaning: Props<import('../src').Meaning>
        defseealso: Props<import('../src').SeeAlso>
        defterm: Props<import('../src').DefinitionTerm>
        docref: Props<import('../src').DocumentReference>
        enumlist: DefaultProps<import('../src').EnumeratedList, 'style' | 'numberStyle' | 'start'>
        equation: Props<import('../src').Equation>
        excomment: Props<import('../src').Commentary>
        exercise: Props<import('../src').Exercise>
        exproblem: Props<import('../src').Problem>
        exsolution: Props<import('../src').Solution>
        figure: Props<import('../src').Figure>
        footnote: Props<import('../src').Footnote>
        foreign: Props<import('../src').Foreign>
        glossary: Props<import('../src').Glossary>
        img: Props<import('../src').Image>
        itemlist: DefaultProps<import('../src').BulletedList, 'style' | 'bullet'>
        li: Props<import('../src').ListItem>
        link: Props<import('../src').Link>
        media: Props<import('../src').Media>
        mediaalt: Props<import('../src').AltText>
        note: DefaultProps<import('../src').Admonition, 'kind'>
        p: Props<import('../src').Paragraph>
        preformat: Props<import('../src').Preformat>
        proof: Props<import('../src').Proof>
        quote: Props<import('../src').Quotation>
        rule: DefaultProps<import('../src').Rule, 'kind'>
        ruleexample: Props<import('../src').RuleExample>
        section: Props<import('../src').Section>
        statement: Props<import('../src').Statement>
        term: Props<import('../src').Term>
        title: Props<import('../src').Title>
        video: Props<import('../src').Video>
        xref: DefaultProps<import('../src').CrossReference, 'document'>
    }
}

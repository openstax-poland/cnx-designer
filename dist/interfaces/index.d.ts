import { Element } from 'slate';
import { Admonition } from './admonition';
import { WithClasses } from './classes';
import { CodeBlock, CodeLine } from './code';
import { Equation } from './equation';
import { Commentary, Exercise, Problem, Solution } from './exercise';
import { Figure } from './figure';
import { Definition, DefinitionExample, DefinitionTerm, Glossary, Meaning, NameTerm, SeeAlso, Term } from './glossary';
import { BulletedList, EnumeratedList, ListItem } from './list';
import { AltText, Audio, Image, Media, Video } from './media';
import { Preformat } from './preformat';
import { ProcessingInstruction } from './processingInstruction';
import { Proof, Rule, RuleExample, Statement } from './rule';
import { Section } from './section';
import { Caption, Footnote, Foreign, Paragraph, Quotation, Title } from './text';
import { CrossReference, DocumentReference, Link } from './xref';
export * from './admonition';
export * from './classes';
export * from './code';
export * from './equation';
export * from './exercise';
export * from './figure';
export * from './glossary';
export * from './list';
export * from './media';
export * from './preformat';
export * from './processingInstruction';
export * from './rule';
export * from './section';
export * from './text';
export * from './xref';
export type CnxElement = Admonition | AltText | Audio | BulletedList | Caption | CodeBlock | CodeLine | Commentary | CrossReference | Definition | DefinitionExample | DefinitionTerm | DocumentReference | EnumeratedList | Equation | Exercise | Figure | Footnote | Foreign | Glossary | Image | Link | ListItem | Meaning | Media | NameTerm | Paragraph | Preformat | Problem | ProcessingInstruction | Proof | Quotation | Rule | RuleExample | Section | SeeAlso | Solution | Statement | Term | Title | Video;
export type ElementExtensions = Partial<WithClasses> & {
    id?: string;
};
export type TextExtensions = {
    id?: string;
};
/** Check if an element is an inline element according to this schema */
export declare function isInline(element: Element): boolean;
/** Check if an element is a void element according to this schema */
export declare function isVoid(element: Element): boolean;

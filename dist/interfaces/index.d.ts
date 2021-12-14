import { Element } from 'slate';
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
/** Check if an element is an inline element according to this schema */
export declare function isInline(element: Element): boolean;
/** Check if an element is a void element according to this schema */
export declare function isVoid(element: Element): boolean;

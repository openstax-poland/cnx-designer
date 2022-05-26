import { Case } from 'cnx-designer';
/** Qualified name of an element or attribute */
export interface Name {
    /**
     * Namespace
     *
     * When omitted for an element name it is inherited form the parent element.
     * When omitted for an attribute, the name refers to the default namespace.
     */
    namespace?: string;
    /** Local name */
    local: string;
}
/** An element */
export interface Element {
    /** Element's name */
    name: Name;
    /** Attributes set on this element */
    attributes: Attributes;
    /** Children nodes */
    children: Node;
}
export declare type Attributes = Omit<JSX.IntrinsicAttributes, 'children'> & {
    [key: string]: unknown;
};
/** A processing instruction */
export interface ProcessingInstruction {
    /** PI's target */
    target: string;
    /** PI's value */
    value: string;
}
/** Any value that can be used as child of a JSX element */
export declare type Node = Element | ProcessingInstruction | globalThis.Node | string | Node[] | null;
export declare const Node: {
    isElement(node: Node): node is Element;
    isProcessingInstruction(node: Node): node is ProcessingInstruction;
};
/** JSX element creator */
export declare function createElement<K extends keyof JSX.IntrinsicElements, A extends JSX.IntrinsicAttributes>(name: K, attrs: A | null, ...children: Node[]): Element;
export declare const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
export declare const XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
export declare const CNXML_NAMESPACE = "http://cnx.rice.edu/cnxml";
/** Natural language extensions to CNXML */
export declare const CMLNLE_NAMESPACE = "http://katalysteducation.org/cmlnle/1.0";
export declare const CXLXT_NAMESPACE = "http://katalysteducation.org/cxlxt/1.0";
/** CNXML extensions to facilitate better editing experience */
export declare const EDITING_NAMESPACE = "http://adaptarr.naukosfera.com/editing/1.0";
/** Render a JSX element into an XML document */
export declare function render(root: Element): Document;
/** Types defining CNXML schema for JSX */
export declare namespace CNXML {
    /** Common attributes */
    namespace Attributes {
        type Display = 'block' | 'inline' | 'none';
        type MediaUse = 'default' | 'pdf' | 'online';
        interface Common {
            id: string;
        }
        interface Typed {
            type?: string;
        }
        interface LinkUrl {
            url: string;
        }
        interface LinkDocument {
            document: string;
            version?: string;
        }
        interface LinkTarget extends Partial<LinkDocument> {
            'target-id': string;
        }
        interface LinkResource extends Partial<LinkDocument> {
            resource: string;
        }
        interface LinkWindow {
            window?: 'new' | 'replace';
        }
        type Link = (LinkUrl | LinkDocument | LinkTarget | LinkResource) & LinkWindow;
        interface Strength {
            strength?: 1 | 2 | 3;
        }
        interface List extends Typed {
            'list-type'?: 'bulleted' | 'enumerated' | 'labeled-item';
            'bullet-style'?: 'bullet' | 'open-circle' | 'pilcrow' | 'rpilcrow' | 'asterisk' | 'dash' | 'section' | 'none' | string;
            'number-style'?: 'arabic' | 'upper-alpha' | 'lower-alpha' | 'upper-roman' | 'lower-roman';
            'start-value'?: number;
            'mark-prefix'?: string;
            'mark-suffix'?: string;
            "item-sep"?: string;
        }
        interface Code {
            lang?: string;
        }
        interface Space {
            count?: number;
            effect?: 'normal' | 'underline';
        }
        interface Media {
            src: string;
            'mime-type': string;
            for?: MediaUse;
            longdesc?: string;
        }
        interface PlayableMedia extends Media {
            standby?: string;
            autoplay?: boolean;
            loop?: boolean;
            controller?: boolean;
            volume?: number;
        }
        interface VisualMedia extends Media {
            height?: number;
            width?: number;
        }
    }
    interface DisplayBlock extends Attributes.Common {
        display?: 'block' | 'none';
    }
    interface DisplayInline extends Partial<Attributes.Common> {
        display: 'inline';
    }
    type DisplayAny<T = Record<string, unknown>> = (DisplayBlock | DisplayInline) & T;
    interface Audio extends Partial<Attributes.Common>, Attributes.PlayableMedia {
    }
    interface Caption extends Partial<Attributes.Common> {
    }
    type Cite = Partial<Attributes.Common> & Attributes.Link;
    interface CiteTitle extends Partial<Attributes.Common> {
        'pub-type'?: 'article' | 'book' | 'booklet' | 'conference' | 'inbook' | 'incollection' | 'inproceedings' | 'mastersthesis' | 'manual' | 'misc' | 'phdthesis' | 'proceedings' | 'techreport' | 'unpublished';
    }
    type Code = DisplayAny<Attributes.Code>;
    interface Commentary extends Attributes.Common, Attributes.Typed {
    }
    interface Content extends Partial<Attributes.Common> {
    }
    interface Definition extends Attributes.Common, Attributes.Typed {
    }
    interface Document extends Attributes.Common {
        'cnxml-version': '0.7' | '0.8';
        'module-id': string;
        'class': string | undefined;
    }
    interface Download extends Partial<Attributes.Common>, Attributes.Media {
    }
    interface Emphasis extends Partial<Attributes.Common> {
        effect?: 'bold' | 'italics' | 'underline' | 'smallcaps' | 'normal';
    }
    interface Equation extends Attributes.Common, Attributes.Typed {
    }
    interface Example extends Attributes.Common, Attributes.Typed {
    }
    interface Exercise extends Attributes.Common, Attributes.Typed {
        'print-placement'?: 'end' | 'here';
    }
    interface Figure extends Attributes.Common, Attributes.Typed {
        orient?: 'horizontal' | 'vertical';
    }
    interface Flash extends Partial<Attributes.Common>, Attributes.VisualMedia {
        vmode?: 'window' | 'opaque' | 'transparent';
        quality?: 'low' | 'autolow' | 'autohigh' | 'medium' | 'high';
        loop?: boolean;
        scale?: 'default' | 'noorder' | 'exactfit';
        bgcolor?: string;
        'flash-vars'?: string;
    }
    interface Footnote extends Partial<Attributes.Common> {
    }
    type Foreign = Partial<Attributes.Common & Attributes.Link>;
    interface Glossary extends Partial<Attributes.Common> {
    }
    interface Image extends Partial<Attributes.Common>, Attributes.VisualMedia {
        'print-width'?: string;
        thumbnail?: string;
    }
    interface Item extends Partial<Attributes.Common> {
    }
    interface JavaApplet extends Partial<Attributes.Common> {
        code: string;
        'mime-type': string;
        for?: Attributes.MediaUse;
        codebase?: string;
        archive?: string;
        name?: string;
        src?: string;
        height?: number;
        width?: number;
        longdesc?: string;
    }
    interface Label extends Partial<Attributes.Common> {
    }
    interface Labview extends Partial<Attributes.Common>, Attributes.VisualMedia {
        version: '7.0' | '8.0' | '8.2';
    }
    type Link = Partial<Attributes.Common> & Attributes.Link & Attributes.Strength & CMLNLE.Attributes.Cased;
    type List = DisplayAny<Attributes.List>;
    interface Meaning extends Attributes.Common {
    }
    interface Media extends Attributes.Common {
        alt: string;
        display?: Attributes.Display;
        longdesc?: string;
    }
    interface Newline extends Partial<Attributes.Common>, Attributes.Space {
    }
    type Note = DisplayAny<Attributes.Typed>;
    interface Para extends Attributes.Common {
    }
    interface Param extends Partial<Attributes.Common> {
        name: string;
        value: string;
    }
    interface ProcesingInstruction extends Partial<Attributes.Common> {
        target: string;
        value: string;
    }
    type Preformat = DisplayAny;
    interface Problem extends Attributes.Common, Attributes.Typed {
    }
    interface Proof extends Attributes.Common, Attributes.Typed {
    }
    type Quote = DisplayAny<Attributes.Typed & Attributes.Link>;
    interface Rule extends Attributes.Common, Attributes.Typed {
    }
    interface Section extends Attributes.Common, Attributes.Typed {
    }
    interface SeeAlso extends Partial<Attributes.Common>, Attributes.Typed {
    }
    interface Solution extends Attributes.Common, Attributes.Typed {
        'print-placement'?: 'end' | 'here';
    }
    interface Space extends Partial<Attributes.Common>, Attributes.Space {
    }
    interface Sub extends Partial<Attributes.Common> {
    }
    interface Subfigure extends Attributes.Common, Attributes.Typed {
    }
    interface Sup extends Partial<Attributes.Common> {
    }
    interface Statement extends Attributes.Common, Attributes.Typed {
    }
    type Term = Partial<Attributes.Common & Attributes.Link> & CMLNLE.Attributes.Reference & CXLXT.Attributes.NameIndex & CXLXT.Attributes.Index;
    interface Title extends Partial<Attributes.Common> {
    }
    interface Video extends Partial<Attributes.Common>, Attributes.PlayableMedia, Attributes.VisualMedia {
    }
}
/** Natural language extensions to CNXML */
export declare namespace CMLNLE {
    namespace Attributes {
        interface Cased {
            cmlnleCase?: Case;
        }
        interface Reference {
            cmlnleReference?: string;
        }
    }
}
export declare namespace CXLXT {
    namespace Attributes {
        interface Index {
            cxlxtIndex?: string;
        }
        interface NameIndex {
            cxlxtBorn?: number;
            cxlxtDied?: number;
            cxlxtName?: string;
        }
    }
}
/** CNXML extensions to facilitate better editing experience */
export declare namespace Editing {
    interface AltText {
    }
}
export declare namespace JSX {
    interface Element {
        name: Name;
        attributes: Omit<IntrinsicAttributes, 'children'> & {
            [key: string]: unknown;
        };
        children: Node;
    }
    interface IntrinsicAttributes {
        xmlns?: string;
        xmlLang?: string;
        children?: Node;
    }
    interface IntrinsicElements {
        'cite-title': IntrinsicAttributes & CNXML.Cite;
        'alt-text': IntrinsicAttributes & Editing.AltText;
        audio: IntrinsicAttributes & CNXML.Audio;
        caption: IntrinsicAttributes & CNXML.Caption;
        cite: IntrinsicAttributes & CNXML.Cite;
        code: IntrinsicAttributes & CNXML.Code;
        commentary: IntrinsicAttributes & CNXML.Commentary;
        content: IntrinsicAttributes & CNXML.Content;
        definition: IntrinsicAttributes & CNXML.Definition;
        document: IntrinsicAttributes & CNXML.Document;
        download: IntrinsicAttributes & CNXML.Download;
        emphasis: IntrinsicAttributes & CNXML.Emphasis;
        equation: IntrinsicAttributes & CNXML.Equation;
        example: IntrinsicAttributes & CNXML.Example;
        exercise: IntrinsicAttributes & CNXML.Exercise;
        figure: IntrinsicAttributes & CNXML.Figure;
        flash: IntrinsicAttributes & CNXML.Flash;
        footnote: IntrinsicAttributes & CNXML.Footnote;
        foreign: IntrinsicAttributes & CNXML.Foreign;
        glossary: IntrinsicAttributes & CNXML.Glossary;
        image: IntrinsicAttributes & CNXML.Image;
        item: IntrinsicAttributes & CNXML.Item;
        'java-applet': IntrinsicAttributes & CNXML.JavaApplet;
        label: IntrinsicAttributes & CNXML.Label;
        labview: IntrinsicAttributes & CNXML.Labview;
        link: IntrinsicAttributes & CNXML.Link;
        list: IntrinsicAttributes & CNXML.List;
        meaning: IntrinsicAttributes & CNXML.Meaning;
        media: IntrinsicAttributes & CNXML.Media;
        newline: IntrinsicAttributes & CNXML.Newline;
        note: IntrinsicAttributes & CNXML.Note;
        para: IntrinsicAttributes & CNXML.Para;
        param: IntrinsicAttributes & CNXML.Param;
        pi: IntrinsicAttributes & CNXML.ProcesingInstruction;
        preformat: IntrinsicAttributes & CNXML.Preformat;
        problem: IntrinsicAttributes & CNXML.Problem;
        proof: IntrinsicAttributes & CNXML.Proof;
        quote: IntrinsicAttributes & CNXML.Quote;
        rule: IntrinsicAttributes & CNXML.Rule;
        section: IntrinsicAttributes & CNXML.Section;
        seealso: IntrinsicAttributes & CNXML.SeeAlso;
        solution: IntrinsicAttributes & CNXML.Solution;
        space: IntrinsicAttributes & CNXML.Space;
        statement: IntrinsicAttributes & CNXML.Statement;
        sub: IntrinsicAttributes & CNXML.Sub;
        subfigure: IntrinsicAttributes & CNXML.Subfigure;
        sup: IntrinsicAttributes & CNXML.Sup;
        term: IntrinsicAttributes & CNXML.Term;
        title: IntrinsicAttributes & CNXML.Title;
        video: IntrinsicAttributes & CNXML.Video;
    }
}

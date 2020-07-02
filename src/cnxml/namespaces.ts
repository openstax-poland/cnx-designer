/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in definition of CMLNLE.Attributes.Cased
import { Case } from '../interfaces'

declare global {
  /** Types defining CNXML schema for JSX */
  namespace CNXML {
      /** Common attributes */
      namespace Attributes {
          type Display = 'block' | 'inline' | 'none'
          type MediaUse = 'default' | 'pdf' | 'online'

          interface Common {
              id: string
          }

          interface Typed {
              type?: string
          }

          interface LinkUrl {
              url: string
          }

          interface LinkDocument {
              document: string
              version?: string
          }

          interface LinkTarget extends Partial<LinkDocument> {
              'target-id': string
          }

          interface LinkResource extends Partial<LinkDocument> {
              resource: string
          }

          interface LinkWindow {
              window?: 'new' | 'replace'
          }

          type Link = (LinkUrl | LinkDocument | LinkTarget | LinkResource) & LinkWindow

          interface Strength {
              strength?: 1 | 2 | 3
          }

          interface List extends Typed {
              'list-type'?: 'bulleted' | 'enumerated' | 'labeled-item'
              'bullet-style'?: 'bullet' | 'open-circle' | 'pilcrow'
                  | 'rpilcrow' | 'asterisk' | 'dash' | 'section' | 'none'
                  | string
              'number-style'?: 'arabic' | 'upper-alpha' | 'lower-alpha'
                  | 'upper-roman' | 'lower-roman'
              'start-value'?: number
              'mark-prefix'?: string
              'mark-suffix'?: string
              "item-sep"?: string
          }

          interface Code {
              lang?: string
          }

          interface Space {
              count?: number
              effect?: 'normal' | 'underline'
          }

          interface Media {
              src: string
              'mime-type': string
              for?: MediaUse
              longdesc?: string
          }

          interface PlayableMedia extends Media {
              standby?: string
              autoplay?: boolean
              loop?: boolean
              controller?: boolean
              volume?: number
          }

          interface VisualMedia extends Media {
              height?: number
              width?: number
          }
      }

      interface DisplayBlock extends Attributes.Common {
          display?: 'block' | 'none'
      }

      interface DisplayInline extends Partial<Attributes.Common> {
          display: 'inline'
      }

      type DisplayAny<T = Record<string, unknown>> = (DisplayBlock | DisplayInline) & T

      interface Audio extends Partial<Attributes.Common>, Attributes.PlayableMedia {}
      interface Caption extends Partial<Attributes.Common> {}
      type Cite = Partial<Attributes.Common> & Attributes.Link

      interface CiteTitle extends Partial<Attributes.Common> {
          'pub-type'?: 'article' | 'book' | 'booklet' | 'conference'
              | 'inbook' | 'incollection' | 'inproceedings'
              | 'mastersthesis' | 'manual' | 'misc' | 'phdthesis'
              | 'proceedings' | 'techreport' | 'unpublished'
      }

      type Code = DisplayAny<Attributes.Code>
      interface Commentary extends Attributes.Common, Attributes.Typed {}
      interface Content extends Partial<Attributes.Common> {}
      interface Definition extends Attributes.Common, Attributes.Typed {}

      interface Document extends Attributes.Common {
          'cnxml-version': '0.7' | '0.8'
          'module-id': string
      }

      interface Download extends Partial<Attributes.Common>, Attributes.Media {}

      interface Emphasis extends Partial<Attributes.Common> {
          effect?: 'bold' | 'italics' | 'underline' | 'smallcaps' | 'normal'
      }

      interface Equation extends Attributes.Common, Attributes.Typed {}
      interface Example extends Attributes.Common, Attributes.Typed {}

      interface Exercise extends Attributes.Common, Attributes.Typed {
          'print-placement'?: 'end' | 'here'
      }

      interface Figure extends Attributes.Common, Attributes.Typed {
          orient?: 'horizontal' | 'vertical'
      }

      interface Flash extends Partial<Attributes.Common>, Attributes.VisualMedia {
          vmode?: 'window' | 'opaque' | 'transparent'
          quality?: 'low' | 'autolow' | 'autohigh' | 'medium' | 'high'
          loop?: boolean
          scale?: 'default' | 'noorder' | 'exactfit'
          bgcolor?: string
          'flash-vars'?: string
      }

      interface Footnote extends Partial<Attributes.Common> {}
      type Foreign = Partial<Attributes.Common & Attributes.Link>
      interface Glossary extends Partial<Attributes.Common> {}

      interface Image extends Partial<Attributes.Common>, Attributes.VisualMedia {
          'print-width'?: string
          thumbnail?: string
      }

      interface Item extends Partial<Attributes.Common> {}

      interface JavaApplet extends Partial<Attributes.Common> {
          code: string
          'mime-type': string
          for?: Attributes.MediaUse
          codebase?: string
          archive?: string
          name?: string
          src?: string
          height?: number
          width?: number
          longdesc?: string
      }

      interface Label extends Partial<Attributes.Common> {}

      interface Labview extends Partial<Attributes.Common>, Attributes.VisualMedia {
          version: '7.0' | '8.0' | '8.2'
      }

      type Link = Partial<Attributes.Common> & Attributes.Link & Attributes.Strength & CMLNLE.Attributes.Cased
      type List = DisplayAny<Attributes.List>
      interface Meaning extends Attributes.Common {}

      interface Media extends Attributes.Common {
          alt: string
          display?: Attributes.Display
          longdesc?: string
      }

      interface Newline extends Partial<Attributes.Common>, Attributes.Space {}
      type Note = DisplayAny<Attributes.Typed>
      interface Para extends Attributes.Common {}

      interface Param extends Partial<Attributes.Common> {
          name: string
          value: string
      }

      type Preformat = DisplayAny
      interface Problem extends Attributes.Common, Attributes.Typed {}
      interface Proof extends Attributes.Common, Attributes.Typed {}
      type Quote = DisplayAny<Attributes.Typed & Attributes.Link>
      interface Rule extends Attributes.Common, Attributes.Typed {}
      interface Section extends Attributes.Common, Attributes.Typed {}
      interface SeeAlso extends Partial<Attributes.Common>, Attributes.Typed {}

      interface Solution extends Attributes.Common, Attributes.Typed {
          'print-placement'?: 'end' | 'here'
      }

      interface Space extends Partial<Attributes.Common>, Attributes.Space {}
      interface Sub extends Partial<Attributes.Common> {}
      interface Subfigure extends Attributes.Common, Attributes.Typed {}
      interface Sup extends Partial<Attributes.Common> {}
      interface Statement extends Attributes.Common, Attributes.Typed {}
      type Term = Partial<Attributes.Common & Attributes.Link> & CMLNLE.Attributes.Reference
      interface Title extends Partial<Attributes.Common> {}
      interface Video extends Partial<Attributes.Common>, Attributes.PlayableMedia, Attributes.VisualMedia {}
  }

  /** Natural language extensions to CNXML */
  namespace CMLNLE {
      namespace Attributes {
          interface Cased {
              cmlnleCase?: Case
          }

          interface Reference {
              cmlnleReference?: string
          }
      }
  }

  /** CNXML extensions to facilitate better editing experience */
  namespace Editing {
      interface AltText {}
  }

  namespace JSX {
      interface IntrinsicAttributes {
          xmlns?: string
          xmlLang?: string
          children?: Node
      }

      interface IntrinsicElements {
          'cite-title': IntrinsicAttributes & CNXML.Cite
          'alt-text': IntrinsicAttributes & Editing.AltText
          audio: IntrinsicAttributes & CNXML.Audio
          caption: IntrinsicAttributes & CNXML.Caption
          cite: IntrinsicAttributes & CNXML.Cite
          code: IntrinsicAttributes & CNXML.Code
          commentary: IntrinsicAttributes & CNXML.Commentary
          content: IntrinsicAttributes & CNXML.Content
          definition: IntrinsicAttributes & CNXML.Definition
          document: IntrinsicAttributes & CNXML.Document
          download: IntrinsicAttributes & CNXML.Download
          emphasis: IntrinsicAttributes & CNXML.Emphasis
          equation: IntrinsicAttributes & CNXML.Equation
          example: IntrinsicAttributes & CNXML.Example
          exercise: IntrinsicAttributes & CNXML.Exercise
          figure: IntrinsicAttributes & CNXML.Figure
          flash: IntrinsicAttributes & CNXML.Flash
          footnote: IntrinsicAttributes & CNXML.Footnote
          foreign: IntrinsicAttributes & CNXML.Foreign
          glossary: IntrinsicAttributes & CNXML.Glossary
          image: IntrinsicAttributes & CNXML.Image
          item: IntrinsicAttributes & CNXML.Item
          'java-applet': IntrinsicAttributes & CNXML.JavaApplet
          label: IntrinsicAttributes & CNXML.Label
          labview: IntrinsicAttributes & CNXML.Labview
          link: IntrinsicAttributes & CNXML.Link
          list: IntrinsicAttributes & CNXML.List
          meaning: IntrinsicAttributes & CNXML.Meaning
          media: IntrinsicAttributes & CNXML.Media
          newline: IntrinsicAttributes & CNXML.Newline
          note: IntrinsicAttributes & CNXML.Note
          para: IntrinsicAttributes & CNXML.Para
          param: IntrinsicAttributes & CNXML.Param
          preformat: IntrinsicAttributes & CNXML.Preformat
          problem: IntrinsicAttributes & CNXML.Problem
          proof: IntrinsicAttributes & CNXML.Proof
          quote: IntrinsicAttributes & CNXML.Quote
          rule: IntrinsicAttributes & CNXML.Rule
          section: IntrinsicAttributes & CNXML.Section
          seealso: IntrinsicAttributes & CNXML.SeeAlso
          solution: IntrinsicAttributes & CNXML.Solution
          space: IntrinsicAttributes & CNXML.Space
          statement: IntrinsicAttributes & CNXML.Statement
          sub: IntrinsicAttributes & CNXML.Sub
          subfigure: IntrinsicAttributes & CNXML.Subfigure
          sup: IntrinsicAttributes & CNXML.Sup
          term: IntrinsicAttributes & CNXML.Term
          title: IntrinsicAttributes & CNXML.Title
          video: IntrinsicAttributes & CNXML.Video
      }
  }
}

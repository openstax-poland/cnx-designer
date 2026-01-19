import {
    BulletedList, CnxElement, ElementExtensions, EnumeratedList, StyledText, TextExtensions,
} from './interfaces'

declare module 'slate' {
    interface CustomTypes {
        Element: CnxElement & ElementExtensions
        Text: StyledText & TextExtensions

        // We don't set IDs on the editor, but as we may check for
        // `(node as BaseNode).id` it needs to be present for it to type check.
        Editor: { id: void }
    }
}

declare module 'slate-lists' {
    interface CustomTypes {
        List: BulletedList | EnumeratedList
    }
}

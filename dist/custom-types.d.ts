import { BaseEditor } from 'slate';
import { CnxEditor } from '.';
import { BulletedList, CnxElement, ElementExtensions, EnumeratedList, StyledText, TextExtensions } from './interfaces';
declare module 'slate' {
    interface CustomTypes {
        Element: CnxElement & ElementExtensions;
        Text: StyledText & TextExtensions;
        Editor: BaseEditor & CnxEditor & {
            id?: void;
        };
    }
}
declare module 'slate-lists' {
    interface CustomTypes {
        List: BulletedList | EnumeratedList;
    }
}

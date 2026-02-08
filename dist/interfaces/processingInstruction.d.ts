import { Descendant, Node } from 'slate';
/** Processing Instruction */
export interface ProcessingInstruction {
    type: 'processing_instruction';
    target: string;
    value: string;
    children: Descendant[];
}
export declare const ProcessingInstruction: {
    /** Check if value of unknown type is a processing instruction element */
    isProcessingInstruction(this: void, value: Node | undefined | null): value is ProcessingInstruction;
};

import { Element } from 'slate';
/** Processing Instruction */
export interface ProcessingInstruction extends Element {
    type: 'processing_instruction';
    target: string;
    value: string;
}
export declare const ProcessingInstruction: {
    /** Check if value of unknown type is a processing instruction element */
    isProcessingInstruction(value: unknown): value is ProcessingInstruction;
};

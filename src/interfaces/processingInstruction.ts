import { Element } from 'slate'

/** Processing Instruction */
export interface ProcessingInstruction extends Element {
    type: 'processing_instruction'
    target: string
    value: string
}

export const ProcessingInstruction = {
    /** Check if value of unknown type is a processing instruction element */
    isProcessingInstruction(this: void, value: unknown): value is ProcessingInstruction {
        return Element.isElement(value) && value.type === 'processing_instruction'
    },
}

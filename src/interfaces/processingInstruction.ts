import { Descendant, Node } from 'slate'

/** Processing Instruction */
export interface ProcessingInstruction {
    type: 'processing_instruction'
    target: string
    value: string
    children: Descendant[]
}

export const ProcessingInstruction = {
    /** Check if value of unknown type is a processing instruction element */
    isProcessingInstruction(
        this: void,
        value: Node | undefined | null,
    ): value is ProcessingInstruction {
        return value != null && Node.isElement(value) && value.type === 'processing_instruction'
    },
}

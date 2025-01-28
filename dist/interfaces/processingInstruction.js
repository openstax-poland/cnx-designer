import { Element } from 'slate';
export const ProcessingInstruction = {
    /** Check if value of unknown type is a processing instruction element */
    isProcessingInstruction(value) {
        return Element.isElement(value) && value.type === 'processing_instruction';
    },
};

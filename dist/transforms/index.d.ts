import * as FigureTransforms from './figure';
declare const Transforms: {
    wrapSectionTitle(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
    }): void;
    increaseSectionDepth(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
    }): void;
    decreaseSectionDepth(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
    }): void;
    insertRule(editor: import("slate").Editor, kind?: import("..").RuleKind | undefined, options?: {
        at?: import("slate").Location | undefined;
    }): void;
    insertStatement(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    insertProof(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    insertRuleExample(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    addMediaItem(editor: import("slate").Editor, item: Omit<import("..").Audio | import("..").Image | import("..").Video, "children">, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    addGlossaryDefinition(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        mode?: "before" | "after" | undefined;
        select?: boolean | undefined;
    }): void;
    insertMeaning(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    insertDefinitionExample(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    insertSeeAlso(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    insertFigure(editor: import("slate").Editor, media: FigureTransforms.MediaItem, options?: {
        at?: import("slate").Location | undefined;
    }): void;
    insertSubfigure(editor: import("slate").Editor, media: FigureTransforms.MediaItem, options?: {
        at?: import("slate").Location | undefined;
    }): void;
    insertCaption(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    insertExercise(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
    }): void;
    insertSolution(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
    insertCommentary(editor: import("slate").Editor, options?: {
        at?: import("slate").Location | undefined;
        select?: boolean | undefined;
    }): void;
};
export default Transforms;

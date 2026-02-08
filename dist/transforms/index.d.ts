import * as FigureTransforms from './figure';
declare const Transforms: {
    wrapSectionTitle(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
    }): void;
    increaseSectionDepth(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
    }): void;
    decreaseSectionDepth(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
    }): void;
    insertRule(editor: import("slate").Editor, kind?: import("..").RuleKind, options?: {
        at?: import("slate").Location;
    }): void;
    insertStatement(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    insertProof(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    insertRuleExample(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    addMediaItem(editor: import("slate").Editor, item: Omit<import("..").Audio | import("..").Image | import("..").Video, "children">, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    addGlossaryDefinition(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        mode?: "before" | "after";
        select?: boolean;
    }): void;
    insertMeaning(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    insertDefinitionExample(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    insertSeeAlso(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    insertFigure(editor: import("slate").Editor, media: FigureTransforms.MediaItem, options?: {
        at?: import("slate").Location;
    }): void;
    insertSubfigure(editor: import("slate").Editor, media: FigureTransforms.MediaItem, options?: {
        at?: import("slate").Location;
    }): void;
    insertCaption(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    insertExercise(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
    }): void;
    insertSolution(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
    insertCommentary(editor: import("slate").Editor, options?: {
        at?: import("slate").Location;
        select?: boolean;
    }): void;
};
export default Transforms;

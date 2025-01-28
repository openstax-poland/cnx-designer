import { Editor, Location } from 'slate';
/**
 * Add a new definition to the glossary
 *
 * If there is no glossary in the document a new one will be created.
 *
 * If select is set to true the selection will be collapsed into the new
 * definition.
 */
export declare function addGlossaryDefinition(editor: Editor, options?: {
    at?: Location;
    mode?: 'before' | 'after';
    select?: boolean;
}): void;
/**
 * Insert a new meaning into a definition
 *
 * Does nothing if no definition is selected.
 */
export declare function insertMeaning(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;
/**
 * Insert a new example into a definition
 *
 * Does nothing if no definition is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * example.
 */
export declare function insertDefinitionExample(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;
/**
 * Insert a new see-also section into a definition.
 *
 * Does nothing if no definition is selected. If the definition already contains
 * a see-also section, a new see-also term is added to it instead.
 *
 * If select is set to true the selection will be collapsed into the new
 * see-also term.
 */
export declare function insertSeeAlso(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;

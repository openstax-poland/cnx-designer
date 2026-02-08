import { Editor, Location } from 'slate';
import { RuleKind } from '../interfaces';
/**
 * Create a new exercise and wrap currently selected block in it
 *
 * This function is similar to Slate's Transforms.wrapNodes, but it won't split
 * line elements.
 */
export declare function insertRule(editor: Editor, kind?: RuleKind, options?: {
    at?: Location;
}): void;
/**
 * Insert a new statement into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * statement.
 */
export declare function insertStatement(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;
/**
 * Insert a new proof into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new proof.
 */
export declare function insertProof(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;
/**
 * Insert a new example into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * example.
 */
export declare function insertRuleExample(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;

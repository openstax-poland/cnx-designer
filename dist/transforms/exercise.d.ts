import { Editor, Location } from 'slate';
/**
 * Create a new exercise and wrap currently selected block in it
 *
 * This function is similar to Slate's Transforms.wrapNodes, but it won't split
 * line elements.
 */
export declare function insertExercise(editor: Editor, options?: {
    at?: Location;
}): void;
/**
 * Insert a solution into an exercise.
 *
 * Does nothing if no exercise is selected. The new solution will be inserted
 * after the last selected item but before the commentary.
 *
 * If select is set to true the selection will be collapsed into the new
 * solution.
 */
export declare function insertSolution(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;
/**
 * Insert a commentary into an exercise
 *
 * Does nothing if no exercise is selected, or if selected exercise already has
 * a commentary.
 *
 * If select is set to true the selection will be collapsed into the new
 * commentary.
 */
export declare function insertCommentary(editor: Editor, options?: {
    at?: Location;
    select?: boolean;
}): void;

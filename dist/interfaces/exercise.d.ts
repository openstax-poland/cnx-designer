import { Descendant, Node } from 'slate';
/** An exercise */
export interface Exercise {
    type: 'exercise';
    children: Descendant[];
}
export declare const Exercise: {
    /** Check if value of unknown type is an exercise */
    isExercise(this: void, value: Node | undefined | null): value is Exercise;
};
/** Problem statement of an exercise */
export interface Problem {
    type: 'exercise_problem';
    children: Descendant[];
}
export declare const Problem: {
    /** Check if value of unknown type is a problem statement of an exercise */
    isProblem(this: void, value: Node | undefined | null): value is Problem;
};
/** Example solution of an exercise */
export interface Solution {
    type: 'exercise_solution';
    children: Descendant[];
}
export declare const Solution: {
    /** Check if value of unknown type is a solution of an exercise */
    isSolution(this: void, value: Node | undefined | null): value is Solution;
};
/** Commentary to an exercise */
export interface Commentary {
    type: 'exercise_commentary';
    children: Descendant[];
}
export declare const Commentary: {
    /** Check if value of unknown type is a commentary to an exercise */
    isCommentary(this: void, value: Node | undefined | null): value is Commentary;
};

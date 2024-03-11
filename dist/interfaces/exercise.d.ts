import { Element } from 'slate';
/** An exercise */
export interface Exercise extends Element {
    type: 'exercise';
}
export declare const Exercise: {
    /** Check if value of unknown type is an exercise */
    isExercise(this: void, value: unknown): value is Exercise;
};
/** Problem statement of an exercise */
export interface Problem extends Element {
    type: 'exercise_problem';
}
export declare const Problem: {
    /** Check if value of unknown type is a problem statement of an exercise */
    isProblem(this: void, value: unknown): value is Problem;
};
/** Example solution of an exercise */
export interface Solution extends Element {
    type: 'exercise_solution';
}
export declare const Solution: {
    /** Check if value of unknown type is a solution of an exercise */
    isSolution(this: void, value: unknown): value is Solution;
};
/** Commentary to an exercise */
export interface Commentary extends Element {
    type: 'exercise_commentary';
}
export declare const Commentary: {
    /** Check if value of unknown type is a commentary to an exercise*/
    isCommentary(this: void, value: unknown): value is Commentary;
};

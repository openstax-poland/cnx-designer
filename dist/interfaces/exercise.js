// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const Exercise = {
    /** Check if value of unknown type is an exercise */
    isExercise(value) {
        return Element.isElement(value) && value.type === 'exercise';
    },
};
export const Problem = {
    /** Check if value of unknown type is a problem statement of an exercise */
    isProblem(value) {
        return Element.isElement(value) && value.type === 'exercise_problem';
    },
};
export const Solution = {
    /** Check if value of unknown type is a solution of an exercise */
    isSolution(value) {
        return Element.isElement(value) && value.type === 'exercise_solution';
    },
};
export const Commentary = {
    /** Check if value of unknown type is a commentary to an exercise*/
    isCommentary(value) {
        return Element.isElement(value) && value.type === 'exercise_commentary';
    },
};

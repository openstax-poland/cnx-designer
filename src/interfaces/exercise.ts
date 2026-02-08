// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Node } from 'slate'

/** An exercise */
export interface Exercise {
    type: 'exercise'
    children: Descendant[]
}

export const Exercise = {
    /** Check if value of unknown type is an exercise */
    isExercise(this: void, value: Node | undefined | null): value is Exercise {
        return value != null && Node.isElement(value) && value.type === 'exercise'
    },
}

/** Problem statement of an exercise */
export interface Problem {
    type: 'exercise_problem'
    children: Descendant[]
}

export const Problem = {
    /** Check if value of unknown type is a problem statement of an exercise */
    isProblem(this: void, value: Node | undefined | null): value is Problem {
        return value != null && Node.isElement(value) && value.type === 'exercise_problem'
    },
}

/** Example solution of an exercise */
export interface Solution {
    type: 'exercise_solution'
    children: Descendant[]
}

export const Solution = {
    /** Check if value of unknown type is a solution of an exercise */
    isSolution(this: void, value: Node | undefined | null): value is Solution {
        return value != null && Node.isElement(value) && value.type === 'exercise_solution'
    },
}

/** Commentary to an exercise */
export interface Commentary {
    type: 'exercise_commentary'
    children: Descendant[]
}

export const Commentary = {
    /** Check if value of unknown type is a commentary to an exercise */
    isCommentary(this: void, value: Node | undefined | null): value is Commentary {
        return value != null && Node.isElement(value) && value.type === 'exercise_commentary'
    },
}

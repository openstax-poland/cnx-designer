import { Descendant, Node } from 'slate';
export interface Equation {
    type: 'equation';
    children: Descendant[];
}
export declare const Equation: {
    isEquation(this: void, value: Node | undefined | null): value is Equation;
};

import { Element } from 'slate';
export interface Equation extends Element {
    type: 'equation';
}
export declare const Equation: {
    isEquation(value: unknown): value is Equation;
};

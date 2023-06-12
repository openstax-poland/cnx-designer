/** Elements which may optionally have classes */
export interface WithClasses {
    /** Sorted list of classes */
    classes: string[];
}
export declare const WithClasses: {
    /** Check if value of unknown type has classes */
    hasClasses(value: unknown): value is WithClasses;
    /** Verify that a string is a valid class. */
    isValidClass(value: string): boolean;
    /** Iterate over all valid classes in a string */
    splitClasses(str: string): Iterable<string>;
    /** Normalize an array of classes, returning a new array */
    normalizeClasses(classes: string[]): string[];
};

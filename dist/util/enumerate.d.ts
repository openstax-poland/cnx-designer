/** Yield items of an iterable together with their indices */
export default function enumerate<T>(iter: Iterable<T>, reverse?: boolean): Iterable<[number, T]>;

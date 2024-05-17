/**
 * A generic type that represents the values of an object's properties.
 *
 * @template T - The object type whose values you want to extract.
 */
export type TObjectValues<T> = T[keyof T];

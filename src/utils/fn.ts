import type { EmptyObject, GenericObject, Truthy, WithFalsy } from "src/types";
import { EMPTY_OBJECT } from "./constants";
import { isNotNullish } from "./typeGuards";

export const noop = (): void => {};
/**
 * Gets empty object. Always returns identical reference, which is same as {@link EMPTY_OBJECT} constant.
 */
export const getEmptyObject = (): EmptyObject => EMPTY_OBJECT;
/**
 * No operation function which can be used as default value for input processing functions.
 * It accepts any input and always returns undefined.
 * @param params Any parameters. They are not used in any way.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noopIO = (..._params: any[]): undefined => undefined;
/**
 * Creates array from specified parameters and filters out any falsy values.
 * @param values Parameters from which array is created.
 * @example
 * const result1 = array("abc", false, "cde", null, undefined, ""); // result1 is ["abc", "cde"]
 *
 * // if you need heterogeneous parameter types then you have to specify their type union as parameter for generic
 * const result2 = array<string | number>("abc", false, "cde", null, undefined, "", 6); // result is ["abc", "cde", 6]
 *
 * @see cleanArray
 */
export const createArrayOfDefinedValues = <T>(...values: ReadonlyArray<WithFalsy<T>>) =>
    values.filter((value): value is Truthy<T> => Boolean(value));

export const identity = <T>(item: T): T => item;
/**
 * Creates promise which is never resolved or rejected.
 */
export const block = (): Promise<void> => new Promise(() => {});
/**
 * Checks if value is undefined, null or empty string.
 * @param value Value to check.
 */
export const isEmpty = (value: unknown): value is undefined | null | "" => typeof value === "undefined" || value === null || value === "";
/**
 * Creates new object from specified base object by adding specified key-value tuple. If base object already contains specified key, then
 * tuple is not added.
 * @param base Base object. Is not modified.
 * @param key Key for new value.
 * @param value Value which gets added for specified key.
 */
export const toObject = (base: GenericObject, [key, value]: [string, unknown]): GenericObject => ({ [key]: value, ...base });
export const sum = (acc: number, number: number): number => acc + number;

/**
 * Creates array filled with numbers from interval specified by <min;max) and step of 1.
 * @param max Maximum of interval. Maximum value is not included in result. Maximum cannot be negative number and must be greater or equal than minimum.
 * @param min Minimum of interval. Default value is 0. Minimum cannot be negative number.
 */
export const createInterval = (max: number, min = 0): Array<number> => new Array(max - min).fill(0).map((_, i) => i + min);

/**
 * Creates new array from source array by filtering out empty values (undefined, null, "") and false. Source array is not modified.
 *
 * @param array Array to filter.
 * @see createArrayOfDefinedValues
 */
export const cleanArray = <T>(array: ReadonlyArray<T | false | undefined | null | "">): T[] =>
    array.filter((item): item is T => isNotNullish(item) && item !== false && !isEmpty(item));

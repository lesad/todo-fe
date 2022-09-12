import type { ApplicationModule } from "src/types";

export const isNotNullish = <T>(value: T | undefined | null): value is T => value !== undefined && value !== null;
export const isNullish = (value: unknown): value is null | undefined => value === undefined || value === null;
export const isObject = (value: unknown): value is object => isNotNullish(value) && typeof value === "object";
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
export const isFunction = (value: unknown): value is Function => typeof value === "function";
export const isString = (value: unknown): value is string => typeof value === "string";
export const isNumber = (value: unknown): value is number => typeof value === "number";
export const isDate = (value: unknown): value is Date => value instanceof Date;

/**
 * Type guard for narrowing down union types containing arrays. Checks only if value is array, does not
 * check items inside array. This function use {@link Array.isArray} but is typed to preserve item type
 * through generics instead of using any.
 *
 * @param value Value to check.
 * @see createIsArrayOf
 * @example
 * type Union = undefined | null | number  | string | string[] | readonly number[];
 *
 * const fn = (value: Union) => {
 *     if(Array.isArray(value)){
 *         console.log(value); // value is string[]
 *     }else {
 *         console.log(value); // value is string | number | readonly number[] | null | undefined
 *     }
 *
 *     if(isArray(value)){
 *         console.log(value); // value is string[] | readonly number[]
 *     } else {
 *         console.log(value); // value is string | number | null | undefined
 *     }
 * }
 */
export const isArray = <T>(value: unknown | T | T[] | readonly T[]): value is T[] | readonly T[] => Array.isArray(value);

/**
 * Type guard that checks that object has property.
 * @param object Object to check.
 * @param prop Prop name to check. Can be any property key type (string, number, symbol).
 * @see https://wiki.morosystems.cz/pages/viewpage.action?pageId=205294005
 */
export const hasProp = <K extends PropertyKey>(object: object, prop: K): object is Record<K, unknown> => prop in object;

/**
 * Type guard that checks that object has property and its value is of type specified by typeGuard param.
 * @param object Object to check.
 * @param prop Prop name to check. Can be any property key type (string, number, symbol).
 * @param typeGuard Type guard function to check type of prop value.
 * @see https://wiki.morosystems.cz/pages/viewpage.action?pageId=205294005
 */
export const hasPropOfType = <K extends PropertyKey, PT>(
    object: object,
    prop: K,
    typeGuard: (propValue: unknown) => propValue is PT,
): object is Record<K, PT> => {
    return hasProp(object, prop) && typeGuard(object[prop]);
};

/**
 * Creates type guard function for checking arrays, including type of their items.
 * Returns false for non array values. Always returns true for empty array.
 * @param itemTypeGuard Type guard function which checks type of items in array.
 * @see https://wiki.morosystems.cz/pages/viewpage.action?pageId=205294005
 */
export const createIsArrayOf =
    <I>(itemTypeGuard: (item: unknown) => item is I) =>
    (value: unknown): value is readonly I[] => {
        return Array.isArray(value) && value.every((item) => itemTypeGuard(item));
    };

/**
 * Checks if maybeKey is key of specified object. Works as type guard for indexing.
 * Works only for string keys, numeric keys are not supported.
 * @param object Inspected object.
 * @param maybeKey Value which may be key of object.
 */
export const isObjectKey = <T>(object: T, maybeKey: unknown): maybeKey is keyof T => {
    return !!maybeKey && typeof maybeKey === "string" && isObject(object) && Object.keys(object).includes(maybeKey);
};

/**
 * Provides type check for module definition. Ensures that module contains NAME and that values of well-known
 * attributes have correct types. Module also may have any custom attributes. Return type of this function exactly
 * match type of parameter. This means that if you fill in for example saga attribute, there is no need to check
 * its existence when forking this saga in setup module. This check would be necessary if module was typed directly as {@link ApplicationModule},
 * because ApplicationModule may not include saga.
 *
 * Module object which is passes as parameter is returned without any changes.
 *
 * @param module Module object to type check.
 * @example
 * import { typeCheckAppModule } from "src/utils";
 *
 * export const reduxExampleModule = typeCheckAppModule({
 *  NAME,
 *  Container: ReduxExample,
 *  reducer,
 *  saga,
 * });
 *
 */
export const typeCheckAppModule = <M extends ApplicationModule>(module: M): M => module;

/**
 * Type guard for checking if value is array of strings.
 * @see createIsArrayOf
 */
export const isStringArray = createIsArrayOf(isString);

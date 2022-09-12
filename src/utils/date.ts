import { compareAsc, format as fnsFormat, isEqual, isValid, isWithinInterval, parseISO } from "date-fns";

import { isEmpty } from "./fn";
import { isNullish, isString } from "./typeGuards";

/**
 * Default date format: dd/MM/yyyy.
 */
export const DATE_FORMAT = "dd/MM/yyyy";

/**
 * Default date-time format: dd/MM/yyyy HH:mm.
 */
export const DATE_TIME_FORMAT = `${DATE_FORMAT} HH:mm`;

/**
 * Formats date to string with specified format.
 * @param date Date or number of milliseconds since 1 January 1970 UTC or string representation of date - must be applicable to Date constructor.
 * @param format Target format. See https://date-fns.org/v2.25.0/docs/format for options.
 * @see DATE_FORMAT
 * @see DATE_TIME_FORMAT
 */
export const formatDate = (date: Date | number | string, format: string = DATE_FORMAT): string =>
    fnsFormat(isString(date) ? new Date(date) : date, format);

/**
 * Check if date is invalid. This is helper function for cases where date is constructed from arbitrary string.
 * @param date Date to check.
 */
const isDateInvalid = (date: Date): boolean => Number.isNaN(date.valueOf());

/**
 * Compares two strings representing date.
 * @param firstDateString
 * @param secondDateString
 * @see compareNullableDateStrings
 * @throws Throws error if string cannot be converted to Date.
 */
export const compareDateStrings = (firstDateString: string, secondDateString: string): number => {
    const firstDate = new Date(firstDateString);
    const secondDate = new Date(secondDateString);
    if (isDateInvalid(firstDate)) {
        throw new Error(`Cannot compare date strings. firstDateString does not represent valid date: ${firstDateString}`);
    }
    if (isDateInvalid(secondDate)) {
        throw new Error(`Cannot compare date strings. secondDateString does not represent valid date: ${secondDateString}`);
    }
    return compareAsc(firstDate, secondDate);
};

/**
 * Compares two strings representing date, is able to handle null and undefined values. Null and undefined values are
 * considered as lesser than defined values.
 * @param firstDateString
 * @param secondDateString
 * @see compareDateStrings
 * @throws Throws error if string cannot be converted to Date.
 */
export const compareNullableDateStrings = (firstDateString?: string | null, secondDateString?: string | null): number => {
    const firstEmpty = isEmpty(firstDateString);
    const secondEmpty = isEmpty(secondDateString);

    if (firstEmpty && secondEmpty) {
        return 0;
    }
    if (firstEmpty) {
        return -1;
    }
    if (secondEmpty) {
        return 1;
    }

    return compareDateStrings(firstDateString, secondDateString);
};

/**
 * Options for {@link isWithinInterval} function.
 */
export type DateWithinIntervalOptions = Readonly<{
    /**
     * Determines if undefined or null is considered to be within interval. Default value is false.
     */
    includeNullishDate?: boolean;
    /**
     * Determines result if checked date is equal to start of interval. Default value is true.
     */
    includeStart?: boolean;
    /**
     * Determines result if checked date is equal to end of interval. Default value is true.
     */
    includeEnd?: boolean;
}>;

const dateWithinIntervalDefaultOptions: Required<DateWithinIntervalOptions> = {
    includeNullishDate: false,
    includeStart: true,
    includeEnd: true,
};

/**
 * Checks if specified date is within interval. Whole date, start and end is used for check including its time component.
 * If you want to ignore time component, use startOfDay function from date-fns to remove time before passing parameters to this function.
 *
 * If date is undefined or null, result is determined by {@link DateWithinIntervalOptions.includeNullishDate} which is by default false.
 * Options also determine if interval edge values are included or not. They are included by default.
 *
 * @param date Date to check. Also can be undefined or null.
 * @param start Start of interval.
 * @param end End of interval.
 * @param options See {@link DateWithinIntervalOptions}.
 */
export const isDateWithinInterval = (
    date: Date | null | undefined,
    start: Date,
    end: Date,
    options?: DateWithinIntervalOptions,
): boolean => {
    const { includeNullishDate, includeStart, includeEnd } = { ...dateWithinIntervalDefaultOptions, ...options }; // merge default and specified options

    if (isNullish(date)) {
        return includeNullishDate;
    }

    if (isEqual(date, start)) {
        return includeStart;
    }

    if (isEqual(date, end)) {
        return includeEnd;
    }

    return isWithinInterval(date, { start, end });
};

/**
 *
 * Check if string is valid ISo format
 *
 * @param str - iso string
 */
export const isStringIsoDate = (str: string) => isValid(parseISO(str));

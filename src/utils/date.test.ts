import type { TestCases } from "src/testUtils";
import {
    compareDateStrings,
    compareNullableDateStrings,
    DATE_TIME_FORMAT,
    DateWithinIntervalOptions,
    formatDate,
    isDateWithinInterval,
    isStringIsoDate,
} from "./date";

describe("utils", () => {
    describe("date", () => {
        describe("formatDate", () => {
            const dateString = "2021-11-16T10:56:27";
            const testDate = new Date(2005, 5, 23, 20, 15, 4, 300); // month begins from 0 for January

            it("when input is date and format is not specified then it returns string formatted by default format", () => {
                expect(formatDate(testDate)).toBe("23/06/2005");
            });

            it("when input is number and format is not specified then it returns string formatted by default format", () => {
                const millis = 1637074392000; // 14:53:12 16.11.2021
                expect(formatDate(millis)).toBe("16/11/2021");
            });

            it("when format is specified, then it returns string formatted by specified format", () => {
                expect(formatDate(testDate, DATE_TIME_FORMAT)).toBe("23/06/2005 20:15");
            });

            it("when input string is not valid date representation, then it throws error", () => {
                expect(() => formatDate("das4))#*@")).toThrow();
            });

            it("when input string is valid date representation and format is not specified, then returns string formatted by default format", () => {
                expect(formatDate(dateString)).toBe("16/11/2021");
            });

            it("when input string is valid date representation and format is specified, then returns string formatted by specified format", () => {
                expect(formatDate(dateString, DATE_TIME_FORMAT)).toBe("16/11/2021 10:56");
            });
        });

        describe("compareDateStrings", () => {
            const dateString = "2021-06-16T10:56:27";
            const earlierDateString = "2020-06-16T10:56:27";

            it("when first date string is before second one, then returns -1", () => {
                expect(compareDateStrings(earlierDateString, dateString)).toBe(-1);
            });

            it("when first date string is after second one, then returns 1", () => {
                expect(compareDateStrings(dateString, earlierDateString)).toBe(1);
            });

            it("when first date string and second date string are same, then returns zero", () => {
                expect(compareDateStrings(dateString, dateString)).toBe(0);
            });

            it("when date string cannot be converted to date, then trows error", () => {
                expect(() => compareDateStrings(dateString, "das4))#*@")).toThrow();
                expect(() => compareDateStrings("das4))#*@", dateString)).toThrow();
            });
        });

        describe("compareNullableDateStrings", () => {
            const dateString = "2021-06-16T10:56:27";
            const earlierDateString = "2020-06-16T10:56:27";

            it("when first date string is before second one, then returns -1", () => {
                expect(compareNullableDateStrings(earlierDateString, dateString)).toBe(-1);
            });

            it("when first date string is after second one, then returns 1", () => {
                expect(compareNullableDateStrings(dateString, earlierDateString)).toBe(1);
            });

            it("when first date string and second date string are same, then returns zero", () => {
                expect(compareNullableDateStrings(dateString, dateString)).toBe(0);
            });

            it("when date string cannot be converted to date, then trows error", () => {
                expect(() => compareNullableDateStrings("das4))#*@", "null")).toThrow();
            });

            const testCases: TestCases<Readonly<{ first?: string | null; second?: string | null; expectedResult: number }>> = [
                ["undefined and undefined, then result is 0", { first: undefined, second: undefined, expectedResult: 0 }],
                ["null and null, then result is 0", { first: null, second: null, expectedResult: 0 }],
                ["undefined and null, then result is 0", { first: undefined, second: null, expectedResult: 0 }],
                ["null and undefined, then result is 0", { first: null, second: undefined, expectedResult: 0 }],
                ["undefined and date string, then result is -1", { first: undefined, second: dateString, expectedResult: -1 }],
                ["date string and undefined, then result is 1", { first: dateString, second: undefined, expectedResult: 1 }],
                ["null and date string, then result is -1", { first: null, second: dateString, expectedResult: -1 }],
                ["date string and null, then result is 1", { first: dateString, second: null, expectedResult: 1 }],
            ];

            it.each(testCases)("when input is %s", (_description, { first, second, expectedResult }) => {
                expect(compareNullableDateStrings(first, second)).toBe(expectedResult);
            });
        });

        describe("isDateWithinInterval", () => {
            const firstDate = new Date(2005, 5, 23);
            const secondDate = new Date(2006, 8, 20);
            const thirdDate = new Date(2007, 10, 25);

            const testCases: TestCases<
                Readonly<{
                    date: Date | null | undefined;
                    start: Date;
                    end: Date;
                    options?: DateWithinIntervalOptions;
                    expectedResult: boolean;
                }>
            > = [
                [
                    "given includeNullishDate set to true, when date is undefined, then returns true",
                    { date: undefined, start: firstDate, end: thirdDate, options: { includeNullishDate: true }, expectedResult: true },
                ],
                [
                    "given includeNullishDate set to true, when date is null, then returns true",
                    { date: null, start: firstDate, end: thirdDate, options: { includeNullishDate: true }, expectedResult: true },
                ],
                [
                    "given includeNullishDate set to false, when date is undefined, then returns false",
                    { date: undefined, start: firstDate, end: thirdDate, options: { includeNullishDate: false }, expectedResult: false },
                ],
                [
                    "given includeNullishDate set to false, when date is null, then returns false",
                    { date: null, start: firstDate, end: thirdDate, options: { includeNullishDate: false }, expectedResult: false },
                ],
                [
                    "given includeStart set to false, when date equal to start, then returns false",
                    { date: firstDate, start: firstDate, end: thirdDate, options: { includeStart: false }, expectedResult: false },
                ],
                [
                    "given includeStart set to true, when date equal to start, then returns true",
                    { date: firstDate, start: firstDate, end: thirdDate, options: { includeStart: true }, expectedResult: true },
                ],
                [
                    "given includeEnd set to false, when date equal to end, then returns false",
                    { date: thirdDate, start: firstDate, end: thirdDate, options: { includeEnd: false }, expectedResult: false },
                ],
                [
                    "given includeEnd set to true, when date equal to end, then returns true",
                    { date: thirdDate, start: firstDate, end: thirdDate, options: { includeEnd: true }, expectedResult: true },
                ],
                [
                    "when date is before start, then returns false",
                    { date: firstDate, start: secondDate, end: thirdDate, expectedResult: false },
                ],
                [
                    "when date is after start and before end, then returns true",
                    { date: secondDate, start: firstDate, end: thirdDate, expectedResult: true },
                ],
                [
                    "when date is after end, then returns false",
                    { date: thirdDate, start: firstDate, end: secondDate, expectedResult: false },
                ],
            ];

            it.each(testCases)("%s", (_description, { date, start, end, options, expectedResult }) => {
                expect(isDateWithinInterval(date, start, end, options)).toBe(expectedResult);
            });
        });

        describe("isStringIsoDate", () => {
            const testCases: TestCases<{ input: string; expectedResult: boolean }> = [
                ["empty, returns false", { input: "", expectedResult: false }],
                ["Iso string, returns true", { input: "2022-01-04T09:56:23.886Z", expectedResult: true }],
                ["Iso string without decimal part, returns true", { input: "2022-01-04T09:56:23Z", expectedResult: true }],
                ["Iso string with zeros, returns true", { input: "2020-01-10T23:00:00Z", expectedResult: true }],
                ["date string 2022/01/04, returns false", { input: "2022/01/04", expectedResult: false }],
                ["date string 2020-01-10, returns true", { input: "2020-01-10", expectedResult: true }],
                ["time string, returns false", { input: "09:56:23", expectedResult: false }],
            ];
            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isStringIsoDate(input)).toBe(expectedResult);
            });
        });
    });
});

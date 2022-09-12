import { call } from "redux-saga/effects";

import type { TestCases } from "src/testUtils";
import type { ApplicationModule } from "src/types";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "./constants";
import { noop } from "./fn";
import {
    createIsArrayOf,
    hasProp,
    hasPropOfType,
    isArray,
    isBoolean,
    isDate,
    isFunction,
    isNotNullish,
    isNullish,
    isNumber,
    isObject,
    isObjectKey,
    isString,
    isStringArray,
    typeCheckAppModule,
} from "./typeGuards";

describe("utils", () => {
    describe("type guards", () => {
        const symbol = Symbol.for("sym");
        const testedObject = {
            otherProp: true,
            stringVal: "Foo",
            numVal: 55,
            6: true,
            [symbol]: noop,
        };

        describe("isNotNullish", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["string, returns true", { input: "random", expectedResult: true }],
                ["boolean, returns true", { input: true, expectedResult: true }],
                ["object, returns true", { input: {}, expectedResult: true }],
                [
                    "function, returns true",
                    {
                        input: noop,
                        expectedResult: true,
                    },
                ],
                ["number, returns true", { input: 123, expectedResult: true }],
                ["array, returns true", { input: EMPTY_ARRAY, expectedResult: true }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isNotNullish(input)).toBe(expectedResult);
            });
        });

        describe("isNullish", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns true", { input: undefined, expectedResult: true }],
                ["null, returns true", { input: null, expectedResult: true }],
                ["number, returns false", { input: 0, expectedResult: false }],
                ["string, returns false", { input: "random", expectedResult: false }],
                ["empty string, returns false", { input: "", expectedResult: false }],
                ["boolean, returns false", { input: false, expectedResult: false }],
                ["object, returns false", { input: {}, expectedResult: false }],
                [
                    "function, returns false",
                    {
                        input: noop,
                        expectedResult: false,
                    },
                ],
                ["number, returns false", { input: 123, expectedResult: false }],
                ["empty array, returns false", { input: EMPTY_ARRAY, expectedResult: false }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isNullish(input)).toBe(expectedResult);
            });
        });

        describe("isObject", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["string, returns false", { input: "random", expectedResult: false }],
                ["boolean, returns false", { input: true, expectedResult: false }],
                ["object, returns true", { input: {}, expectedResult: true }],
                [
                    "function, returns false",
                    {
                        input: noop,
                        expectedResult: false,
                    },
                ],
                ["number, returns false", { input: 123, expectedResult: false }],
                ["array, returns true", { input: EMPTY_ARRAY, expectedResult: true }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isObject(input)).toBe(expectedResult);
            });
        });

        describe("isBoolean", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["string, returns false", { input: "random", expectedResult: false }],
                ["true, returns true", { input: true, expectedResult: true }],
                ["false, returns true", { input: false, expectedResult: true }],
                ["object, returns false", { input: {}, expectedResult: false }],
                [
                    "function, returns false",
                    {
                        input: noop,
                        expectedResult: false,
                    },
                ],
                ["number, returns false", { input: 123, expectedResult: false }],
                ["array, returns false", { input: EMPTY_ARRAY, expectedResult: false }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isBoolean(input)).toBe(expectedResult);
            });
        });

        describe("isFunction", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["string, returns false", { input: "random", expectedResult: false }],
                ["boolean, returns false", { input: true, expectedResult: false }],
                ["object, returns false", { input: {}, expectedResult: false }],
                [
                    "function, returns true",
                    {
                        input: noop,
                        expectedResult: true,
                    },
                ],
                ["number, returns false", { input: 123, expectedResult: false }],
                ["array, returns false", { input: EMPTY_ARRAY, expectedResult: false }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isFunction(input)).toBe(expectedResult);
            });
        });

        describe("isString", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["non numeric string, returns true", { input: "random", expectedResult: true }],
                ["numeric string, returns true", { input: "123", expectedResult: true }],
                ["empty string, returns true", { input: "", expectedResult: true }],
                ["object, returns false", { input: {}, expectedResult: false }],
                [
                    "function, returns false",
                    {
                        input: noop,
                        expectedResult: false,
                    },
                ],
                ["number, returns false", { input: 123, expectedResult: false }],
                ["array, returns false", { input: EMPTY_ARRAY, expectedResult: false }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isString(input)).toBe(expectedResult);
            });
        });

        describe("isNumber", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["non numeric string, returns false", { input: "random", expectedResult: false }],
                ["numeric string, returns false", { input: "123", expectedResult: false }],
                ["object, returns false", { input: {}, expectedResult: false }],
                [
                    "function, returns false",
                    {
                        input: noop,
                        expectedResult: false,
                    },
                ],
                ["number, returns true", { input: 123, expectedResult: true }],
                ["NaN, returns true", { input: Number.NaN, expectedResult: true }],
                ["Infinity, returns true", { input: Number.POSITIVE_INFINITY, expectedResult: true }],
                ["array, returns false", { input: EMPTY_ARRAY, expectedResult: false }],
            ];
            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isNumber(input)).toBe(expectedResult);
            });
        });

        describe("isDate", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["string, returns false", { input: "string", expectedResult: false }],
                ["string date, returns false", { input: "2020-06-16T10:56:27", expectedResult: false }],
                ["Unix Timestamp, returns false", { input: 1639659372, expectedResult: false }],
                ["today, returns true", { input: new Date(), expectedResult: true }],
            ];
            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isDate(input)).toBe(expectedResult);
            });
        });

        describe("isArray", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["string, returns false", { input: "random", expectedResult: false }],
                ["boolean, returns false", { input: true, expectedResult: false }],
                ["object, returns false", { input: {}, expectedResult: false }],
                [
                    "function, returns false",
                    {
                        input: noop,
                        expectedResult: false,
                    },
                ],
                ["number, returns false", { input: 123, expectedResult: false }],
                ["date, returns false", { input: new Date(), expectedResult: false }],
                ["empty array, returns true", { input: EMPTY_ARRAY, expectedResult: true }],
                ["string array, returns true", { input: ["a", "b"], expectedResult: true }],
                ["array with mixed types, returns true", { input: ["a", 6, true], expectedResult: true }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isArray(input)).toBe(expectedResult);
            });
        });

        describe("hasProp", () => {
            it("when object does not have specified prop, returns false", () => {
                expect(hasProp(testedObject, "nonExistentProp")).toBe(false);
            });

            it("when object has specified string prop, returns true", () => {
                expect(hasProp(testedObject, "stringVal")).toBe(true);
            });

            it("when object has specified numeric prop, returns true", () => {
                expect(hasProp(testedObject, 6)).toBe(true);
            });

            it("when object has specified symbol prop, returns true", () => {
                expect(hasProp(testedObject, symbol)).toBe(true);
            });
        });

        describe("hasPropOfType", () => {
            it("when object does not have specified prop, returns false", () => {
                expect(hasPropOfType(testedObject, "nonExistentProp", isString)).toBe(false);
            });

            it("when object has specified prop, but type does not match, returns false", () => {
                expect(hasPropOfType(testedObject, "numVal", isString)).toBe(false);
            });

            it("when object has specified string prop, and type matches, returns true", () => {
                expect(hasPropOfType(testedObject, "stringVal", isString)).toBe(true);
                expect(hasPropOfType(testedObject, "numVal", isNumber)).toBe(true);
            });

            it("when object has specified numeric prop, and type matches, returns true", () => {
                expect(hasPropOfType(testedObject, 6, isBoolean)).toBe(true);
            });

            it("when object has specified symbol prop, and type matches, returns true", () => {
                expect(hasPropOfType(testedObject, symbol, isFunction)).toBe(true);
            });
        });

        describe("createIsArrayOf", () => {
            const isArrayOf = createIsArrayOf(isString);

            const testCases: TestCases<{ input: unknown }> = [
                ["undefined", { input: undefined }],
                ["null", { input: null }],
                ["string", { input: "foo" }],
                ["number", { input: 666 }],
                ["function", { input: noop }],
                ["object", { input: EMPTY_OBJECT }],
            ];
            it.each(testCases)("when value is %, returns false", (_description, { input }) => {
                expect(isArrayOf(input)).toBe(false);
            });

            it("when input is empty array, returns true", () => {
                expect(isArrayOf(EMPTY_ARRAY)).toBe(true);
            });

            it("when input is array and contains any item with incompatible type, returns false", () => {
                expect(isArrayOf(["Foo", "bar", null])).toBe(false);
            });

            it("when input is array and contains only items with compatible type, returns true", () => {
                expect(isArrayOf(["Foo", "bar", ""])).toBe(true);
            });
        });

        describe("isObjectKey", () => {
            const testCases: TestCases<Readonly<{ key: unknown; object: unknown; expectedResult: boolean }>> = [
                ["when key is undefined, returns false", { key: undefined, object: undefined, expectedResult: false }],
                ["when key is null, returns false", { key: null, object: undefined, expectedResult: false }],
                ["when key is number, returns false", { key: 5, object: { 5: "5" }, expectedResult: false }],
                [
                    "when key is string and object is undefined, returns false",
                    { key: "attrName", object: undefined, expectedResult: false },
                ],
                ["when key is string and object is null, returns false", { key: "attrName", object: null, expectedResult: false }],
                ["when key is string and object is number, returns false", { key: "attrName", object: 5, expectedResult: false }],
                [
                    "when key is string and object is function, returns false",
                    {
                        key: "attrName",
                        object: () => {},
                        expectedResult: false,
                    },
                ],
                [
                    "when key is string and object does not have this key, returns false",
                    { key: "attrName", object: { otherKey: true }, expectedResult: false },
                ],
                [
                    "when key is string and object has this key, returns true",
                    { key: "attrName", object: { otherKey: true, attrName: "Foo" }, expectedResult: true },
                ],
            ];

            it.each(testCases)("%s", (_description, { key, object, expectedResult }) => {
                expect(isObjectKey(object, key)).toBe(expectedResult);
            });
        });

        describe("typeCheckAppModule", () => {
            it("returns its parameter unchanged", () => {
                const checkedModule: ApplicationModule = {
                    NAME: "TestModule",
                    reducer: (state = 6, _action) => state,
                    Container: () => null,
                    saga: function* testSaga() {
                        // eslint-disable-next-line no-console
                        yield call(console.log, "text");
                    },
                };
                const moduleCopy = { ...checkedModule };
                const result = typeCheckAppModule(checkedModule);

                expect(result).toBe(checkedModule);
                expect(result).toEqual(moduleCopy);
            });
        });

        describe("isStringArray", () => {
            const testCases: TestCases<Readonly<{ input: unknown; expectedResult: boolean }>> = [
                ["undefined, returns false", { input: undefined, expectedResult: false }],
                ["null, returns false", { input: null, expectedResult: false }],
                ["string, returns false", { input: "random", expectedResult: false }],
                ["boolean, returns false", { input: true, expectedResult: false }],
                ["object, returns false", { input: {}, expectedResult: false }],
                [
                    "function, returns false",
                    {
                        input: noop,
                        expectedResult: false,
                    },
                ],
                ["number, returns false", { input: 123, expectedResult: false }],
                ["empty array, returns true", { input: EMPTY_ARRAY, expectedResult: true }],
                ["array of strings, returns true", { input: ["str1", "str2"], expectedResult: true }],
                ["array of strings and other types, returns false", { input: ["str1", "str2", null], expectedResult: false }],
            ];

            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isStringArray(input)).toBe(expectedResult);
            });
        });
    });
});

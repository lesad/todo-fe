import type { TestCases } from "src/testUtils";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "./constants";
import {
    block,
    cleanArray,
    createArrayOfDefinedValues,
    createInterval,
    getEmptyObject,
    identity,
    isEmpty,
    noop,
    noopIO,
    sum,
    toObject,
} from "./fn";

describe("utils", () => {
    describe("fn", () => {
        describe("noop", () => {
            it("does not return anything", () => {
                expect(noop()).toBeUndefined();
            });
        });

        describe("getEmptyObject", () => {
            it("returns EMPTY_OBJECT", () => {
                expect(getEmptyObject()).toBe(EMPTY_OBJECT);
            });
        });

        describe("noopIO", () => {
            it("returns undefined", () => {
                expect(noopIO()).toBeUndefined();
                expect(noopIO("random", {}, [1, 4])).toBeUndefined();
            });
        });

        describe("createArrayOfDefinedValues", () => {
            it("when there are no parameters, returns empty array", () => {
                expect(createArrayOfDefinedValues()).toEqual([]);
            });
            it("when parameters contains only falsy values, returns empty array", () => {
                expect(createArrayOfDefinedValues("", false, 0, undefined, null)).toEqual([]);
            });
            it("when parametrs contains both falsy and truthy values, returns array with truthy values", () => {
                const object = {
                    attr: false,
                };
                expect(createArrayOfDefinedValues<unknown>("", "58", false, 0, undefined, 35, null, object)).toEqual(["58", 35, object]);
            });
        });

        describe("identity", () => {
            it("returns its parameter", () => {
                expect(identity(EMPTY_OBJECT)).toBe(EMPTY_OBJECT);
            });
        });

        describe("block", () => {
            it("returns promise", () => {
                expect(block()).toEqual(new Promise(() => {}));
            });
        });

        describe("isEmpty", () => {
            const testCases: TestCases<{ input: unknown; expectedResult: boolean }> = [
                ["undefined, returns true", { input: undefined, expectedResult: true }],
                ["null, returns true", { input: null, expectedResult: true }],
                ["empty string, returns true", { input: "", expectedResult: true }],
                ["empty array, returns false", { input: [], expectedResult: false }],
                ["empty object, returns false", { input: {}, expectedResult: false }],
                ["number, returns false", { input: 0, expectedResult: false }],
                ["false, returns false", { input: false, expectedResult: false }],
                ["non empty string, returns false", { input: "string", expectedResult: false }],
                ["function, returns false", { input: noop, expectedResult: false }],
            ];
            it.each(testCases)("when input is %s", (_description, { input, expectedResult }) => {
                expect(isEmpty(input)).toBe(expectedResult);
            });
        });

        describe("toObject", () => {
            const newValue = "newValue";
            const baseObject = {
                someKey: "someValue",
            };
            it("when base object does not contain key, then returns new object with added key and value", () => {
                expect(toObject(baseObject, ["newKey", newValue])).toEqual({
                    ...baseObject,
                    newKey: newValue,
                });
            });

            it("when base object contains key, then returns object with value from base object", () => {
                expect(toObject(baseObject, ["someKey", newValue])).toEqual(baseObject);
            });
        });

        describe("sum", () => {
            it("returns sum of input numbers", () => {
                expect(sum(-5, 6)).toBe(1);
            });
        });

        describe("createInterval", () => {
            it("when only max is specified, then returns array with numbers from zero to max-1 with step 1", () => {
                expect(createInterval(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });

            it("when both min and max are specified, then returns array with numbers from min to max-1 with step 1", () => {
                expect(createInterval(10, 5)).toEqual([5, 6, 7, 8, 9]);
            });

            it("when min and max are same, then returns empty array", () => {
                expect(createInterval(3, 3)).toEqual(EMPTY_ARRAY);
            });
        });

        describe("cleanArray", () => {
            it("returns array with empty values and false filtered out", () => {
                const resultVal1 = "abc";
                const resultVal2 = EMPTY_ARRAY;
                const resultVal3 = EMPTY_OBJECT;
                const resultVal4 = 0;
                const resultVal5 = true;
                expect(cleanArray([resultVal1, undefined, resultVal2, null, resultVal3, "", resultVal4, false, resultVal5])).toEqual([
                    resultVal1,
                    resultVal2,
                    resultVal3,
                    resultVal4,
                    resultVal5,
                ]);
            });
        });
    });
});

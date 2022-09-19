import { sum, capitalizeIfString, reverseCopyArray, fibonacci } from "./pure-fn";

describe("pure functions", () => {
    describe("sum", () => {
        it("should return sum of two numbers", () => {
            expect(sum(1, 2)).toBe(3);
        });
        const randomNumberPairs = Array.from({ length: 10 }, () => [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
        it.each(randomNumberPairs)("should return sum of %i and %i", (a, b) => {
            expect(sum(a, b)).toBe(a + b);
        });
    });
    describe("capitalizeIfString", () => {
        it("should return null if value is null", () => {
            expect(capitalizeIfString(null)).toBeNull();
        });
        it("should return capitalized string if value is string", () => {
            expect(capitalizeIfString("hello")).toBe("Hello");
        });
    });
    describe("reverseCopyArray", () => {
        it("should return reversed copy of array", () => {
            expect(reverseCopyArray([1, 2, 3])).toEqual([3, 2, 1]);
        });
        it("should not mutate original array", () => {
            const original = [1, 2, 3];
            const copy = reverseCopyArray(original);
            expect(copy).not.toBe(original);
            expect(original).toEqual([1, 2, 3]);
        });
    });
    describe("fibonacci", () => {
        it("should return 0 for 0", () => {
            expect(fibonacci(0)).toBe(0);
        });
        it("should return 1 for 1", () => {
            expect(fibonacci(1)).toBe(1);
        });
        it("should return 1 for 2", () => {
            expect(fibonacci(2)).toBe(1);
        });
        it("should form a fibonacci sequence", () => {
            let prev = 0;
            let curr = 1;
            for (let i = 2; i < 10; i += 1) {
                expect(fibonacci(i)).toBe(prev + curr);
                const temp = curr;
                curr = prev + curr;
                prev = temp;
            }
        });
    });
});

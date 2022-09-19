import { sum } from "./pure-fn";

describe("pure functions", () => {
    describe("sum", () => {
        test("it should return sum of two numbers", () => {
            expect(sum(1, 2)).toBe(3);
        });
    });
});

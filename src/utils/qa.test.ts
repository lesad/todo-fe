import { createQAAttributes } from "./qa";

describe("utils", () => {
    describe("qa", () => {
        describe("createQAAttributes", () => {
            it("when qa is not defined, returns empty object", () => {
                expect(createQAAttributes()).toEqual({});
            });

            it("when qa is defined, creates object with test attribute with qa as value", () => {
                const qa = "test-identifier";
                expect(createQAAttributes(qa)).toEqual({ "data-testid": qa });
            });
        });
    });
});

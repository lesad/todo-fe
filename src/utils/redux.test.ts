import { createModuleActionCreators } from "./redux";

describe("utils", () => {
    describe("redux", () => {
        describe("createModuleActionCreators", () => {
            const moduleName = "TestModule";
            const actionType = "testAction";
            const { createEmptyAction, createPayloadAction, createCustomAction } = createModuleActionCreators(moduleName);

            it("provides createEmptyAction, which creates action creator with predefined module name in type and specified action type, without any payload", () => {
                const actionCreator = createEmptyAction(actionType);
                const action = actionCreator();
                expect(actionCreator.type).toContain(moduleName);
                expect(actionCreator.type).toContain(actionType);
                expect(action.type).toContain(moduleName);
                expect(action.type).toContain(actionType);
                expect(action.payload).toBeUndefined();
            });

            describe("provided createPayloadAction function", () => {
                type Payload = Readonly<{
                    content: string;
                }>;
                const payload: Payload = {
                    content: "test payload",
                };

                const actionCreator = createPayloadAction(actionType)<Payload>();
                const action = actionCreator(payload);

                it("creates action creator with predefined module name in type and specified action type", () => {
                    expect(actionCreator.type).toContain(moduleName);
                    expect(actionCreator.type).toContain(actionType);
                    expect(action.type).toContain(moduleName);
                    expect(action.type).toContain(actionType);
                });

                it("sets first parameter as action payload", () => {
                    expect(action.payload).toBe(payload);
                });
            });

            describe("provided createCustomAction function", () => {
                const metaValue = "data";
                const payloadValue = 5;
                const actionCreator = createCustomAction(actionType, (meta: string, payload: number) => ({
                    payload,
                    meta,
                }));
                const action = actionCreator(metaValue, payloadValue);

                it("creates action creator with predefined module name in type and specified action type", () => {
                    expect(actionCreator.type).toContain(moduleName);
                    expect(actionCreator.type).toContain(actionType);
                    expect(action.type).toContain(moduleName);
                    expect(action.type).toContain(actionType);
                });

                it("creates action with content provided by prepare function", () => {
                    expect(action.payload).toBe(payloadValue);
                    expect(action.meta).toBe(metaValue);
                });
            });
        });
    });
});

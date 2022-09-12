import { useDispatch, useSelector } from "react-redux";

import { asMockFn } from "src/testUtils";
import { identity } from "./fn";
import { useAppDispatch, useAppSelector } from "./hooks";

jest.mock("react-redux", () => {
    const originalModule = jest.requireActual("react-redux");

    return {
        __esModule: true,
        ...originalModule,
        useDispatch: jest.fn(),
    };
});

describe("utils", () => {
    describe("hooks", () => {
        describe("useAppDispatch", () => {
            it("calls useDispatch from react-redux and returns identical result", () => {
                const useDispatchMock = asMockFn(useDispatch);
                const dispatchFn = identity;
                useDispatchMock.mockImplementation(() => dispatchFn);
                expect(useAppDispatch()).toBe(dispatchFn);
                expect(useDispatchMock).toHaveBeenCalledTimes(1);
            });
        });

        describe("useAppSelector", () => {
            it("is same function as useSelector from react-redux, only typed", () => {
                expect(useAppSelector).toBe(useSelector);
            });
        });
    });
});

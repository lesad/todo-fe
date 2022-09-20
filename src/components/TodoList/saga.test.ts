import { put, takeEvery } from "redux-saga/effects";

import { appendEffect } from "../../redux/actionsSlice";
import { actions } from "./actions";
import { storeLoadingFinished, storeLoadingStarted, watchLoading } from "./saga";

describe("TodoList Saga", () => {
    describe("watchLoading", () => {
        const generator = watchLoading();

        it("should wait for every LOADING_STARTED", () => {
            expect(generator.next().value).toEqual(takeEvery(actions.LOADING_STARTED, storeLoadingStarted));
        });

        it("should wait for every LOADING_FINISHED", () => {
            expect(generator.next().value).toEqual(takeEvery(actions.LOADING_FINISHED, storeLoadingFinished));
        });
    });

    describe("storeLoadingStarted", () => {
        const generator = storeLoadingStarted();

        it("should put appendEffect", () => {
            expect(generator.next().value).toEqual(put(appendEffect(actions.LOADING_STARTED)));
        });
    });

    describe("storeLoadingFinished", () => {
        const generator = storeLoadingFinished();

        it("should put appendEffect", () => {
            expect(generator.next().value).toEqual(put(appendEffect(actions.LOADING_FINISHED)));
        });
    });
});

export const actions = {
    LOADING_STARTED: "LOADING_STARTED",
    LOADING_FINISHED: "LOADING_FINISHED",
};

export function loadingStarted() {
    return { type: actions.LOADING_STARTED };
}

export function loadingFinished() {
    return { type: actions.LOADING_FINISHED };
}

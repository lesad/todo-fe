/**
 * Prints information about application to console. Contains version and name from package.json and commit info.
 */
export const printAppVersion = (): void => {
    const { NAME, VERSION, COMMIT_HASH, LAST_COMMIT_DATETIME, BUILD_TIME } = APP_INFO;

    /* eslint-disable no-console */
    console.log(`%cApp name: %c${NAME}`, "font-weight: normal", "font-weight: bold");
    console.log(`%cVersion: %c${VERSION}`, "font-weight: normal", "font-weight: bold");
    console.log(`%cCommit hash: %c${COMMIT_HASH}`, "font-weight: normal", "font-weight: bold");
    console.log(`%cCommit time: %c${LAST_COMMIT_DATETIME}`, "font-weight: normal", "font-weight: bold");
    console.log(`%cBuild time: %c${new Date(BUILD_TIME).toISOString()}`, "font-weight: normal", "font-weight: bold");
    /* eslint-enable no-console */
};

/**
 * Returns true if app is compiled in development mode (this includes both development build and dev server).
 */
export const isDevelopment = (): boolean => process.env.NODE_ENV === "development";

/**
 * Returns true if app is compiled in unit test environment.
 */
export const isUnitTesting = (): boolean => process.env.NODE_ENV === "test";

declare global {
    /**
     * Information about this application. Values are provided at compile time by webpack DefinePlugin.
     */
    const APP_INFO: {
        // Content of this type must be synchronized with contents of DefinePlugin in webpack.config.json
        /**
         * Version number of the application. Obtained from package.json version field.
         */
        readonly VERSION: string;
        /**
         * Name of the application. Obtained from package.json name field.
         */
        readonly NAME: string;
        /**
         * Hash of git commit, which was used for this build.
         */
        readonly COMMIT_HASH: string;
        /**
         * Date time of git commit, which was used for this build.
         */
        readonly LAST_COMMIT_DATETIME: string;
        /**
         * Date time when this build was done. String containing number of milliseconds since the Unix epoch.
         */
        readonly BUILD_TIME: string;
    };
}

/* If your module exports nothing, you'll need this line. Otherwise, delete it. TypeScript needs export to recognize module. */
export {};

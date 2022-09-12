// @ts-ignore - without ignore main.ts cannot be compiled under isolatedModules option

// tsconfig-paths-webpack-plugin is used as webpack setting
// eslint-disable-next-line import/no-extraneous-dependencies
// import { mergeConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// import type { StorybookViteConfig } from "@storybook/builder-vite";

module.exports = {
    core: {
        builder: "@storybook/builder-vite",
    },
    stories: ["../**/*.story.tsx", "../**/*.story.mdx"],
    addons: [
        // order of addons determines order of tabs in story sidebar
        "@storybook/addon-essentials",
        "@storybook/addon-links",
    ],
    features: {
        // should not be necessary for Storybooku 7 and later, see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
        postcss: false,
    },
    typescript: {
        check: false, // default, disabled fork-ts-checker-webpack-plugin
        reactDocgen: "react-docgen",
        reactDocgenTypescriptOptions: {
            /* shouldExtractLiteralValuesFromEnum is set to preserve default value, reactDocgenTypescriptOptions are not merged */
            shouldExtractLiteralValuesFromEnum: true,
            /* react-docgen-typescript needs to know about path aliases to be able to auto extract documentation from components which use these aliases */
            tsconfigPath: "./tsconfig.aliases.json",
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async viteFinal(config) {
        return config;
        // config.plugins.push(AppVersionWebpackPlugin);
        // eslint-disable-next-line no-param-reassign
        // return mergeConfig(config, {
        //
        // });
        //     config.resolve.plugins = [
        //         ...(config.resolve.plugins || []),
        //         new TsconfigPathsPlugin({
        //             extensions: config.resolve.extensions,
        //         }),
        //     ];
        //
        //     config.module.rules.push({
        //         test: /\.ya?ml$/,
        //         use: "yaml-loader",
        //     });
        //
        // })
    },
};

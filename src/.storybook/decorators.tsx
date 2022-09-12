import type { DecoratorFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import { theme } from "src/theme";

/**
 * use of `storybook-addon-styled-component-theme` with `@storybook/addon-links` cause link error (described in package.md)
 */
export const decorators: ReadonlyArray<DecoratorFn> = [(story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>];

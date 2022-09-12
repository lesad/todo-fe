import type { ArgType } from "@storybook/addons";

import { CommonArgTypeOptions, ControlType } from "./types";
import { createArgType } from "./utils";

/**
 * Create argType for select, where the value is selected by key. This allow use more complex value, for example functions.
 * As a label is used object key <code>values</code>. Keys are used for setting values via URL.
 * If the values in URL ad values shown to user should be different <code>labels</code> have to be used.
 *
 * Use attributes from <code>mapping</code> controls.
 *
 * @param name Name, which is shown in section in control panel.
 * @param values Values for selection.
 * @param value Selected value.
 * @param options additional options for argType.
 *
 * @see https://storybook.js.org/docs/react/essentials/controls#dealing-with-complex-values
 */
export const createMappedSelectArgType = <T>(name: string, values: T, value?: keyof T, options?: CommonArgTypeOptions): ArgType => {
    const type = options?.type ?? ControlType.select;
    const base = createArgType(name, value, { ...options, type });
    return {
        ...base,
        options: Object.keys(values),
        mapping: values,
    };
};

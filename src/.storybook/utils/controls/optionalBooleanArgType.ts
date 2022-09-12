import type { Option } from "../../../types";
import { createOptionalOptionSelectArgType } from "./enumArgType";
import type { OptionalEnumArgTypeOptions } from "./types";

const BOOLEAN_OPTIONS: Option<boolean>[] = [
    { text: "Yes", value: true },
    { text: "No", value: false },
];

/**
 * Create argType for select optional boolean value.
 * @param name Name, which is shown in section in control panel.
 * @param value Default value.
 * @param options Additional settings for argType.
 */
export const createOptionalBooleanArgType = (name: string, value?: boolean, options?: OptionalEnumArgTypeOptions) =>
    createOptionalOptionSelectArgType(name, BOOLEAN_OPTIONS, value, options);

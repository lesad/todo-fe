import type { Option, TypedObject } from "../../../types";
import { identity } from "../../../utils";
import { createOptionalOptionSelectArgType } from "./enumArgType";
import { ArgProcessor, ArgProcessorFactory, CommonArgTypeOptions, ControlType, EnhancedArgType } from "./types";
import { createArgType } from "./utils";

/**
 * Default options for textSelect. It is mainly used for testing text wrapping.
 */
export const DEFAULT_OPTIONS: readonly Option<string>[] = [
    { text: "Long text", value: "This text contain too many words – it is too long to be shown on one line." },
    { text: "Long word", value: "pneumonoultramicroscopicsilicovolcanoconiosis" },
    { text: "Short text", value: "Short text" },
];

const DEFAULT_UNDEFINED_LABEL = "Custom - low";

/**
 * Create a group argTypes which represent textSelect, which allow select text from predefined options od set up custom text.
 *
 * {@link createTextSelectProcessor} processor is needed for work.
 *
 * In ArgsTable documentation is possible to exclude additional controls by use prop exclude, with array of empty controls names.
 *
 * @param name Name, which is shown in section in control panel.
 * @param propName Prop name, where the value is written.
 * @param customValue Default custom value.
 * @param selectOptions Predefined options.
 * @param selectValue Default value from predefined options
 * @param options Additional options for argType.
 *
 * @example
 * const { defaultExport, storyExport } = createSingleStoryExports({
 *  ...
 *  argTypes: {
 *      ...
 *      isUnread: createOptionalBooleanArgType("Ureaded"),
 *      // it is necessary to use spread operator, because multiple argTypes is created. Second param is used as key.
 *      ...createTextSelectArgs("Message content", "text", "Seitan fingerstache subway."),
 *      onClick: createActionArgType(ActionText.click),
 *      ...
 *  },
 * });
 */
export const createTextSelectArgs = (
    name: string,
    propName: string,
    customValue?: string,
    selectOptions: readonly Option<string>[] = DEFAULT_OPTIONS,
    selectValue?: string,
    options?: CommonArgTypeOptions,
) => {
    const selectArgType: EnhancedArgType = {
        ...createOptionalOptionSelectArgType(createPredefinedArgName(name), selectOptions, selectValue, {
            undefinedLabel: DEFAULT_UNDEFINED_LABEL,
            ...options,
        }),
        processTextSelect: propName,
    };
    const textArgType: EnhancedArgType = createArgType(createCustomArgName(name), customValue, { ...options, type: ControlType.text });
    return {
        [propName]: createArgType(name, undefined, { disabled: true }),
        [createPredefinedArgKey(propName)]: selectArgType,
        [createCustomArgKey(propName)]: textArgType,
    };
};

export const createTextSelectProcessorFromArgTypes: ArgProcessorFactory = (argTypes) => {
    const textSelectPropNames = extractTextSelectPropNames(argTypes);
    return textSelectPropNames.length > 0 ? createTextSelectProcessor(textSelectPropNames) : identity;
};

const extractTextSelectPropNames = (argTypes: TypedObject<EnhancedArgType>): readonly string[] =>
    Object.values(argTypes).reduce((result, argType) => {
        if (argType!.processTextSelect) {
            result.push(argType!.processTextSelect);
        }
        return result;
    }, [] as string[]);

/**
 * Create {@link ArgProcessor} to combine values from controls text select to result value for component props.
 * @param textSelectPropNames Prop names, which are filled by text select.
 */
export const createTextSelectProcessor =
    (textSelectPropNames: readonly string[]): ArgProcessor =>
    (args) => {
        if (textSelectPropNames.length === 0) {
            return args;
        }

        const result = { ...args };
        textSelectPropNames.forEach((propName) => {
            const selectKey = createPredefinedArgKey(propName);
            const textKey = createCustomArgKey(propName);
            const selectValue = result[selectKey];
            result[propName] = selectValue || result[textKey];
            delete result[selectKey];
            delete result[textKey];
        });

        return result;
    };

const createPredefinedArgKey = (propName: string) => `${propName}Select`;
const createCustomArgKey = (propName: string) => `${propName}Text`;
const createPredefinedArgName = (name: string) => `${name} - predefined`;
const createCustomArgName = (name: string) => `${name} - custom`;

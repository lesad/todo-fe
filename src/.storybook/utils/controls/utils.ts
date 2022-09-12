import type { ArgType } from "@storybook/addons";

import { EMPTY_OBJECT } from "../../../utils";
import { ControlCategory } from "../constants";
import type { ArgTypeOptions, EnhancedArgType, GenericArgs, SplitArgs } from "./types";

/**
 * Constant for readonly argType. All other data is derived automatically. If the derived data do not comply,
 * it is recommended to use {@link createArgType} with the disabled setting in options instead.
 */
export const DISABLED_ARG_TYPE = { control: { disable: true }, table: { category: ControlCategory.props } };

/**
 * Constant for hidden argType.
 */
export const HIDDEN_ARG_TYPE = { table: { disable: true } };

/**
 * Creates an object describing one argType for controls.
 *
 * @param name Name, which is shown in section in control panel and in ArgsTable.
 * Any XG part is specified separately by the parameter xg.

 * @param value Default value for control. If it is not set up, undefined is passed to component.
 * @param options Additional settings for control. Described in {@link ActionArgTypeOptions}.
 */
export const createArgType = <V>(name?: string, value?: V, options: ArgTypeOptions = {}): EnhancedArgType => {
    const { disabled, hidden, category = ControlCategory.props, type, min, max, step } = options;
    const numericOptionDefined = min !== undefined || max !== undefined || step !== undefined;
    const controlOptionDefined = disabled || type;
    const base: ArgType = {
        name,
        argValue: value, // the argValue function is explained in create.tsx/splitArgs, this is our own parameter
        table: {
            disable: hidden,
            category,
        },
    };

    if (controlOptionDefined || numericOptionDefined) {
        base.control = {
            disable: disabled,
            type,
            min,
            max,
            step,
        };
    }

    return base;
};

/**
 * Workaround to deprecated defaultValue in argType: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#no-longer-inferring-default-values-of-args.
 * Allows you to specify a default value within the createArgType function without having to explicitly specify args and thus complicated the writing of the story.
 *
 * This function splits the output of createArgType into args and argTypes automatically so that the author of the story does not have to deal with it.
 * @param argTypes ArgTypes, which may additionally contain argValue, which will be separated into args.
 */
export const splitArgs = <A extends GenericArgs>(argTypes?: Partial<Record<keyof A, ArgType>>): SplitArgs<A> => {
    if (!argTypes) {
        return EMPTY_OBJECT;
    }

    const filteredArgTypes: Partial<Record<keyof A, ArgType>> = {};
    const args: Partial<A> = {};
    let argValueExists = false;

    (Object.entries(argTypes) as [keyof A, ArgType][]).forEach(([key, value]) => {
        if (value.argValue !== undefined) {
            args[key] = value.argValue;
            // eslint-disable-next-line no-param-reassign
            delete value.argValue;
            argValueExists = true;
        }

        filteredArgTypes[key] = value;
    });

    return {
        filteredArgTypes: argValueExists ? filteredArgTypes : argTypes,
        derivedArgs: argValueExists ? args : undefined,
    };
};

import type { TypedObject } from "../../../types";
import { identity } from "../../../utils";
import { ArgProcessor, ArgProcessorFactory, ControlType, EnhancedArgType, OptionalTextArgTypeOptions } from "./types";
import { createArgType } from "./utils";

/**
 * Vytvoří argType pro zadávání nepovinného textu. Narozdíl od běžného argType typu text nahrazuje prázdný řetězec za undefined,
 * Create argType for optional text. In contrast with default argType text, replace empty string as undefined,
 * it allow to set undefined after previous value was not empty. Default text allow undefined only after reset all controls.
 *
 * {@link createOptionalTextProcessor} processor is needed for work.
 *
 * @param name Name, which is shown in section in control panel.
 * @param value Default value.
 * @param options Additional settings for argType.
 */
export const createOptionalTextArgType = (name: string, value?: string, options?: OptionalTextArgTypeOptions): EnhancedArgType => ({
    ...createArgType(name, value, { ...options, type: ControlType.text }),
    processOptionalText: true,
});

export const createOptionalTextProcessorFromArgTypes: ArgProcessorFactory = (argTypes) => {
    const optionalTextPropNames = extractOptionalTextPropNames(argTypes);
    return optionalTextPropNames.length > 0 ? createOptionalTextProcessor(optionalTextPropNames) : identity;
};

const extractOptionalTextPropNames = (argTypes: TypedObject<EnhancedArgType>): readonly string[] =>
    Object.entries(argTypes).reduce((result, [key, argType]) => {
        if (argType!.processOptionalText) {
            result.push(key);
        }
        return result;
    }, [] as string[]);

/**
 * Create {@link ArgProcessor} for translate empty string to undefined. It is used together with {@link createOptionalTextArgType}.
 *
 * @param optionalTextPropNames Props names, which are translated to undefined if contains empty string.
 */
export const createOptionalTextProcessor =
    (optionalTextPropNames: readonly string[]): ArgProcessor =>
    (args) => {
        if (optionalTextPropNames.length === 0) {
            return args;
        }

        const result = { ...args };
        optionalTextPropNames.forEach((optionalTextPropName) => {
            const propValue = result[optionalTextPropName];
            result[optionalTextPropName] = propValue === "" ? undefined : propValue;
        });

        return result;
    };

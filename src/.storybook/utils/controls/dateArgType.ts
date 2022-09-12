import type { TypedObject } from "../../../types";
import { identity, isNumber, isString } from "../../../utils";
import { ArgProcessor, ArgProcessorFactory, ControlType, DateArgTypeOptions, EnhancedArgType } from "./types";
import { createArgType } from "./utils";

/**
 * Create argType for setting date and time.
 *
 * @param name Name, which is shown in control panel.
 * @param value Default value.
 * @param options Additional setting of argType.
 */
export const createDateArgType = (name: string, value?: Date, options?: DateArgTypeOptions): EnhancedArgType => ({
    ...createArgType(name, value, { ...options, type: ControlType.date }),
    processDate: true,
});

export const createFixDatesProcessorFromArgTypes: ArgProcessorFactory = (argTypes) => {
    const datePropNames = extractDatePropNames(argTypes);
    return datePropNames.length > 0 ? createFixDatesProcessor(datePropNames) : identity;
};

const extractDatePropNames = (argTypes: TypedObject<EnhancedArgType>): readonly string[] =>
    Object.entries(argTypes).reduce((result, [key, argType]) => {
        if (argType!.processDate) {
            result.push(key);
        }
        return result;
    }, [] as string[]);

/**
 * Create {@link ArgProcessor} for translate timestamp to date. It is work around issue https://github.com/storybookjs/storybook/issues/11822.
 * When the issue will be fixed, remove this processor by controller option in {@link createDateArgType}
 *
 * @param datePropNames Names props, which processor translate to Date.
 * @see https://github.com/storybookjs/storybook/issues/11822
 */
export const createFixDatesProcessor =
    (datePropNames: readonly string[]): ArgProcessor =>
    (args) => {
        if (datePropNames.length === 0) {
            return args;
        }

        const result = { ...args };
        datePropNames.forEach((datePropName) => {
            const datePropValue = result[datePropName];
            let newValue;
            if (isString(datePropValue) || isNumber(datePropValue)) {
                newValue = new Date(datePropValue);
            } else {
                newValue = datePropValue;
            }

            result[datePropName] = newValue;
        });

        return result;
    };

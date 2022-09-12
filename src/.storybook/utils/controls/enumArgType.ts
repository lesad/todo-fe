import type { ArgType } from "@storybook/addons";

import type { MutableTypedObject, ObjectType, Option, TypedObject } from "../../../types";
import { DEFAULT_UNDEFINED_LABEL } from "./constants";
import { CommonArgTypeOptions, ControlType, OptionalEnumArgTypeOptions } from "./types";
import { createArgType } from "./utils";

/**
 * Function to translate enum to object.
 * Filter revers enum mapping and private attributes.
 *
 * @param enumObject Enum for translation. Could contains strings or number.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertEnumToOptions = (enumObject: TypedObject<any>): TypedObject<any> =>
    Object.keys(enumObject)
        .filter((key) => !key.match(/^\d+$/)) // Filter revers enum mapping from numeric enums.
        .filter((key) => !key.startsWith("__")) // filter private attributes, for example __docgenInfo created from comments.
        .filter((key) => key !== "displayName") // filter displayName, which is added by react-docgen-typescript-loader, when the enum is commented.
        .reduce((result, key) => ({ ...result, [key]: enumObject[key] }), {});

/**
 * Creates storybook options (https://storybook.js.org/docs/react/api/argtypes) from enum.
 *
 * Controls addon doesn't support selection of undefined value for optional args.
 * We add special "undefined" option to unselect value of enum.
 *
 * For labels are used enum keys. Label for undefined option could be set up in options parameter.
 *
 * @param name Name, which is shown in section in control panel.
 * @param values Enum, for create options.
 * @param value Default value, if it is not set up undefined is used.
 * @param options Additional setting for argType.
 *
 * @see https://storybook.js.org/docs/react/essentials/controls#dealing-with-complex-values
 * @see https://github.com/storybookjs/storybook/issues/13259
 */
export const createOptionalEnumArgType = <T>(
    name: string,
    values: ObjectType,
    value?: T,
    options?: OptionalEnumArgTypeOptions,
): ArgType => {
    const base = createArgType(name, value, options);
    const enumOptions = convertEnumToOptions(values);
    const undefinedLabel = options?.undefinedLabel ?? DEFAULT_UNDEFINED_LABEL;
    return {
        ...base,
        options: [undefined, ...Object.values(enumOptions)],
        control: {
            ...base.control,
            labels: Object.entries(enumOptions).reduce(
                (result, [key, option]) => {
                    // eslint-disable-next-line no-param-reassign
                    result[option] = key;
                    return result;
                },
                { undefined: undefinedLabel } as MutableTypedObject<string>,
            ),
        },
    };
};

/**
 * Create argType for selection optional values from defined options.
 * Labels are set up from enum keys. Label for undefined option could be set up by options.
 *
 * @param name Name, which is shown in section in control panel.
 * @param values Enum, for create options.
 * @param value Default value, if it is not set up undefined is used.
 * @param options Additional setting for argType.
 *
 * @see https://storybook.js.org/docs/react/essentials/controls#dealing-with-complex-values
 */
export const createEnumArgType = <T>(name: string, values: ObjectType, value?: T, options?: CommonArgTypeOptions): ArgType => {
    const base = createArgType(name, value, options);
    const enumOptions = convertEnumToOptions(values);
    return {
        ...base,
        options: Object.values(enumOptions),
        control: {
            ...base.control,
            labels: Object.entries(enumOptions).reduce((result, [key, option]) => {
                // eslint-disable-next-line no-param-reassign
                result[option] = key;
                return result;
            }, {} as MutableTypedObject<string>),
        },
    };
};

/**
 * Translate array {@link Option} to {@link TypedObject}, so it can be used for {@link createEnumArgType} or {@link createOptionalEnumArgType}.
 * @param options
 */
const convertOptionsToEnum = <V>(options: ReadonlyArray<Option<V>>): TypedObject<V> =>
    options.reduce(
        (acc, { text, value }) => ({
            ...acc,
            [text]: value,
        }),
        {},
    );

/**
 * Alternative for {@link createOptionalEnumArgType}, it is accept array of Options instead of enum, Default control is {@link ControlType.select}.
 * It is useful in case when value is string but is selection from defined options. In this case controls could not defined type automatically.
 *
 * @param name Name, which is shown in section in control panel.
 * @param selectOptions Array of Options, which is used for selection. Option undefined is added automatically. Label of undefined option could be set up in options  {@link OptionalEnumArgTypeOptions.undefinedLabel}.
 * @param value Default value.
 * @param options Additional settings for argType.
 * @see createOptionalEnumArgType
 */
export const createOptionalOptionSelectArgType = <V>(
    name: string,
    selectOptions: ReadonlyArray<Option<V>>,
    value?: V,
    options?: OptionalEnumArgTypeOptions,
) => {
    const enumLikeOptions = convertOptionsToEnum(selectOptions);
    const type = options?.type ?? ControlType.select;
    return createOptionalEnumArgType(name, enumLikeOptions, value, {
        ...options,
        type,
    });
};

/**
 * Alternative for {@link createOptionalEnumArgType}, it is accept array of Options instead of enum, Default control is {@link ControlType.select}.
 * It is useful in case when value is string but is selection from defined options. In this case controls could not defined type automatically.
 *
 * @param name Name, which is shown in section in control panel.
 * @param selectOptions Array of Options, which is used for selection.
 * @param value Default value.
 * @param options Additional settings for argType.
 * @see createOptionalEnumArgType
 */
export const createOptionSelectArgType = <V>(
    name: string,
    selectOptions: ReadonlyArray<Option<V>>,
    value?: V,
    options?: OptionalEnumArgTypeOptions,
) => {
    const enumLikeOptions = convertOptionsToEnum(selectOptions);
    const type = options?.type ?? ControlType.select;
    return createEnumArgType(name, enumLikeOptions, value, {
        ...options,
        type,
    });
};

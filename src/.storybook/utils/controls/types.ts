import type { ArgType } from "@storybook/addons";

import type { TypedObject } from "../../../types";

/**
 * Parameter for create description of argType for addon-controls.
 */
export type ArgTypeOptions = CommonArgTypeOptions & NumberArgTypeOptions;

/**
 * Parameter for create description of argType for addon-controls. Contains parameters common for all control types.
 */
export type CommonArgTypeOptions = Readonly<{
    /** If it is true, control could not be edited. Default value is false */
    disabled?: boolean;
    /** If it is true, control is hidden in Controls panel and in ArgsTable. Default value is false */
    hidden?: boolean;
    /** Group in Controls panel and in ArgsTable where the control is added */
    category?: string;
    /**
     * Control type which is used. If it is not set up, it is defined automatically from default value or type op component prop.
     */
    type?: ControlType;
}>;

/**
 * Component argType options for actions/callbacks.
 *
 */
export type ActionArgTypeOptions = Pick<CommonArgTypeOptions, "category" | "hidden" | "disabled"> &
    Readonly<{
        /**
         * Value for action. Allow detect arg as action. It is not clear from the documentation whether a particular value has any effect.
         *
         * @see https://storybook.js.org/docs/react/essentials/actions#action-argtype-annotation
         */
        action?: string;
    }>;

/**
 * Setting options for numeric controls.
 * @see https://storybook.js.org/docs/react/essentials/controls#annotation
 */
export type NumberArgTypeOptions = Readonly<{
    /** Minimal value, which can be set up. It works only for numeric type {@link ControlType.number} and {@link ControlType.range}. */
    min?: number;
    /** Maximal value, which can be set up. It works only for numeric type {@link ControlType.number} and {@link ControlType.range}. */
    max?: number;
    /** The step by which the value is shifted when using the buttons. It works only for numeric type {@link ControlType.number} and {@link ControlType.range}. */
    step?: number;
}>;

/**
 * Settings for optional enum.
 */
export type OptionalEnumArgTypeOptions = CommonArgTypeOptions &
    Readonly<{
        /** Allow ser custom label for empty value (undefined). Default value is " ". Empty string could not be used addon controls ignore it. */
        undefinedLabel?: string;
    }>;

/**
 * Setting for argType date.
 */
export type DateArgTypeOptions = Omit<CommonArgTypeOptions, "type">;

/**
 * Setting for additional argType optional text.
 */
export type OptionalTextArgTypeOptions = Omit<CommonArgTypeOptions, "type">;

/**
 * Setting for additional argType optional store.
 */
export type StoreArgTypeOptions = Pick<CommonArgTypeOptions, "hidden">;

/**
 * Control Types. It is used for specified type, in case we do not want detect type automatically.
 *
 * @see https://storybook.js.org/docs/react/essentials/controls#annotation
 */
export enum ControlType {
    /** Switching button for select boolean value. */
    boolean = "boolean",
    /** Array for select number. */
    number = "number",
    /** Slider for select number. */
    range = "range",
    /** Editor for setting object via json format */
    object = "object",
    /** Enum value selector via radio buttons (each in separate line) */
    radio = "radio",
    /** Enum value selector via radio buttons (in one line, wrapped if small line size) */
    inlineRadio = "inline-radio",
    /** Multiple enum values selector via radio buttons (each in separate line) */
    check = "check",
    /** Multiple enum values selector via radio buttons (in one line, wrapped if small line size) */
    inlineCheck = "inline-check",
    /** Enum value selector via select */
    select = "select",
    /** Multiple Enum values selector via select */
    multiSelect = "multi-select",
    /** Array for select text */
    text = "text",
    /** Array for select color */
    color = "color",
    /** Array for select date and time */
    date = "date",
}

/**
 * Type describe common args as readonly object with keys and values
 */
export type GenericArgs = Readonly<Record<string, unknown>>;

/**
 * Function stransforming args before they are received by component. It allows various post-proccessing of values.
 */
export type ArgProcessor = (args: GenericArgs) => GenericArgs;

/**
 * Function to create {@link ArgProcessor} depend on argTypes.
 */
export type ArgProcessorFactory = (argTypes: TypedObject<EnhancedArgType>) => ArgProcessor;

/**
 * Callback for use in actions.
 */
export type ExtendedActionCallback = (...args: unknown[]) => void;

/**
 * Function for getting values from store. Usually from store crested by <code>createStore</code> from "src/storyUtils".
 */
export type StoreSelector = () => unknown;

/**
 * Extended {@link ArgType} of Storybook for more attributes, which are used for derivation post-processing args before they are received by component.
 * This allow create support functions and easy story writing.
 */
export type EnhancedArgType = Readonly<
    ArgType & {
        /**
         * Default value for arg.
         * Override original {@link ArgType.defaultValue}, which is deprecated: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#no-longer-inferring-default-values-of-args.
         * This value is extracted from argType object and is used in automatically created args object with similar key.
         */
        argValue?: unknown;
        /**
         * If it is set to true, it is active for arg  with similar post-processing key, which translate timestamp to Date.
         * It is temporary workaround for  https://github.com/storybookjs/storybook/issues/11822.
         */
        processDate?: boolean;
        /**
         * If it is set to true, it is active for arg  with similar post-processing key, which translate empty string to undefined.
         */
        processOptionalText?: boolean;
        /**
         * Callback, it is active for arg  with similar post-processing key, which is called with original callback, This allow to add additional behavior to components.
         */
        actionCallback?: ExtendedActionCallback;
        /**
         * Function for getting value for arg  with similar key. This function override settings vales by user. Usually is used with <code>createStore</code>.
         * This active post-processing, which give a value by calling this function.
         */
        processStoreValue?: StoreSelector;
        /**
         * The name of the prop for which the argTypes group representing the text select is created. Activates post-processing, which combines values from a given argTypes group into one for this prop.
         */
        processTextSelect?: string;
    }
>;

/**
 * Return type of helper function for splitting enhanced ArgTypes to args and ArgTypes.
 */
export type SplitArgs<A> = Readonly<{
    /**
     * Cleaned argsTypec, which can flow to Storybook.
     */
    filteredArgTypes?: Partial<Record<keyof A, ArgType>>;
    /**
     * Args generated by {@link EnhancedArgType.argValue}.
     */
    derivedArgs?: Partial<A>;
}>;

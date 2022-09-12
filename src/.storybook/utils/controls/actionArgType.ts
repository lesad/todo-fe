import type { MutableTypedObject, TypedObject } from "../../../types";
import { identity } from "../../../utils";
import { ControlCategory } from "../constants";
import type {
    ActionArgTypeOptions,
    ArgProcessor,
    ArgProcessorFactory,
    EnhancedArgType,
    ExtendedActionCallback,
    StoreArgTypeOptions,
    StoreSelector,
} from "./types";
import { createArgType } from "./utils";

/**
 * Create argType for action/callback. Set the category co "Action" (could be changed by options)
 * @param name Name, which is shown in section in control panel and in ArgsTable. If it not set up, prop name is used.
 * @param options Additional settings for control. Described in {@link ActionArgTypeOptions}.
 * @see https://storybook.js.org/docs/react/essentials/actions#action-argtype-annotation
 * @see createExtendedActionArgType
 */
export const createActionArgType = (name?: string, options?: ActionArgTypeOptions) => {
    const category = options?.category ?? ControlCategory.actions;
    const action = options?.action ?? "action";
    return {
        name,
        action,
        table: {
            category,
        },
        control: {
            disable: true,
        },
    };
};

/**
 *Create argType for action/callback and allow to call callback in each action run.
 *
 * It is necessary active processor {@link createExtendedActionProcessor}.
 *
 * @param name Name, which is shown in section in control panel and in ArgsTable.
 * @param callback Callback, is called when action is run. Parameters, which callbeck received, are set up in react component.
 * @param options Additional settings for control. Described in {@link ActionArgTypeOptions}.
 * @see createActionArgType
 * @see createExtendedActionProcessor
 * @see createStoreArgType
 */
export const createExtendedActionArgType = (
    name: string,
    callback: ExtendedActionCallback,
    options?: ActionArgTypeOptions,
): EnhancedArgType => ({
    ...createActionArgType(name, options),
    actionCallback: callback,
});

export const createExtendedActionProcessorFromArgTypes: ArgProcessorFactory = (argTypes) => {
    const extendedActionCallbacks = extractExtendedActionCallbacks(argTypes);
    return Object.entries(extendedActionCallbacks).length > 0 ? createExtendedActionProcessor(extendedActionCallbacks) : identity;
};

const extractExtendedActionCallbacks = (argTypes: TypedObject<EnhancedArgType>): TypedObject<ExtendedActionCallback> =>
    Object.entries(argTypes).reduce((result, [key, argType]) => {
        if (argType!.actionCallback) {
            // eslint-disable-next-line no-param-reassign
            result[key] = argType!.actionCallback;
        }
        return result;
    }, {} as MutableTypedObject<ExtendedActionCallback>);

/**
 * Create {@link ArgProcessor} for adding specific callbacks. Add to original callback added in args.
 *
 * @param extendedActionCallbacks Object with callbacks definitions.
 * @see createExtendedActionArgType
 */
export const createExtendedActionProcessor =
    (extendedActionCallbacks: TypedObject<ExtendedActionCallback>): ArgProcessor =>
    (args) => {
        const entries = Object.entries(extendedActionCallbacks);
        if (entries.length === 0) {
            return args;
        }

        const result = { ...args };
        entries.forEach(([propName, callback]) => {
            const originalCallback = result[propName];
            result[propName] = (...callbackArgs: unknown[]) => {
                callback!(...callbackArgs);
                if (typeof originalCallback === "function") {
                    originalCallback(...callbackArgs);
                }
            };
        });
        return result;
    };

/**
 * Create arType, which set up yours value from defined selector. Usually is used with <code>createStore</code> and {@link createExtendedActionArgType}.
 * ArgType is set up as disabled, because value is set from selector, not by user.
 *
 * It is necessary active processor {@link createStoreArgProcessor}.
 *
 * @param getStoreValue Function for getting value for specific arg.
 * @param options Additional settings for control.
 * @see createStoreArgProcessor
 * @see createExtendedActionArgType
 */
export const createStoreArgType = (getStoreValue: () => unknown, options?: StoreArgTypeOptions): EnhancedArgType => ({
    ...createArgType(undefined, undefined, { ...options, disabled: true }),
    processStoreValue: getStoreValue,
});

export const createStoreArgProcessorFromArgTypes: ArgProcessorFactory = (argTypes) => {
    const storeSelectors = extractStoreArgSelectors(argTypes);
    return Object.entries(storeSelectors).length > 0 ? createStoreArgProcessor(storeSelectors) : identity;
};

const extractStoreArgSelectors = (argTypes: TypedObject<EnhancedArgType>): TypedObject<StoreSelector> =>
    Object.entries(argTypes).reduce((result, [key, argType]) => {
        if (argType!.processStoreValue) {
            // eslint-disable-next-line no-param-reassign
            result[key] = argType!.processStoreValue;
        }
        return result;
    }, {} as MutableTypedObject<StoreSelector>);

/**
 * Create {@link ArgProcessor} for getting value from specific selectors.
 *
 * @param storeSelectors Object with selectors definitions.
 * @see createStoreArgType
 */
export const createStoreArgProcessor =
    (storeSelectors: TypedObject<StoreSelector>): ArgProcessor =>
    (args) => {
        const entries = Object.entries(storeSelectors);
        if (entries.length === 0) {
            return args;
        }

        const result = { ...args };
        entries.forEach(([key, storeSelector]) => {
            result[key] = storeSelector!();
        });

        return result;
    };

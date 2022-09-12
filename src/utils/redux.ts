import { createAction, PrepareAction } from "@reduxjs/toolkit";

import type { ReduxSerializable } from "src/types";

/**
 * Object with payload attribute, which is intended as part of redux actions.
 * @template P Type of action payload. Must be serializable, see {@link ReduxSerializable}.
 */
type WithPayload<P extends ReduxSerializable> = Readonly<{
    payload: P;
}>;

/**
 * Type of function for creation of {@link WithPayload}.
 * @template P Type of action payload. Must be serializable, see {@link ReduxSerializable}.
 */
type WithPayloadCreator<P extends ReduxSerializable> = (payload: P) => WithPayload<P>;

/**
 * Default prepare action function for {@link createAction}. Creates object with payload value filled from parameter.
 * @param payload Payload value.
 * @template P Type of action payload. Must be serializable, see {@link ReduxSerializable}.
 */
const preparePayloadAction = <P extends ReduxSerializable>(payload: P): WithPayload<P> => ({
    payload,
});

/**
 * Creates collection of createAction functions which use module name to automatically prefix action type.
 * @param moduleName Name of module. Must be unique for each module.
 */
export const createModuleActionCreators = <M extends string>(moduleName: M) =>
    ({
        /**
         * Creates action creator without payload.
         * @param actionType Type of action. Must be unique within given module. Is automatically prefixed with module name.
         * @see EmptyActionCreator
         */
        createEmptyAction: <T extends string>(actionType: T) => createAction(`${moduleName}/${actionType}`),
        /**
         * Creates action creator with payload as single parameter. Payload type is specified by generic.
         *
         * TypeScript cannot do partial inference (can infer all generics or all must be specified manually), so generics are split to two function,
         * so you can specify type of payload and type of type param can be inferred. This cause need to call second function after specifying action type.
         *
         * @example
         * const actionCreator = createPayloadAction("ACTION_TYPE")<PayloadType>();
         * const actionInstance = actionCreator(payload); // payload is type checked to be PayloadType
         * @see PayloadActionCreator
         */
        createPayloadAction:
            <T extends string>(actionType: T) =>
            <P extends ReduxSerializable>() =>
                createAction<WithPayloadCreator<P>, `${M}/${T}`>(`${moduleName}/${actionType}`, preparePayloadAction),
        /**
         * Creates action creator with custom content produced by prepareAction function.
         * @param actionType Type of action. Must be unique within given module. Is automatically prefixed with module name.
         * @param prepareAction Function which produces content of action. Identical to second parameter of {@link createAction}.
         * @see CustomActionCreator
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createCustomAction: <PA extends PrepareAction<any>, T extends string>(actionType: T, prepareAction: PA) =>
            createAction(`${moduleName}/${actionType}`, prepareAction),
    } as const);

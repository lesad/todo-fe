import type { EffectCallback } from "react";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, AppState, UniversalSelector } from "src/types";

/**
 * Alias for {@link useDispatch} which is typed according to store setup.
 * This allows to dispatch enhanced actions based on used middleware.
 *
 * @see https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Alias for {@link useSelector} which is typed with {@link AppState}.
 * It saves the need to type state every time.
 *
 * @see https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
 */
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

/**
 * Gets value from redux by specified selector. In comparison to {@link useAppSelector} supports parameters for selector
 * without need to write wrapping inline selector. Do not use this hook for selectors which does not need additional parameters.
 * @param selector Selector to use.
 * @param params Additional parameters passed to selector. State is passed automatically as first parameter.
 * @see useAppSelector
 * @template R Return type of selector.
 * @template P Type of additional parameters.
 * @example
 * const entity = useAppSelector((state) => getEntityById(state, id));
 * vs
 * const entity = useAppParamSelector(getEntityById, id);
 */
export const useAppParamSelector = <R, P extends unknown[]>(selector: UniversalSelector<R, P>, ...params: P): R =>
    useAppSelector((state) => selector(state, ...params));

/**
 * Hook, which simulates component did mount behavior. Works exactly same as useEffect with empty dependency array.
 *
 * This hook is defined for semantic purpose - to be evident that dependencies are empty on purpose and not by mistake.
 * This way eslint ignore of react-hooks/exhaustive-deps is kept here in one place and does not pollute component code.
 *
 * @param effect - Effect callback, which should be run only once.
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useComponentDidMount = (effect: EffectCallback) => useEffect(effect, []);

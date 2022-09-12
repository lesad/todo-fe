import type { GenericObject } from "src/types";

/**
 * Creates object to spread as props for element, which sets attribute for identification
 * in unit tests and ui tests. Creation of this attribute is encapsulated in this method, so it can be updated in one place.
 * This for example allows to produce test attributes only for certain environments.
 *
 * @param qa Identifier. Required uniqueness depends on specific component/element where it is used. Global uniqueness is not required.
 * @see QAProps
 * @see https://testing-library.com/docs/queries/bytestid
 * @example
 * import type { FC } from "react";
 *
 * import { createQAAttributes } from "src/utils";
 *
 * export const Component: FC = () => (
 *      <div {...createQAAttributes("special-div-1")} >
 *          ...
 *      </div>
 * );
 */
export const createQAAttributes = (qa?: string): GenericObject => (qa ? { "data-testid": qa } : {});

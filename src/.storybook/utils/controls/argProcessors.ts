import type { TypedObject } from "../../../types";
import { identity } from "../../../utils";
import { createExtendedActionProcessorFromArgTypes, createStoreArgProcessorFromArgTypes } from "./actionArgType";
import { createFixDatesProcessorFromArgTypes } from "./dateArgType";
import { createOptionalTextProcessorFromArgTypes } from "./optionalTextArgType";
import { createTextSelectProcessorFromArgTypes } from "./textSelectArgType";
import type { ArgProcessor, EnhancedArgType } from "./types";

/**
 * Create {@link ArgProcessor} composited from simple processors, which are necessary for extension existing argsTypes.
 *
 * @param argTypes component argTypes, from which the necessary processors are derived.
 */
export const composeProcessorsFromArgTypes = (argTypes?: TypedObject<EnhancedArgType>): ArgProcessor => {
    if (!argTypes) {
        return identity;
    }

    const fixDatesProcessor = createFixDatesProcessorFromArgTypes(argTypes);
    const optionalTextProcessor = createOptionalTextProcessorFromArgTypes(argTypes);
    const textSelectProcessor = createTextSelectProcessorFromArgTypes(argTypes);
    const extendedActionProcessor = createExtendedActionProcessorFromArgTypes(argTypes);
    const storeArgProcessor = createStoreArgProcessorFromArgTypes(argTypes);

    return (args) => fixDatesProcessor(optionalTextProcessor(textSelectProcessor(extendedActionProcessor(storeArgProcessor(args)))));
};

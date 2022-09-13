import { Category, createActionArgType, createEnumArgType, createSingleStoryExports, DISABLED_ARG_TYPE } from "../../.storybook/utils";
import { IconButton, IconCode } from "./IconButton";

enum HTMLButtonTypes {
    button = "button",
    submit = "submit",
}

const { defaultExport, storyExport } = createSingleStoryExports({
    categoryPath: [Category.genericComponents, Category.buttons],
    component: IconButton,
    argTypes: {
        icon: createEnumArgType("icon", IconCode, IconCode.plus),
        type: createEnumArgType("type", HTMLButtonTypes, HTMLButtonTypes.button),
        onClick: createActionArgType(),
        className: DISABLED_ARG_TYPE,
    },
});

export default defaultExport;
export const story = storyExport;

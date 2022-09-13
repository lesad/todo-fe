import { Category, createSingleStoryExports } from "../.storybook/utils";
import { Spinner } from "./Spinner";

const { defaultExport, storyExport } = createSingleStoryExports({
    categoryPath: [Category.genericComponents, Category.buttons],
    component: Spinner,
});

export default defaultExport;
export const story = storyExport;

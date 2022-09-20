// this story need access to store provider, which would require a complete rework of redux
import { Category, createSingleStoryExports } from "../.storybook/utils";
import { Footer } from "./Footer";

const { defaultExport, storyExport } = createSingleStoryExports({
    categoryPath: [Category.genericComponents, Category.layouts],
    component: Footer,
});

export default defaultExport;
export const story = storyExport;

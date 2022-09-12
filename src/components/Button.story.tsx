import { Category, createSingleStoryExports } from "../.storybook/utils";
import { Button } from "./Button";

const { defaultExport, storyExport } = createSingleStoryExports({
    categoryPath: [Category.genericComponents],
    component: Button,
});

export default defaultExport;
export const story = storyExport;

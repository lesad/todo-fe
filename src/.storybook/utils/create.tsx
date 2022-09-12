import type { Story } from "@storybook/react";
import type { ComponentType } from "react";

import { identity } from "../../utils";
import { CATEGORY_PATH_SEPARATOR } from "./constants";
import { type GenericArgs, composeProcessorsFromArgTypes, splitArgs } from "./controls";
import type {
    CategoryPath,
    ComponentExportInfo,
    ComponentExportParams,
    CreateMdxMetaParams,
    ExtendedMeta,
    SingleStoryParams,
    StoryExportParams,
} from "./types";

/**
 * Creates props for the Meta component from "@ storybook/addon-docs". Props contain settings for the correct creation of a documentation story.
 *
 * Story will have sort parameters set in the navigation bar. It will have the Canvas panel turned off and the Docs panel will be used.
 * The addon storybook-addon-themes in the toolbar will be turned off.
 *
 * @param categoryPath Path of the story category
 * @param storyName The name of the story
 * @param primary Flag whether this is the primary story within the category. Used for sorting. The default value is false.
 *
 * @example
 * import { Meta } from "@storybook/addon-docs";
 *
 * import { createMdxMetaProps, Category } from "src/storyUtils";
 *
 * export const props = createMdxMetaProps({ // in MDX variable could be created only when is exported (viz https://mdxjs.com/getting-started/#defining-variables-with-exports)
 *      name: "TestMDX",
 *      categoryPath: [Category.conventions],
 * });
 *
 * <Meta title={props.title} parameters={props.parameters} /> // MDX not supported spread operator, therefore parameters hve to be added separately
 */
export const createMdxMetaProps = ({ categoryPath, name, primary = false }: CreateMdxMetaParams) => ({
    title: createStoryTitle(categoryPath, name),
    parameters: {
        sort: {
            categoryPath,
            name,
            primary,
        },
        viewMode: "docs",
        previewTabs: {
            canvas: { hidden: true },
        },
        themes: [], // turn off storybook-addon-themes in toolbar for documentation story
    },
});

/**
 * Auxiliary function to create default export for story components. It also creates default arg processors that It can use as input for {@link createStoryExport}.
 *
 * Parameters are described in {@link ComponentExportParams}.
 *
 * @template A The type of args/props component for which the story is being created.
 * @see https://storybook.js.org/docs/react/api/csf#default-export
 * @see createSingleStoryExports
 * @see createStoryExport
 */
export const createComponentExport = <A extends GenericArgs>({
    id,
    name,
    categoryPath,
    component,
    decorators,
    args,
    argTypes,
    parameters,
    enableActionsTab,
    readme,
}: ComponentExportParams<A>): ComponentExportInfo<A> => {
    const storyName = getStoryName(component, name);
    const { derivedArgs, filteredArgTypes } = splitArgs<A>(argTypes);
    const argProcessor = composeProcessorsFromArgTypes(argTypes);
    const composedArgs = {
        ...derivedArgs,
        ...args,
    };
    const defaultExport: ExtendedMeta<A> = {
        id,
        title: createStoryTitle(categoryPath, storyName),
        component,
        decorators,
        // @ts-expect-error
        args: composedArgs,
        argTypes: filteredArgTypes,
        parameters: {
            viewMode: "story",
            sort: {
                categoryPath,
                name: storyName,
            },
            knobs: {
                disable: true,
            },
            actions: enableActionsTab ? undefined : { disable: true },
            docs: readme ? { page: readme } : undefined,
            ...parameters,
        },
    };
    return {
        defaultExport,
        argProcessor,
    };
};

/**
 * Create export for one story of specified component.
 * @param name Jméno story, které se zobrazuje v sidebaru. It does not affect the url - it determines the name of the exported constant.
 * @param name Story name, which is shown in sidebar.
 * @param Component Story component
 * @param options Additional settings
 * @see createComponentExport
 * @see createSingleStoryExports
 */
export const createStoryExport = <A extends GenericArgs>(
    name: string,
    Component: ComponentType<A>,
    options?: StoryExportParams,
): Story<A> => {
    const argProcessor = options?.argProcessor ?? identity;
    // @ts-expect-error generic typing for converting between args and props is too complicated to pay off - a challenge for hardcore TS typers;)
    const story: Story<A> = (args) => <Component {...argProcessor(args)} />;
    story.storyName = name;
    return story;
};

/**
 * Auxiliary function for creating exports for a single story component, which is the most common case. Joins {@link createComponentExport} and {@link createStoryExport} together.
 * @param params Parameters for creating a story.
 * @see createComponentExport
 * @eee createStoryExport
 */
export const createSingleStoryExports = <A extends GenericArgs>(
    params: SingleStoryParams<A>,
): { defaultExport: ExtendedMeta<A>; storyExport: Story<A> } => {
    const { name, component } = params;
    const { defaultExport, argProcessor } = createComponentExport(params);
    const storyName = getStoryName(component, name);
    return {
        defaultExport,
        storyExport: createStoryExport<A>(storyName, component, { argProcessor, ...params }),
    };
};

/**
 * Creates a title for a story based on the path of the story category and its title. The title in CSF format determines the location and title of the story.
 *
 * @param categoryPath Category path
 * @param storyName Story name
 */
export const createStoryTitle = (categoryPath: CategoryPath, storyName: string): string =>
    categoryPath.concat(storyName).join(CATEGORY_PATH_SEPARATOR);

/**
 * Gets the story name from the specified name, or from the component if the name is not specified.
 *
 * @param component The component from which the story name is derived.
 * @param name The name that has priority if specified.
 */
const getStoryName = <P,>(component: ComponentType<P>, name?: string): string => name || component.displayName || component.name;

/**
 * Predefined categories for stories.
 */
export enum Category {
    components = "Components",
    genericComponents = "Generic components",
    specificComponents = "Specific components",
    exampleComponent = "Example components",
    buttons = "Buttons",
    layouts = "Layouts",
    containers = "Connected components",
    core = "Core",
    docs = "Documentation",
    conventions = "Conventions",
    general = "General",
    react = "React",
    redux = "Redux",
    styles = "Styling",
    tests = "Testing",
    typeScript = "TypeScript",
    storybook = "Storybook",
    modules = "Modules",
    design = "Design",
    infrastructure = "Infrastructure",
    features = "Features",
}

/**
 * Predefined control categories/groups.
 */
export enum ControlCategory {
    others = "Others",
    props = "Props",
    actions = "Actions",
}

/**
 * Category path separator which is used for creating story titles from CategoryPath.
 * @see https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#grouping
 */
export const CATEGORY_PATH_SEPARATOR = "/";

import { Category, CATEGORY_PATH_SEPARATOR, CategoryPath, StorySortParams } from "../utils";

/** Defines order of root categories. */
const rootCategoryOrder: readonly string[] = [
    Category.general,
    Category.design,
    Category.genericComponents,
    Category.specificComponents,
    Category.conventions,
    Category.docs,
];

type StoryId = string;
type StoryItem = Readonly<{
    id: string;
    name: string;
}>;
type KindParameters = Readonly<{
    sort: StorySortParams;
    viewMode: "docs" | "story";
}>;

type GlobalParameters = Readonly<{
    // global parameters are currently not used for sorting
}>;

type StorySortParam = [StoryId, StoryItem, KindParameters, GlobalParameters];

export const categoryPathToCategory = (categoryPath: CategoryPath) => categoryPath.join(CATEGORY_PATH_SEPARATOR);

/**
 * Creates id for sorting which consists of categories and names. Also handles case when component story has more than
 * one story and thus component story name is used as last category.
 * @param storyItem Story info.
 * @param storyKind Story kind info.
 */
const createSortId = (storyItem: StoryItem, storyKind: KindParameters): string => {
    const { categoryPath, name } = storyKind.sort;
    const storyName = storyItem.name;
    if (storyKind.viewMode === "docs" || name === storyName) {
        return [...categoryPath, name].join();
    }
    return [...categoryPath, name, storyName].join();
};

/**
 * Creates category array for sorting purposes. Also handles case when component story has more than
 * one story and thus component story name is used as last category.
 * @param storyItem Story info.
 * @param storyKind Story kind info.
 */
const createCompleteCategoryPath = (storyItem: StoryItem, storyKind: KindParameters): CategoryPath => {
    const { categoryPath, name } = storyKind.sort;
    const storyName = storyItem.name;
    if (storyKind.viewMode === "docs" || name === storyName) {
        return categoryPath;
    }
    return [...categoryPath, name];
};

/**
 * Sorts stories.
 * Top ordering priority has order of root categories.
 * Second ordering priority is determined by primary flag of stories. Primary stories wont precede stories which are higher in hierarchy.
 * Last ordering priority is alphabetical sort.
 */
export const storySort = ([, storyItemA, kindParamsA]: StorySortParam, [, storyItemB, kindParamsB]: StorySortParam) => {
    const sortParamsA = kindParamsA.sort;
    const sortParamsB = kindParamsB.sort;
    const rootCategoryDistance =
        rootCategoryOrder.indexOf(sortParamsA.categoryPath[0]) - rootCategoryOrder.indexOf(sortParamsB.categoryPath[0]);
    if (rootCategoryDistance !== 0) {
        return rootCategoryDistance;
    }

    const categoryA = categoryPathToCategory(createCompleteCategoryPath(storyItemA, kindParamsA));
    const categoryB = categoryPathToCategory(createCompleteCategoryPath(storyItemB, kindParamsB));
    const subpathLength = Math.min(categoryA.length, categoryB.length);
    const categorySubpathA = categoryA.slice(0, subpathLength);
    const categorySubpathB = categoryB.slice(0, subpathLength);
    const categorySubpathDistance = categorySubpathA.localeCompare(categorySubpathB);

    const storyIdA = createSortId(storyItemA, kindParamsA);
    const storyIdB = createSortId(storyItemB, kindParamsB);
    const storyIdDistance = storyIdA.localeCompare(storyIdB);

    /* If sub paths are different then story ids are used to determine order */
    if (categorySubpathDistance !== 0) {
        return storyIdDistance;
    }
    /* If sub paths are the same then primary flag is taken into consideration.
     * Primary story is sorted before non primary of same category. Primary story always comes first when compared stories are deeper in hierarchy.
     */
    if (sortParamsA.primary && (categoryB.length > categoryA.length || (categoryA === categoryB && !sortParamsB.primary))) {
        return -1;
    }
    if (((!sortParamsA.primary && categoryA === categoryB) || categoryA.length > categoryB.length) && sortParamsB.primary) {
        return 1;
    }
    /* If sub paths are the same and primary flag is not able to decide then story ids are used to determine order */
    return storyIdDistance;
};

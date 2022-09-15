// actions taken directly from reducers to hijack effects
const query = "api/executeQeury/";
const mutation = "api/executeMutation/";

export const actions = {
    QUERY_PENDING: `${query}pending`,
    QUERY_FULFILLED: `${query}fulfilled`,
    MUTATION_PENDING: `${mutation}pending`,
    MUTATION_FULFILLED: `${mutation}fulfilled`,
    FILTER: "filter/filterOn",
};

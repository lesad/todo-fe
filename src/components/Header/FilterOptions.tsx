import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useSelector } from "react-redux";

import { selectIncompleteIds, useCompleteTodoMutation } from "../../redux/apiSlice";
import { Filter } from "../../redux/filterSlice";
import { FilterButton } from "./FilterButton";

const useCompleteAllTodos = () => {
    const [completeTodo] = useCompleteTodoMutation();
    const toComplete = useSelector(selectIncompleteIds);

    return async () => {
        if (!toComplete) return;
        const promises = toComplete.map((id) => completeTodo(id));
        await Promise.all(promises);
    };
};

export const FilterOptions: FC = () => {
    const completeAllTodos = useCompleteAllTodos();

    return (
        <section className="flex flex-row justify-between mx-2 my-3">
            <button type="button" className="hover:scale-125" onClick={completeAllTodos}>
                <FontAwesomeIcon icon={faAnglesDown} />
            </button>
            <FilterButton title={Filter.All} />
            <FilterButton title={Filter.Active} />
            <FilterButton title={Filter.Completed} />
        </section>
    );
};

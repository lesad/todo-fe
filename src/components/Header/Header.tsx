import type { FC } from "react";

import { AddTodo } from "./AddTodo";
import { FilterOptions } from "./FilterOptions";

export const Header: FC = () => (
    <header>
        <h1 className="text-3xl text-center font-bold">TODOS</h1>
        <AddTodo />
        <FilterOptions />
    </header>
);

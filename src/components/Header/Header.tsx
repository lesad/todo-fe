import type { FC } from "react";
import styled from "styled-components";

import { AddTodo } from "./AddTodo";
import { FilterOptions } from "./FilterOptions";

export const Header: FC = () => (
    <header>
        <StyledTitle className="text-3xl text-center font-bold">TODOS</StyledTitle>
        <AddTodo />
        <FilterOptions />
    </header>
);

const StyledTitle = styled.h1`
    font-size: 3rem;
    text-align: center;
`;

import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Filter, filterOn, selectFilter } from "../../redux/filterSlice";

interface FilterButtonProps {
    title: Filter;
}

export const FilterButton: FC<FilterButtonProps> = ({ title }) => {
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(filterOn(title));
        dispatch({ type: "FILTER_TODO" });
    };

    return (
        <StyledButton type="button" isActive={title === filter} onClick={handleClick}>
            {title}
        </StyledButton>
    );
};

interface StyledButtonProps {
    isActive: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    border: 2px solid black;
    border-radius: 99999px;
    padding: 0 1rem;

    &:hover {
        background-color: #faf59d;
    }

    background-color: ${({ isActive }) => isActive && "#f5ed5b"};
`;

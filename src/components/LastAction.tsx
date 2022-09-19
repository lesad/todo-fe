import type { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { actions as hijackedActions } from "../redux/actions";
import { selectLastAction } from "../redux/actionsSlice";
import { actions as loadingActions } from "./TodoList/actions";

const loading = [loadingActions.LOADING_STARTED, hijackedActions.QUERY_PENDING, hijackedActions.MUTATION_PENDING];
const loaded = [loadingActions.LOADING_FINISHED, hijackedActions.QUERY_FULFILLED, hijackedActions.MUTATION_FULFILLED];

const getStateColor = (action: string) => {
    if (loading.includes(action)) {
        return "FireBrick";
    }
    if (loaded.includes(action)) {
        return "Lime";
    }
    return "Gold";
};

export const LastAction: FC = () => {
    const lastAction = useSelector(selectLastAction);

    if (!lastAction) return null;
    return (
        <StyledSection>
            <StyledHeader color={getStateColor(lastAction)}>Last action:</StyledHeader>
            <span>{lastAction}</span>
        </StyledSection>
    );
};

const StyledSection = styled.section`
    border-top: 2px solid black;
    margin-top: 1rem;
    padding: 0 1rem;
`;

type StyledHeaderProps = {
    color: string;
};

const StyledHeader = styled.h4<StyledHeaderProps>`
    color: ${(props) => props.color};
`;

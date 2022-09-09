import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import styled from "styled-components";

export const Spinner: FC = () => (
    <StyledDiv>
        <StyledButton type="button" disabled>
            <StyledIcon icon={faSpinner} />
            Loading todos...
        </StyledButton>
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem 0;
`;

const StyledButton = styled.button`
    justify-items: center;
    border-radius: 9999px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    margin-right: 0.5rem;
    animation: spin 1s linear infinite;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

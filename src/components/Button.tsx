import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC, MouseEventHandler } from "react";
import styled from "styled-components";

export type ButtonProps = {
    type?: "submit" | "button";
    icon: IconDefinition;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
};

const noop = () => {};

export const Button: FC<ButtonProps> = ({ className = "", type = "button", icon, onClick = noop }) => (
    <StyledButton className={className} type={type} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
    </StyledButton>
);

const StyledButton = styled.button`
    border: 2px solid black;
    border-radius: 50%;
    aspect-ratio: 1/1;
    width: 2rem;
    text-align: center;
    justify-items: center;
`;

import { faAnglesDown, faPen, faPlus, faRemove, faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC, MouseEventHandler } from "react";
import styled from "styled-components";

// coppied from react-boilerplate, used to test storybook
export enum IconCode {
    remove = "faRemove",
    rename = "faPen",
    downArrows = "faAnglesDown",
    plus = "faPlus",
    spinner = "faSpinner",
}

const Icons: Readonly<Record<IconCode, IconDefinition>> = {
    [IconCode.remove]: faRemove,
    [IconCode.rename]: faPen,
    [IconCode.downArrows]: faAnglesDown,
    [IconCode.plus]: faPlus,
    [IconCode.spinner]: faSpinner,
};

export type IconButtonProps = {
    type?: "submit" | "button";
    icon: IconCode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
};

export const IconButton: FC<IconButtonProps> = ({ className, type, icon, onClick }) => (
    <StyledButton className={className} type={type} onClick={onClick}>
        <FontAwesomeIcon icon={Icons[icon]} />
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

IconButton.defaultProps = {
    type: "button",
    onClick: () => {},
    className: "",
};

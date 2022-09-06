import { useDispatch, useSelector } from "react-redux";

import { Filter, filterOn, selectFilter } from "../../redux/filterSlice";

interface FilterButtonProps {
    title: Filter;
}

const FilterButton = ({ title }: FilterButtonProps) => {
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();

    return (
        <button
            className={`border-black border-2 rounded-full px-2 hover:bg-blue-200 ${filter === title ? "bg-blue-100" : ""}`}
            onClick={() => dispatch(filterOn(title))}
        >
            {title}
        </button>
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

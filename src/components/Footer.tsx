import { useSelector } from "react-redux";

import { selectCompletedIds, useDeleteTodoMutation, useGetCompletedTodosQuery } from "../redux/apiSlice";

const useGetCompletedCount = () => {
    const { data: completedTodos } = useGetCompletedTodosQuery();
    return completedTodos?.length || 0;
};

const useDeleteCompletedTodos = () => {
    const [deleteTodo] = useDeleteTodoMutation();
    const toDelete = useSelector(selectCompletedIds);
    if (!toDelete) return;

    return async () => {
        for (const id of toDelete) {
            await deleteTodo(id);
        }
    };
};

const Footer = () => {
    const completedCount = useGetCompletedCount();
    const handleClick = useDeleteCompletedTodos();

    return completedCount ? (
        <footer className="flex flex-row justify-evenly border-t-2 border-black pt-2">
            <span>Completed: {completedCount}</span>
            <button className="border-2 border-black rounded-full hover:bg-red-200 px-2" onClick={handleClick}>
                Clear completed
            </button>
        </footer>
    ) : (
        <> </>
    );
};

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-top: 2px solid black;
    padding-top: 1rem;
`;

const StyledButton = styled.button`
    border: 2px solid black;
    border-radius: 9999px;
    padding: 0 1rem;
    &:hover {
        background-color: #f52c16;
    }
`;

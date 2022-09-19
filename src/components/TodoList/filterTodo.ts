import type { Filter } from "../../redux/filterSlice";
import type Todo from "../../types/todo";

export const filterTodos = (todos: Todo[], filter: Filter) => {
    switch (filter) {
        case "Active":
            return todos.filter((todo) => !todo.completed);
        case "Completed":
            return todos.filter((todo) => todo.completed);
        default: // All
            return todos;
    }
};

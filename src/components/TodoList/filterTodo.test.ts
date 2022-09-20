import { Filter } from "../../redux/filterSlice";
import type Todo from "../../types/todo";
import { filterTodos } from "./filterTodo";

describe("filterTodos", () => {
    const todos: Todo[] = [
        { id: "1", text: "todo 1", completed: false, createdDate: 123 },
        { id: "2", text: "todo 2", completed: true, createdDate: 123 },
        { id: "3", text: "todo 3", completed: false, createdDate: 123 },
    ];

    it("should return all todos when filter is all", () => {
        expect(filterTodos(todos, Filter.All)).toEqual(todos);
    });

    it("should return only completed todos when filter is completed", () => {
        expect(filterTodos(todos, Filter.Completed)).toEqual([todos[1]]);
    });

    it("should return only active todos when filter is active", () => {
        expect(filterTodos(todos, Filter.Active)).toEqual([todos[0], todos[2]]);
    });
});

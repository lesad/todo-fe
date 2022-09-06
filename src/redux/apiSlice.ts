import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Todo from "../types/todo";
import { RootState } from "./store";

const api = createApi({
    tagTypes: ["Todos"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "/tasks",
            transformResponse: (res: Todo[]) =>
                // Newest comes last
                res.sort((a, b) => a.createdDate - b.createdDate),
            providesTags: ["Todos"],
        }),

        addTodo: builder.mutation<Todo, string>({
            query: (text) => ({
                url: "/tasks",
                method: "POST",
                body: { text },
            }),
            async onQueryStarted(text, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const newTodo: Todo = {
                            id: "",
                            text,
                            completed: false,
                            createdDate: 0,
                        };
                        draft.push(newTodo);
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    postResult.undo();
                }
            },
            invalidatesTags: ["Todos"],
        }),

        getCompletedTodos: builder.query<Todo[], void>({
            query: () => "/tasks/completed",
            providesTags: ["Todos"],
        }),

        updateTodo: builder.mutation<Todo[], { id: string; text: string }>({
            query: ({ id, text }) => ({
                url: `/tasks/${id}`,
                method: "POST",
                body: { text },
            }),
            async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const foundTodo = draft.find((todo) => todo.id === id);
                        if (foundTodo) foundTodo.text = text;
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    postResult.undo();
                }
            },
            invalidatesTags: ["Todos"],
        }),

        deleteTodo: builder.mutation<Todo[], string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const foundIndex = draft.findIndex((todo) => todo.id === id);
                        if (foundIndex != -1) draft.splice(foundIndex, 1);
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    postResult.undo();
                }
            },
            invalidatesTags: ["Todos"],
        }),

        completeTodo: builder.mutation<Todo[], string>({
            query: (id) => ({
                url: `/tasks/${id}/complete`,
                method: "POST",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const foundTodo = draft.find((todo) => todo.id === id);
                        if (foundTodo) foundTodo.completed = true;
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    postResult.undo();
                }
            },
            invalidatesTags: ["Todos"],
        }),

        incompleteTodo: builder.mutation<Todo[], string>({
            query: (id) => ({
                url: `/tasks/${id}/incomplete`,
                method: "POST",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const foundTodo = draft.find((todo) => todo.id === id);
                        if (foundTodo) foundTodo.completed = false;
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    postResult.undo();
                }
            },
            invalidatesTags: ["Todos"],
        }),
    }),
});

export const selectCompletedIds = (state: RootState) =>
    api.endpoints.getCompletedTodos
        .select()(state)
        .data?.map((todo) => todo.id);

export const selectIncompleteIds = (state: RootState) =>
    api.endpoints.getTodos
        .select()(state)
        .data?.filter((todo) => !todo.completed)
        .map((todo) => todo.id);

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useGetCompletedTodosQuery,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useCompleteTodoMutation,
    useIncompleteTodoMutation,
} = api;

export default api;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ITodo from '../models/todo.model';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => '/tasks',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodo: builder.mutation<ITodo, string>({
      query: (text) => ({
        url: '/tasks',
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    getCompletedTodos: builder.query<ITodo[], void>({
      query: () => '/tasks/completed',
      providesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<ITodo[], { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/tasks/${id}`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: (_, __, todo) => [{ type: 'Todos', id: todo.id }],
    }),
    deleteTodo: builder.mutation<ITodo[], string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Todos', id }],
    }),
    completeTodo: builder.mutation<ITodo[], string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Todos', id }],
    }),
    incompleteTodo: builder.mutation<ITodo[], string>({
      query: (id) => ({
        url: `/tasks/${id}/incomplete`,
        method: 'POST',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Todos', id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useGetCompletedTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useIncompleteTodoMutation,
} = apiSlice;

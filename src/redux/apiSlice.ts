import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ITodo from '../models/todo.model';

const api = createApi({
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => '/tasks',
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation<ITodo, string>({
      query: (text) => ({
        url: '/tasks',
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Todos'],
    }),
    getCompletedTodos: builder.query<ITodo[], void>({
      query: () => '/tasks/completed',
      providesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<ITodo[], Partial<ITodo>>({
      query: ({ id, text }) => ({
        url: `/tasks/${id}`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<ITodo[], string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
    completeTodo: builder.mutation<ITodo[], string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: ['Todos'],
    }),
    incompleteTodo: builder.mutation<ITodo[], string>({
      query: (id) => ({
        url: `/tasks/${id}/incomplete`,
        method: 'POST',
      }),
      invalidatesTags: ['Todos'],
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
} = api;

export default api;

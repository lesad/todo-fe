import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ITodo from '../models/todo.model';
import { RootState } from './store';

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

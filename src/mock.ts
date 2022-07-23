import ITodo from "./models/todo.model";

export default function useGetTodos(): ITodo[] {
  return [
    {
      id: 'VasFEeR8_ZHHEbKL6B-OIu',
      text: 'Vytvořit prezantaci',
      completed: false,
      createdDate: 1501594393387,
    },
    {
      id: 'ADSFaEKG_Z2IISFNse-mMM',
      text: 'Dokončit dokumentaci',
      completed: false,
      createdDate: 1501594393387,
    },
    {
      id: 'V1StGXR8_Z5jdHi6B-myT',
      text: 'Udělat API',
      completed: true,
      createdDate: 1501594393387,
      completedDate: 1643205131975,
    },
    {
      id: 'V1StGXR8_Z5jdHi6B-myr',
      text: 'Very long long long long long long long long long long',
      completed: true,
      createdDate: 1501594393387,
      completedDate: 1643205131975,
    },
  ];
}

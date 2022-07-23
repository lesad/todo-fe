interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
}

export default ITodo;

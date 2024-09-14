import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  userId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const updatedTodo = action.payload;
      const existingTodo = state.todos.find(
        (todo) => todo.id === updatedTodo.id
      );
      if (existingTodo) {
        Object.assign(existingTodo, updatedTodo);
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  setTodos,
} from "../features/todo/todoSlice";
import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "../services/todoService";
import { useAuth } from "./useAuth";
import { Todo } from "../types";

export const useTodo = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userId = user?.email || "";
  console.log(userId);

  const todos = useSelector((state: RootState) =>
    state.todo.todos.filter((todo) => todo.userId === userId)
  );

  const loadTodosForUser = () => {
    const userTodos = getTodosFromLocalStorage(userId);
    dispatch(setTodos(userTodos));
  };

  const addNewTodo = (title: string, description: string) => {
    const startDate = new Date().toISOString().split("T")[0];
    const newTodo: Todo = {
      id: Date.now(),
      userId,
      title,
      description,
      startDate,
      endDate: "",
      completed: false,
    };
    dispatch(addTodo(newTodo));
    saveTodosToLocalStorage(userId, [...todos, newTodo]);
  };

  const updateExistingTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
    saveTodosToLocalStorage(
      userId,
      todos.map((t) => (t.id === todo.id ? todo : t))
    );
  };

  const toggleTodoCompletion = (todo: Todo) => {
    const endDate = todo.completed
      ? ""
      : new Date().toISOString().split("T")[0];
    const updatedTodo = { ...todo, completed: !todo.completed, endDate };
    updateExistingTodo(updatedTodo);
  };

  const deleteExistingTodo = (id: number) => {
    dispatch(deleteTodo(id));
    saveTodosToLocalStorage(
      userId,
      todos.filter((todo) => todo.id !== id)
    );
  };

  return {
    todos,
    loadTodosForUser,
    addNewTodo,
    updateExistingTodo,
    toggleTodoCompletion,
    deleteExistingTodo,
  };
};

// src/services/todoService.ts

interface Todo {
  id: number;
  userId: string; // Email used as a unique identifier
  title: string;
  description: string;
  startDate: string; // New field
  endDate: string; // New field
  completed: boolean; // New field
}

// Get todos specific to a user from local storage
export const getTodosFromLocalStorage = (userId: string): Todo[] => {
  const todos = localStorage.getItem(`todos_${userId}`);
  return todos ? JSON.parse(todos) : [];
};

// Save todos specific to a user in local storage
export const saveTodosToLocalStorage = (userId: string, todos: Todo[]) => {
  localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
};

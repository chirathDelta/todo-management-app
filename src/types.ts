// src/types.ts

export interface Todo {
  id: number;
  userId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

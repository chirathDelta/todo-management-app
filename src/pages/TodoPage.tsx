import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../hooks/useTodo";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "../components/ui/dialog";
import { Todo } from "../types";
import { AiOutlineCalendar, AiOutlineCheckCircle } from "react-icons/ai";

const TodoPage = () => {
  const {
    todos,
    addNewTodo,
    updateExistingTodo,
    toggleTodoCompletion,
    deleteExistingTodo,
    loadTodosForUser,
  } = useTodo();

  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddOrUpdateTodo = (data: {
    title: string;
    description: string;
  }) => {
    if (editingTodo) {
      updateExistingTodo({ ...editingTodo, ...data });
    } else {
      addNewTodo(data.title, data.description);
    }
    setIsDialogOpen(false);
    setEditingTodo(null);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsDialogOpen(true);
  };

  const handleOpenAddTodoDialog = () => {
    setEditingTodo(null);
    setIsDialogOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  useEffect(() => {
    loadTodosForUser();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-950 min-h-screen text-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-100">Todo List</h2>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Logout
        </Button>
      </div>

      {/* Button to open dialog for adding a new todo */}
      <div className="text-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleOpenAddTodoDialog}
              variant="default"
              className="px-6 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300"
            >
              Add New Todo
            </Button>
          </DialogTrigger>

          {/* Dialog for Adding/Editing Todo */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTodo ? "Edit Todo" : "Add New Todo"}
              </DialogTitle>
            </DialogHeader>
            <TodoForm
              onSubmit={handleAddOrUpdateTodo}
              defaultValues={editingTodo || undefined}
            />
            <DialogClose asChild>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`relative flex flex-col justify-between p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
              todo.completed
                ? "bg-gray-900 border-green-500"
                : "bg-gray-900 border-gray-600"
            }`}
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                {todo.title}
              </h3>
              <p className="text-gray-300 mb-4">{todo.description}</p>
              <div className="text-sm text-gray-400 mb-4 space-y-2">
                <div className="flex items-center">
                  <AiOutlineCalendar className="h-5 w-5 text-gray-400 mr-2" />
                  <p>
                    <span className="font-medium text-gray-300">Start:</span>{" "}
                    {todo.startDate}
                  </p>
                </div>
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <p>
                    <span className="font-medium text-gray-300">End:</span>{" "}
                    {todo.endDate || "Not completed"}
                  </p>
                </div>
                <p
                  className={`font-semibold ${
                    todo.completed ? "text-green-400" : "text-red-400"
                  }`}
                >
                  Status: {todo.completed ? "Completed" : "Incomplete"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button
                onClick={() => handleEditTodo(todo)}
                variant="secondary"
                className="w-full bg-gray-600 text-gray-200 hover:bg-gray-500"
              >
                Edit
              </Button>
              <Button
                onClick={() => toggleTodoCompletion(todo)}
                variant="outline"
                className={`w-full border bg-gray-600 ${
                  todo.completed
                    ? "border-red-500 text-gray-300"
                    : "border-green-400 text-gray-200"
                } hover:bg-gray-800 hover:text-gray-100`}
              >
                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
              </Button>
              <Button
                onClick={() => deleteExistingTodo(todo.id)}
                variant="destructive"
                className="w-full bg-gray-600 text-gray-200 hover:bg-gray-500"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;

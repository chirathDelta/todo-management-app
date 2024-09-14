import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});

interface TodoFormProps {
  onSubmit: (data: { title: string; description: string }) => void;
  defaultValues?: { title: string; description: string };
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, defaultValues }) => {
  const formMethods = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: defaultValues || { title: "", description: "" },
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="title"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default TodoForm;

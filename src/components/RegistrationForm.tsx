import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const registrationSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface RegistrationFormProps {
  onSubmit: (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof registrationSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg">
          Register
        </Button>
      </form>
    </Form>
  );
}

export default RegistrationForm;

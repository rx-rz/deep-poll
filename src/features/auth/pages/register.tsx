import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "../api/use-register";
import { LoadingStateText } from "@/components/loading-state-text";
import { Link } from "wouter";
import { routes } from "@/routes";

export const RegisterPage = () => {
  const { form, handleSubmit, loading } = useRegister();
  return (
    <div className="max-w-lg mx-auto mt-16">
      <p className="text-2xl my-12">Register</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">
            {loading ? <LoadingStateText text="Loading" /> : "Submit"}
          </Button>
        </form>
      </Form>
      <p className="text-center mt-2">
        Already have an account? Please{" "}
        <Link
          href={routes.LOGIN}
          className="text-primary hover:underline underline-offset-2"
        >
          login.
        </Link>
      </p>
    </div>
  );
};

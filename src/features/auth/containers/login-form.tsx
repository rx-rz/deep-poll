import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "../api/use-login";
import { LoadingStateText } from "@/components/loading-state-text";
import { Link } from "wouter";
import { routes } from "@/routes";

export const LoginForm = () => {
  const { form, handleSubmit, loading } = useLogin();
  return (
    <div className="max-w-lg w-8/12 mx-auto mt-16">
      <p className="text-3xl font-medium my-12">Sign In</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-input p-5 focus:bg-transparent"
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
                    className="bg-input p-5 focus:bg-transparent"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full p-6 mt-2">
            {loading ? <LoadingStateText text="Loading" /> : "Sign in"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm mt-2">
        Do not have an account? Please{" "}
        <Link
          href={routes.REGISTER}
          className="text-primary hover:underline underline-offset-2"
        >
          register.
        </Link>
      </p>
    </div>
  );
};

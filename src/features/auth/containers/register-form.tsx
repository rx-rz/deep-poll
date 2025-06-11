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

export const RegisterForm = () => {
  const { form, handleSubmit, loading } = useRegister();
  return (
    <div className="max-w-lg w-8/12 mx-auto mt-16">
      <p className="text-3xl font-medium my-12">Register</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-input mt-1 p-5 focus:bg-transparent"
                  />
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
                <FormLabel>Create a Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="p-5 bg-input focus:bg-transparent"
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
                <FormLabel>Create a Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="p-5 bg-input focus:bg-transparent"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full p-6 mt-2  drop-shadow-xl">
            {loading ? <LoadingStateText text="Loading" /> : "Get Started"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm mt-2">
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

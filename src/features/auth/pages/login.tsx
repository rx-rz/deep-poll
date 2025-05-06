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

export const LoginPage = () => {
  const { form, handleSubmit, loading } = useLogin();
  return (
    <div className="max-w-lg mx-auto mt-16">
      <p className="text-2xl my-12">Login</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="border" {...field} />
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
                    placeholder="Minimum of 8 characters"
                    {...field}
                  />
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
      <p className="text-center mt-2">Do not have an account? Please <Link href={routes.REGISTER} className="text-primary hover:underline underline-offset-2">register.</Link></p>
    </div>
  );
};

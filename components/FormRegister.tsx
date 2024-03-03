"use client";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import FormSuccess from "./NotifSuccess";
import FormError from "./FormError";
import { register } from "@/actions/register";
function FormRegister() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(data).then((res) => {
        setSuccess(res.success!);
        setError(res.error!);
        form.reset();
      });
    });
  };

  return (
    <CardWrapper
      labelHeader="Register"
      social={true}
      labelHref="Already have an account"
      linkHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="Johndoe@example.com"
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
                      disabled={isPending}
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default FormRegister;

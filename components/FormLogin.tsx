"use client";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
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
import { login } from "@/actions/login";
import Link from "next/link";
function FormLogin() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" &&
    "Email already linked to another account";

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      login(data).then((res: any) => {
        setSuccess(res.success!);
        setError(res.error!);
        form.reset();
      });
    });
  };

  return (
    <CardWrapper
      labelHeader="Welcome back"
      social={true}
      labelHref="Dont have an account"
      linkHref="/auth/register"
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
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/forgot">Forgot Password</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default FormLogin;

"use client";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import { useState, useTransition } from "react";
import { redirect, useSearchParams } from "next/navigation";
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
import { newPassword } from "@/actions/new-password";

function NewResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(data, token!).then((res) => {
        setError(res.error!);
        setSuccess(res.success!);
      });
    });
  };

  if (!token) {
    return redirect("/auth/login");
  }

  return (
    <CardWrapper
      labelHeader="Enter a new password"
      labelHref="Back to login"
      linkHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4 ">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="Password"
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
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default NewResetForm;

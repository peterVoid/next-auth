"use client";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPassword } from "@/schemas";
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
import { Reset } from "@/actions/reset";
function FormForgot() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof ResetPassword>>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof ResetPassword>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      Reset(data).then((res) => {
        setError(res.error!);
        setSuccess(res.success!);
      });
    });
  };

  return (
    <CardWrapper
      labelHeader="Forgot Password"
      labelHref="Back to login"
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

export default FormForgot;

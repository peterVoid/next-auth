"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import CardWrapper from "./CardWrapper";
import { newVerification } from "@/actions/new-verification";
import NotifSuccess from "@/components/NotifSuccess";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/NotifSuccess";
function VerifForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Something went wrong");
      return;
    }
    newVerification(token).then((res) => {
      setSuccess(res.success!);
      setError(res.error!);
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      labelHeader="Verify"
      linkHref="/auth/login"
      labelHref="back to login"
    >
      <div className="flex items-center justify-center w-full">
        <BeatLoader />
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}

export default VerifForm;

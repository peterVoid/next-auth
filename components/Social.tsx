import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
function Social() {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() =>
          signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          })
        }
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() =>
          signIn("github", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          })
        }
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default Social;

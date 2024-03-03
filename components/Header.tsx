import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

function Header({ label }: { label: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2">
      <h1 className={cn("text-3xl font-bold", font.className)}>🔐Auth</h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

export default Header;

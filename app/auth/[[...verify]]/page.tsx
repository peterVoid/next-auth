import VerifForm from "@/components/VerifForm";
import { useSearchParams } from "next/navigation";

function page() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-600 to-purple-600">
      <VerifForm />
    </div>
  );
}

export default page;

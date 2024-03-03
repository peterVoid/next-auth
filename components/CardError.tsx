import { BsExclamationTriangle } from "react-icons/bs";
import CardWrapper from "./CardWrapper";

function CardError() {
  return (
    <CardWrapper
      labelHeader="Something went wrong"
      labelHref="Back to home"
      linkHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        <BsExclamationTriangle />
      </div>
    </CardWrapper>
  );
}

export default CardError;

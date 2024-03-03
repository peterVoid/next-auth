import FooterFormAuth from "./FooterFormAuth";
import Header from "./Header";
import Social from "./Social";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface PropsCard {
  children: React.ReactNode;
  labelHeader: string;
  social?: boolean;
  labelHref: string;
  linkHref: string;
}

function CardWrapper({
  children,
  labelHeader,
  social,
  labelHref,
  linkHref,
}: PropsCard) {
  return (
    <Card className="w-[400px] shadow-xl space-y-4">
      <CardHeader>
        <Header label={labelHeader} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {social && <Social />}
      <CardFooter>
        <FooterFormAuth labelHref={labelHref} linkHref={linkHref} />
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;

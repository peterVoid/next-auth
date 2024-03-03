import Link from "next/link";

interface Props {
  labelHref: string;
  linkHref: string;
}
function FooterFormAuth({ labelHref, linkHref }: Props) {
  return (
    <div className="flex items-center justify-center  w-full">
      <Link href={linkHref}>
        <p>{labelHref}</p>
      </Link>
    </div>
  );
}

export default FooterFormAuth;

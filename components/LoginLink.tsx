import { Link, LogIn } from "lucide-react";

function LoginLink() {
  return (
    <>
      <p className="pt-8 text-center font-poppins text-lg">You are not login</p>
      <div className="flex items-center justify-center gap-2 text-primary">
        <LogIn size={16} />
        <Link
          href="/api/auth/signin?callbackUrl=/library"
          className="font-barlow hover:underline"
        >
          click here to login
        </Link>
      </div>
    </>
  );
}

export default LoginLink;

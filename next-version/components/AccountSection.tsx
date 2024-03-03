import Link from 'next/link';
import { getServerSession } from "next-auth";
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function AccountSection() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
          
    </>
  );
}
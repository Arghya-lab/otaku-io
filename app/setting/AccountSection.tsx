"use client";

import { LogIn, LogOut, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function AccountSection() {
  const { data: session, status } = useSession();

  return (
    <section className="flex flex-col gap-2 border-b border-zinc-500 pb-16 pt-6">
      <h3 className="pb-6 text-xl">Account</h3>
      <div className="xs:pl-12">
        {status === "loading" ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-2/5 rounded-md" />
            <Skeleton className="h-10 w-2/5 rounded-md" />
          </div>
        ) : status === "authenticated" ? (
          <>
            <p className="flex items-center gap-2 pb-3">
              <User size={24} />
              {session?.user?.name}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Mail size={16} />
              {session?.user?.email}
            </p>
            <Link
              href="/api/auth/signout?callbackUrl=/setting"
              className="flex items-center gap-2 font-barlow text-destructive hover:underline"
            >
              <LogOut size={16} />
              Logout
            </Link>
          </>
        ) : (
          <div>
            <p>Connect your account for save your preferences in cloud.</p>
            <div className="flex items-center gap-2">
              <LogIn size={16} className="text-destructive" />
              <Link
                href="/api/auth/signin?callbackUrl=/setting"
                className="font-barlow text-destructive hover:underline"
              >
                login
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AccountSection;

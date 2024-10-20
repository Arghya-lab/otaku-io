"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogIn, LogOut, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function AccountSection() {
  const { data: session, status } = useSession();

  return (
    <section className="flex flex-col gap-2 border-b border-zinc-500 pb-16 pt-6">
      <h3 className="pb-6 text-xl">Account</h3>
      <div className="xs:pl-12">
        {status === "loading" ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-10 w-2/5" />
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
            <Button variant="link" className="px-0 font-poppins" asChild>
              <Link href="/api/auth/signout?callbackUrl=/setting">
                <LogOut size={16} /> Logout
              </Link>
            </Button>
          </>
        ) : (
          <div>
            <p>Connect your account for save your preferences in cloud.</p>
            <Button variant="link" className="px-0 font-poppins" asChild>
              <Link href="/api/auth/signin?callbackUrl=/setting">
                <LogIn size={16} /> login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default AccountSection;

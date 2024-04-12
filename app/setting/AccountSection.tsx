"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import { LogIn, LogOut, Mail, User } from "lucide-react";
import { themes } from "@/theme";
import { usePreference } from "@/components/providers/PreferenceProvider";
import chroma from "chroma-js";

function AccountSection() {
  const { data: session, status } = useSession();
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <section className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
      <h3 className="text-xl pb-6" style={{ color: theme.textColor }}>
        Account
      </h3>
      <div className="xs:pl-12">
        {status === "loading" ? (
          <div className="flex flex-col gap-2">
            <Skeleton
              className="h-5 w-2/5 rounded-md"
              baseColor={chroma(theme.primaryColor).darken(1).toString()}
              highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
            />
            <Skeleton
              className="h-10 w-2/5 rounded-md"
              baseColor={chroma(theme.primaryColor).darken(1).toString()}
              highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
            />
          </div>
        ) : status === "authenticated" ? (
          <>
            <p className="flex items-center gap-2 pb-3">
              <User size={24} />
              {session?.user?.name}
            </p>
            <p className="text-sm flex items-center gap-2">
              <Mail size={16} />
              {session?.user?.email}
            </p>
            <Link
              href="/api/auth/signout?callbackUrl=/setting"
              className="hover:underline font-nunito flex items-center gap-2"
              style={{ color: theme.secondaryColor }}>
              <LogOut size={16} />
              Logout
            </Link>
          </>
        ) : (
          <div>
            <p>Connect your account for save your preferences in cloud.</p>
            <div className="flex items-center gap-2">
              <LogIn size={16} style={{ color: theme.secondaryColor }} />
              <Link
                href="/api/auth/signin?callbackUrl=/setting"
                className="hover:underline font-nunito"
                style={{ color: theme.secondaryColor }}>
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

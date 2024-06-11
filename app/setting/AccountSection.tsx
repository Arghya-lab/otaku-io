"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import chroma from "chroma-js";
import { LogIn, LogOut, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function AccountSection() {
  const { data: session, status } = useSession();
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <section className="flex flex-col gap-2 border-b border-zinc-500 pb-16 pt-6">
      <h3 className="pb-6 text-xl" style={{ color: theme.textColor }}>
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
            <p className="flex items-center gap-2 text-sm">
              <Mail size={16} />
              {session?.user?.email}
            </p>
            <Link
              href="/api/auth/signout?callbackUrl=/setting"
              className="flex items-center gap-2 font-nunito hover:underline"
              style={{ color: theme.secondaryColor }}
            >
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
                className="font-nunito hover:underline"
                style={{ color: theme.secondaryColor }}
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

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import { LogIn, LogOut, Mail, User } from "lucide-react";
import { themes } from "@/theme";
import { usePreference } from "@/components/PreferenceProvider";

function AccountSection() {
  const { data: session, status } = useSession();
  const { themeId } = usePreference();
  const theme = themes[themeId];

  return (
    <div className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
      <p className="text-xl text-black dark:text-white pb-6">Account</p>
      <div>
        {status === "loading" ? (
          <div className="flex flex-col gap-2">
            <Skeleton
              className="h-5 w-2/5 rounded-md"
              baseColor={theme.type === "dark" ? "#111" : "#ddd"}
              highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
            />
            <Skeleton
              className="h-10 w-2/5 rounded-md"
              baseColor={theme.type === "dark" ? "#111" : "#ddd"}
              highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
            />
          </div>
        ) : status === "authenticated" ? (
          <div>
            <p className="text-neutral-800 dark:text-slate-200 flex items-center gap-2 pb-3">
              <User size={24} />
              {session?.user?.name}
            </p>
            <p className="text-neutral-700 dark:text-slate-300 text-sm flex items-center gap-2">
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
          </div>
        ) : (
          <div>
            <p className="text-neutral-700 dark:text-slate-300">
              Connect your account for save your preferences in cloud.
            </p>
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
    </div>
  );
}

export default AccountSection;

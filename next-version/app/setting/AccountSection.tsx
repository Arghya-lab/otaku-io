import { LogIn, LogOut, Mail, User } from "lucide-react";
import { themeTypes } from "@/theme";

function AccountSection() {

  const theme = themeTypes[1]

  return (
    <div className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
      <p className="text-xl text-black dark:text-white pb-6">Account</p>
      <div>
        {!status ? (
          <div>
            <p className="text-neutral-700 dark:text-slate-300">
              Connect your account for save your preferences in cloud.
            </p>
            <div className="flex items-center gap-2">
              <LogIn size={16} style={{ color: theme.secondaryColor }} />
              <div>
                <button
                  className="hover:underline font-nunito"
                  style={{ color: theme.secondaryColor }}
                  onClick={() =>
                    navigate("/login", {
                      state: { from: location },
                      replace: true,
                    })
                  }>
                  login
                </button>
                <span className="text-gray-950 dark:text-slate-100 text-sm">
                  &nbsp;or&nbsp;
                </span>
                <button
                  className="hover:underline font-nunito"
                  style={{ color: theme.secondaryColor }}
                  onClick={() =>
                    navigate("/signup", {
                      state: { from: location },
                      replace: true,
                    })
                  }>
                  signup
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-neutral-800 dark:text-slate-200 flex items-center gap-2 pb-3">
              <User size={24} />
              {userData?.name}
            </p>
            <p className="text-neutral-700 dark:text-slate-300 text-sm flex items-center gap-2">
              <Mail size={16} />
              {userData?.email}
            </p>
            <button
              className="hover:underline font-nunito flex items-center gap-2"
              style={{ color: theme.secondaryColor }}
              onClick={() => dispatch(logout())}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountSection;
"use client";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <>
      <h2
        className="font-poppins text-lg text-center pt-16"
        style={{ color: theme.textColor }}>
        Something went wrong!
      </h2>
      <p
        className="font-poppins text-base text-center pt-4"
        style={{ color: theme.textColor }}>
        {error.message}
      </p>
      <div className="font-nunito flex justify-center pt-4">
        <button style={{ color: theme.secondaryColor }} onClick={() => reset()}>
          Try again
        </button>
      </div>
    </>
  );
}

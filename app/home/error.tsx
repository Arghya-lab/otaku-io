"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <h2 className="pt-16 text-center font-poppins text-lg">
        Something went wrong!
      </h2>
      <p className="text-md pt-4 text-center font-poppins">{error.message}</p>
      <div className="flex justify-center pt-4 font-barlow">
        <button className="text-accent" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </>
  );
}

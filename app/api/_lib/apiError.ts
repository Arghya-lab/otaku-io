import { NextResponse } from "next/server";

export default function apiError(option?: {
  errorMessage?: string;
  status?: number;
}) {
  const errorMessage = option?.errorMessage || "Internal server error.";
  const status = option?.status || 500;

  return NextResponse.json(
    { message: errorMessage, success: false },
    { status }
  );
}

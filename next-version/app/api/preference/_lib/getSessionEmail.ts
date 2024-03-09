import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function getSessionEmail() {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      throw NextResponse.json(
        { error: "You are not authorized to perform action." },
        { status: 400 }
      );
    }

    return userEmail;
  } catch (error) {
    throw NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}

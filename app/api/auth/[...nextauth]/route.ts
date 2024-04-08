import NextAuth from "next-auth";
import { options } from "./options";
import connectDB from "@/db/db";

connectDB();
const handler = NextAuth(options);

export { handler as GET, handler as POST };

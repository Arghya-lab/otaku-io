import connectDB from "@/db/db";
import NextAuth from "next-auth";
import { options } from "./options";

connectDB();
const handler = NextAuth(options);

export { handler as GET, handler as POST };

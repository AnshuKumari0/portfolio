import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Account, User as AuthUser } from "next-auth";
import { dbConnect } from "@/utils/db";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        await dbConnect;
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      redirectUri: process.env.NEXTAUTH_URI + "/api/auth/callback/github",
    } as any),
  ],

  callbacks: {
    // async signIn({ user, account }: { user: AuthUser; account: Account }) {
    async signIn(params: { user: any; account: Account | null }) {
      const { user, account } = params;
      if (account?.provider == "credentials") {
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        //   expiresIn: "1h",
        // });

        // return token;
        return true;
      }
      if (account?.provider == "github") {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
      return Promise.resolve(true);
    },
  },
};

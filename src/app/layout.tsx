import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AuthProvider from "./components/AuthProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "portfolio",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className}`}>
        <AuthProvider session={session}>
          <div className="relative z-0">
            {/* <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Navbar />
            </div> */}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

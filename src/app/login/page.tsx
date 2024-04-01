"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  //redirect after signin
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/admin/project");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/admin");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return (
      <h1 className="flex flex-col items-center justify-center text-center h-screen-full">
        Loading...
      </h1>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-secondary p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-lg text-center font-semibold mb-8">
            Sign in to redirect to admin portal
          </h1>
          <button
            className="w-full bg-accent text-black py-3 mb-4 rounded-md font-bold"
            onClick={() => {
              signIn("github");
            }}
          >
            Signin with github
          </button>
          <div className="text-center text-accent mb-4">- OR -</div>

          <form onSubmit={handleSubmit} className="text-center">
            <input
              type="text"
              className="w-full border border-white-100 text-secondary rounded px-3 py-3 mb-5 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email address"
              required
            />
            <input
              type="password"
              className="w-full border border-white-100 text-secondary rounded px-3 py-3 mb-5 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-accent p-3 px-8 rounded-md font-bold"
            >
              SignIn
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>

          {/* <Link
            className="block text-center text-primary hover:underline mt-2"
            href="/"
          >
            Back to home page
          </Link> */}
        </div>
      </div>
    )
  );
};

export default Signin;

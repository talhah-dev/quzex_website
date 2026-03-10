"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { signupAdmin } from "@/lib/api/auth";

export default function SignupSection() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: signupAdmin,
    onSuccess: (response) => {
      toast.success(response.message || "Admin created successfully.");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to create admin.");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      email,
      password,
      role: "admin",
    });
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#f7f9f2] px-4 py-16 md:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/footer.avif')] bg-cover bg-center opacity-20"
      />

      <div className="relative mx-auto flex max-w-7xl justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-[#0A211F]/10 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(10,33,31,0.4)] sm:p-8">
          <div className="flex flex-col gap-4">
            <Badge
              variant="outline"
              className="h-auto w-fit rounded-full border-[#0A211F]/15 bg-[#EDF6E8] px-3 py-1 text-sm font-normal text-[#0A211F]"
            >
              Admin Signup
            </Badge>

            <div className="space-y-2">
              <h1 className="text-3xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                Create an admin account
              </h1>
              <p className="text-sm leading-relaxed text-[#0A211F]/65 sm:text-base">
                Enter the admin email and password to create a dashboard account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="signup-email" className="text-sm font-medium text-[#0A211F]">
                Email
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] placeholder:text-[#0A211F]/45 outline-none transition focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-password" className="text-sm font-medium text-[#0A211F]">
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] placeholder:text-[#0A211F]/45 outline-none transition focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#0A211F] px-6 text-sm font-medium text-[#E9F3E6] transition-colors hover:bg-[#143531] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Creating..." : "Create Admin"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#0A211F]/62">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#0A211F] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

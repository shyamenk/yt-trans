"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error === "CredentialsSignin" ? "Invalid email or password" : res.error);
    } else if (res?.ok) {
      router.push("/");
    }
    setLoading(false);
  }

  // Show error from NextAuth redirect
  const urlError = searchParams.get("error");

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-card rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-2 border rounded bg-background"
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          className="w-full px-4 py-2 border rounded bg-background"
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      {(error || urlError) && (
        <p className="text-red-500 mt-4 text-center">{error || urlError}</p>
      )}
      <p className="mt-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="text-primary underline">Register</Link>
      </p>
    </div>
  );
}

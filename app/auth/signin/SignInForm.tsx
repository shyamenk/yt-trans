"use client";
import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Separate component for the form that uses useSearchParams
function SignInFormContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (session) {
      router.replace("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }
  if (session) {
    return null;
  }

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
      <h1 className="text-2xl text-white font-bold mb-6 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-2 rounded border bg-[var(--input)] text-white placeholder-white border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          className="w-full px-4 py-2 rounded border bg-[var(--input)] text-white placeholder-white border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
      <p className="mt-6 text-center text-sm text-white">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="text-primary underline">Register</Link>
      </p>
    </div>
  );
}

// Loading fallback component
function SignInLoading() {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-card rounded-lg shadow-lg">
      <div className="text-center py-20 text-white">Loading...</div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function SignInForm() {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInFormContent />
    </Suspense>
  );
}
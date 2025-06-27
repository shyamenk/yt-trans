import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("Registration successful! You can now sign in.");
        setTimeout(() => router.push("/auth/signin"), 1500);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-card rounded-lg shadow-lg">
      <h1 className="text-2xl text-white font-bold mb-6 text-center">Create an Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-2 rounded border bg-[var(--input)] text-white placeholder-white border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          autoComplete="name"
        />
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
          autoComplete="new-password"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
      <p className="mt-6 text-center text-sm text-white">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-primary underline">Sign in</Link>
      </p>
    </div>
  );
} 
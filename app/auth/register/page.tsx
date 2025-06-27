"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-card rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-2 border rounded bg-background"
          autoComplete="name"
        />
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
      <p className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-primary underline">Sign in</Link>
      </p>
    </div>
  );
}

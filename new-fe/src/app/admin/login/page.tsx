"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const isDev = process.env.NODE_ENV == "development";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data?.error || "OTP request failed");
      }
      const data = (await res.json().catch(() => ({}))) as { devOtp?: string };
      setDevOtp(data?.devOtp ?? null);
      setOtpSent(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "OTP request failed");
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data?.error || "Verification failed");
      }
      router.replace("/admin");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Verification failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-md">
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Admin login</h1>
            <p className="text-sm text-foreground/70">
              Request an OTP, then verify to access the panel.
            </p>
          </div>

          {error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm">
              {error}
            </div>
          ) : null}

          <label className="block space-y-1">
            <div className="text-xs text-foreground/70">Admin email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !otpSent) void requestOtp();
              }}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoFocus
            />
          </label>

          {otpSent ? (
            <>
              {isDev && devOtp ? (
                <div className="rounded-xl border bg-background/40 p-3 text-sm">
                  <div className="text-xs text-foreground/70 mb-1">Dev OTP (not shown in production)</div>
                  <div className="font-mono text-lg">{devOtp}</div>
                </div>
              ) : null}

              <label className="block space-y-1">
                <div className="text-xs text-foreground/70">OTP code</div>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void verifyOtp();
                  }}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono"
                  inputMode="numeric"
                  placeholder="6-digit code"
                />
              </label>

              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => void requestOtp()} disabled={busy || !email}>
                  {busy ? "..." : "Resend OTP"}
                </Button>
                <Button onClick={() => void verifyOtp()} disabled={busy || !email || !code}>
                  {busy ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => void requestOtp()} disabled={busy || !email}>
              {busy ? "Requesting..." : "Request OTP"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


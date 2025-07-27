"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}`;

export default function SignInModal() {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "verify">("login");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"user" | "company">("user");
  const otpRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const emailVal = form.get("email") as string;
    const password = form.get("password") as string;
    setEmail(emailVal);

    const endpoint =
      tab === "user" ? "/auth/user/sign-in" : "/auth/company/sign-in";

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailVal, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.message === "verify email") {
        setStep("verify");
      } else if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Login request failed.");
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const code = form.get("code");

    if (!code || isNaN(Number(code))) {
      setError("Please enter a valid numeric OTP code.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode: Number(code) }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        setError(data.message || "Verification failed");
      }
    } catch (err) {
      setError("Verification failed.");
    }
  };

  const handleResend = async () => {
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/resend-verification-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to resend OTP");
      } else {
        alert("A new OTP has been sent to your email.");
      }
    } catch (err) {
      setError("Failed to resend OTP.");
    }
  };

  useEffect(() => {
    if (step === "verify") {
      setTimeout(() => {
        otpRef.current?.focus();
      }, 100);
    }
  }, [step]);

  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) router.push("/");
      }}
    >
      <DialogContent className="max-w-md">
        <DialogTitle className="text-xl font-semibold text-center">
          Sign In
        </DialogTitle>
        <DialogDescription className="text-center mb-4">
          {step === "login"
            ? "Enter your credentials to access your account."
            : "Enter the 2FA code sent to your email."}
        </DialogDescription>

        {error && (
          <p className="text-red-500 text-center text-sm mb-2">{error}</p>
        )}

        {step === "login" ? (
          <Tabs
            defaultValue="user"
            className="w-full"
            onValueChange={(v) => setTab(v as "user" | "company")}
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
            </TabsList>

            <TabsContent value="company">
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Company Email"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <Button type="submit" className="w-full">
                  Sign In as Company
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="user">
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="User Email"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <Button type="submit" className="w-full">
                  Sign In as User
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                ref={otpRef}
                type="text"
                name="code"
                placeholder="Enter OTP Code"
                required
                className="w-full border px-4 py-2 rounded"
              />
              <Button type="submit" className="w-full">
                Verify
              </Button>
            </form>
            <Button
              type="button"
              onClick={handleResend}
              variant="outline"
              className="w-full mt-2"
            >
              Resend OTP
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

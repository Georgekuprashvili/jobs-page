"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}`;

export default function SignUpModal() {
  const router = useRouter();
  const [tab, setTab] = useState<"user" | "company">("company");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    let payload: any;
    let endpoint = "";

    if (tab === "user") {
      payload = {
        fullName: form.get("name"),
        age: Number(form.get("age")),
        email: form.get("email"),
        password: form.get("password"),
      };
      endpoint = "/auth/user/sign-up";
    } else {
      payload = {
        companyName: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        phoneNumber: form.get("phoneNumber") || "000000000",
      };
      endpoint = "/auth/company/sign-up";
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Signup successful. Check your email.");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      alert("Signup request failed.");
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) router.push("/");
      }}
    >
      <DialogContent className="max-w-md">
        <DialogTitle className="text-xl font-semibold text-center">
          Sign Up
        </DialogTitle>
        <DialogDescription className="text-center mb-4">
          {message
            ? message
            : "Please register as a company or user to continue."}
        </DialogDescription>

        {!message && (
          <Tabs
            defaultValue="company"
            className="w-full"
            onValueChange={(v) => setTab(v as "user" | "company")}
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
            </TabsList>

            <TabsContent value="company">
              <form className="space-y-4" onSubmit={handleSignUp}>
                <input
                  type="text"
                  name="name"
                  placeholder="Company Name"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
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
                  Register Company
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="user">
              <form className="space-y-4" onSubmit={handleSignUp}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
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
                  Register User
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

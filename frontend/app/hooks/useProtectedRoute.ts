"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { getUserFromToken, DecodedToken } from "../utils/getUserFromToken";

export type UserRole = "user" | "admin" | "company";

/**
  @param requiredRole
 */
export function useProtectedRoute(requiredRole: UserRole | UserRole[]) {
  const router = useRouter();

  useEffect(() => {
    const user: DecodedToken | null = getUserFromToken();

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    const isAuthorized = user && roles.includes(user.type as UserRole);

    if (!isAuthorized) {
      toast.error("არ გაქვთ წვდომა ამ გვერდზე.");
      router.replace("/sign-in");
    }
  }, [requiredRole, router]);
}

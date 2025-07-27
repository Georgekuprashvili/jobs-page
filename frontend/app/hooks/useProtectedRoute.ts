"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { getUserFromToken, DecodedToken } from "../utils/getUserFromToken";

/**
 * @param requiredRole
 */
export function useProtectedRoute(requiredRole: string) {
  const router = useRouter();

  useEffect(() => {
    const user: DecodedToken | null = getUserFromToken();

    if (!user || user.role !== requiredRole) {
      toast.error("არ გაქვთ წვდომა ამ გვერდზე.");
      router.push("/pages/sign-in");
    }
  }, [requiredRole, router]);
}

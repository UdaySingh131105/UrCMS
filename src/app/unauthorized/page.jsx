"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/api/auth/signin"); // Redirect to signin page
    }, 2000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
      <p className="text-lg mt-2">You don’t have access to this page.</p>
    </div>
  );
}

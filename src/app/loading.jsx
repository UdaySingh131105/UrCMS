"use client";
import { useEffect, useState } from "react";

export default function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 300); // delay
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null; // don’t render loader if route loads fast

  return (
    <div className="w-full h-screen flex justify-center items-center bg-inherit">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-gray-600"></div>
    </div>
  );
}

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("cat") || "");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Use URLSearchParams constructor instead of "new searchParams"
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("cat", category);
    } else {
      params.delete("cat");
    }

    params.set("page", 1); // reset pagination when filter changes
    router.push(`/posts?${params.toString()}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        placeholder="Enter the Category"
        className="rounded-md py-1 px-2 bg-gray-400/10"
      />
      <Button type="submit">Filter</Button>
    </form>
  );
}

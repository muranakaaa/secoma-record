"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form className="flex gap-2 mb-6" onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="店舗名で検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">検索</Button>
    </form>
  );
};

export default SearchForm;

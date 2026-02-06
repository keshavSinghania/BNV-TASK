import React from "react";
import Button from "./Button";

export default function SearchBar({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search by name, email, mobile or location",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.();
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
      />

      <Button
        type="button"
        variant="secondary"
        className="w-full sm:w-auto"
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
}

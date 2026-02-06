import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import SearchBar from "../ui/SearchBar";

export default function UserToolbar({
  searchValue,
  onSearchChange,
  onSearchClick,
  onExportCSV,
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <SearchBar
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onSearch={onSearchClick}
      />

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          className="w-full sm:w-auto"
          onClick={onExportCSV}
        >
          Export CSV
        </Button>

        <Link to="/users/new" className="w-full sm:w-auto">
          <Button type="button" className="w-full sm:w-auto">
            + Add User
          </Button>
        </Link>
      </div>
    </div>
  );
}

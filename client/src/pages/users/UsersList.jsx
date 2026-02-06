import React, { useEffect, useState } from "react";
import Header from "../../components/ui/Header";
import UserToolbar from "../../components/users/UserToolbar";
import UsersTable from "../../components/users/UsersTable";
import { UserPagination } from "../../components/users/UserPagination";

import { fetchUsers, exportUsersCsvApi, deleteUserApi } from "../../api/userApi";

export default function UsersList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchUsers({ search, page, limit });
      setUsers(data?.users || []);
      setPagination(
        data?.pagination || { page: 1, limit, total: 0, totalPages: 1 }
      );
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadUsers();
  }, [search, page, limit]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleSearchClick = () => {
    setPage(1);
    loadUsers();
  };

  const handleDelete = async (user) => {
    const id = user?._id || user?.id;
    const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

    const ok = window.confirm(`Delete ${name || "this user"}?`);
    if (!ok) return;

    try {
      await deleteUserApi(id);
      await loadUsers();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Delete failed");
    }
  };

  const handleExportCSV = async () => {
    if (exporting) return;

    const q = search.trim();
    const count = pagination.total;

    const msg = q
      ? `Export ${count} user(s) matching "${q}" as CSV?`
      : `Export ${count} user(s) as CSV?`;

    const ok = window.confirm(msg);
    if (!ok) return;

    try {
      setExporting(true);

      // ✅ server-side export (best for large data)
      const blob = await exportUsersCsvApi({ search: q });

      const url = window.URL.createObjectURL(blob);

      // nicer filename
      const stamp = new Date().toISOString().slice(0, 10);
      const filename = q ? `users_${q}_${stamp}.csv` : `users_${stamp}.csv`;

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Export failed");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="User Management"
        subtitle="List, search, manage and export users"
      />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b p-4 sm:p-5">
            <UserToolbar
              searchValue={search}
              onSearchChange={setSearch}
              onSearchClick={handleSearchClick}
              onExportCSV={handleExportCSV}
            />
            {exporting ? (
              <div className="mt-3 text-xs text-gray-500">
                Exporting CSV...
              </div>
            ) : null}
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-600">Loading...</div>
          ) : error ? (
            <div className="p-6 text-sm text-red-600">{error}</div>
          ) : (
            <UsersTable users={users} onDelete={handleDelete} />
          )}

          <UserPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      </main>
    </div>
  );
}

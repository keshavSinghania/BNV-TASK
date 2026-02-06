import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const getInitials = (user) => {
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  if (!fullName) return "U";
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

const getUserId = (user) => user?._id || user?.id;

export default function UsersTable({ users = [], onDelete }) {
  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-245">
          <thead className="bg-gray-50 border-y">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => {
              const id = getUserId(user);
              const initials = getInitials(user);
              const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
              const isActive = user?.status === "Active";

              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user?.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt="avatar"
                          className="h-10 w-10 rounded-full object-cover border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                          {initials}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {fullName || "Unknown User"}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {user?.location || "-"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-700 break-all">{user?.email || "-"}</td>
                  <td className="px-4 py-3 text-gray-700">{user?.mobile || "-"}</td>
                  <td className="px-4 py-3 text-gray-700">{user?.gender || "-"}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user?.status || "-"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">{user?.location || "-"}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/users/${id}`} state={{ user }}>
                        <Button variant="secondary">View</Button>
                      </Link>

                      <Link to={`/users/${id}/edit`} state={{ user }}>
                        <Button variant="secondary">Edit</Button>
                      </Link>

                      <Button variant="danger" onClick={() => onDelete?.(user)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {!users.length ? (
              <tr>
                <td className="px-4 py-6 text-sm text-gray-500" colSpan={7}>
                  No users found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden p-4 space-y-3">
        {users.map((user) => {
          const id = getUserId(user);
          const initials = getInitials(user);
          const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
          const isActive = user?.status === "Active";

          return (
            <div
              key={id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="h-11 w-11 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                    {initials}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 truncate">
                    {fullName || "Unknown User"}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {user?.location || "-"}
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user?.status || "-"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </div>
                  <div className="text-sm text-gray-800 break-all">
                    {user?.email || "-"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase">
                      Mobile
                    </div>
                    <div className="text-sm text-gray-800">
                      {user?.mobile || "-"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase">
                      Gender
                    </div>
                    <div className="text-sm text-gray-800">
                      {user?.gender || "-"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Link to={`/users/${id}`} state={{ user }} className="w-full">
                  <Button variant="secondary" className="w-full">
                    View
                  </Button>
                </Link>

                <Link to={`/users/${id}/edit`} state={{ user }} className="w-full">
                  <Button variant="secondary" className="w-full">
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="danger"
                  className="w-full"
                  onClick={() => onDelete?.(user)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}

        {!users.length ? (
          <div className="text-sm text-gray-500">No users found.</div>
        ) : null}
      </div>
    </div>
  );
}

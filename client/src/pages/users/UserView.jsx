// ✅ client/src/pages/users/UserView.jsx
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";

const getInitials = (u) => {
  const fullName = `${u?.firstName || ""} ${u?.lastName || ""}`.trim();
  if (!fullName) return "U";
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

export default function UserView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: routeId } = useParams();

  const user = state?.user || null;
  const id = user?._id || user?.id || routeId;

  // If user not passed (refresh/direct URL), go back
  useEffect(() => {
    if (!user) navigate("/users", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  const initials = getInitials(user);
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const isActive = user?.status === "Active";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="User Details" subtitle="View user information" />

      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="h-14 w-14 rounded-full object-cover border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="h-14 w-14 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700">
                  {initials}
                </div>
              )}

              <div className="min-w-0">
                <div className="text-lg font-semibold text-gray-900 truncate">
                  {fullName || "Unknown User"}
                </div>
                <div className="text-sm text-gray-600 break-all">
                  {user?.email || "-"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                to={`/users/${id}/edit`}
                state={{ user }}
                className="w-full sm:w-auto"
              >
                <Button variant="secondary" className="w-full sm:w-auto">
                  Edit
                </Button>
              </Link>

              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => navigate("/users")}
              >
                Back
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Mobile
              </div>
              <div className="mt-1 text-sm text-gray-900">
                {user?.mobile || "-"}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Gender
              </div>
              <div className="mt-1 text-sm text-gray-900">
                {user?.gender || "-"}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Status
              </div>
              <div className="mt-1">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user?.status || "-"}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Location
              </div>
              <div className="mt-1 text-sm text-gray-900">
                {user?.location || "-"}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

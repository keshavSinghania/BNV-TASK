import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import { createUserApi } from "../../api/userApi";


const isValidName = (name) => name.trim().length >= 2;
const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

export default function UserAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "Male",
    status: "Active",
    location: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidName(form.firstName)) {
      setError("First name must be at least 2 characters");
      return;
    }
    if (!isValidName(form.lastName)) {
      setError("Last name must be at least 2 characters");
      return;
    }
    if (!isValidMobile(form.mobile)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    setSaving(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (avatar) fd.append("avatar", avatar); 

      await createUserApi(fd);
      navigate("/users");
    } catch (err) {
      console.log("CREATE USER ERROR:", err?.response?.data || err);
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message ||
          "Failed to create user"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Add User" subtitle="Create a new user record" />

      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          {error ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            {/* First + Last */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                  required
                  minLength={2}
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                  required
                  minLength={2}
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="email"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                name="mobile"
                value={form.mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setForm((p) => ({ ...p, mobile: val }));
                }}
                required
                placeholder="mobile"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter a valid 10-digit number.
              </p>
            </div>

            {/* Gender / Status / Location */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  name="gender"
                  value={form.gender}
                  onChange={onChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  name="status"
                  value={form.status}
                  onChange={onChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  required
                  placeholder="Location"
                />
              </div>
            </div>

            {/* Avatar */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Avatar (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              />
              <p className="mt-1 text-xs text-gray-500">PNG/JPG, up to ~2MB</p>
            </div>

            {/* Actions */}
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => navigate("/users")}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save User"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

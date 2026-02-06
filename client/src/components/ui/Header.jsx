import React from "react";

export const Header = ({
  title = "User Management",
  subtitle = "Manage user records from a single dashboard",
})=> {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header

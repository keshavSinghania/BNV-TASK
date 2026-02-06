import React from "react";
export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
    danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
  };

  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

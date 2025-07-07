import React from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Input({ label, name, type = "text", value, onChange }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="text-gray-500 block w-full rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
    </div>
  );
}

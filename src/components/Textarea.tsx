import React from "react";

type TextareaProps = {
  label: string;
  name: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export default function Textarea({ label, name, value, onChange }: TextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        rows={3}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none text-gray-500"
      />
    </div>
  );
}


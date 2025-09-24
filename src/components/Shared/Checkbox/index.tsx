import React from "react";
import clsx from "clsx";

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox: React.FC<Props> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center cursor-pointer gap-2 text-sm select-none">
      <div
        className={clsx(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
          checked
            ? "bg-denim-300 border-denim-300"
            : "bg-white border-gray-300 hover:border-gray-500"
        )}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {label}
    </label>
  );
};

import React from "react";

interface ToggleProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  isDanger?: boolean;
  color?: "orange" | "blue" | "green" | "purple"; // giới hạn để type-safe
}

const Toggle: React.FC<ToggleProps> = ({
  isChecked,
  onChange,
  className,
  isDanger,
  color = "orange",
}) => {
  const colorMap: Record<string, string> = {
    orange: "bg-orange-500 shadow-orange-500/30",
    blue: "bg-blue-500 shadow-blue-500/30",
    green: "bg-green-500 shadow-green-500/30",
    purple: "bg-purple-500 shadow-purple-500/30",
  };

  const dotColorMap: Record<string, string> = {
    orange: "bg-orange-400 opacity-20",
    blue: "bg-blue-400 opacity-20",
    green: "bg-green-400 opacity-20",
    purple: "bg-purple-400 opacity-20",
  };

  const activeColor = colorMap[color] || colorMap.orange;
  const glowColor = dotColorMap[color] || dotColorMap.orange;

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="relative">
        {/* Toggle background */}
        <div
          className={`
            block w-14 h-8 rounded-full transition-all duration-300 ease-in-out
            ${isChecked
              ? isDanger
                ? "bg-red-500 shadow-red-500/30"
                : activeColor
              : "bg-gray-300 hover:bg-gray-400"}
          `}
        />

        {/* Toggle dot */}
        <div
          className={`
            absolute left-1 top-1 bg-white w-6 h-6 rounded-full
            transition-all duration-300 ease-in-out transform shadow-md
            ${isChecked ? "translate-x-6 scale-95" : "translate-x-0 scale-100"}
            hover:shadow-lg
          `}
        />

        {/* Inner glow effect when active */}
        {isChecked && !isDanger && (
          <div
            className={`
              absolute left-1 top-1 w-6 h-6 rounded-full
              transition-all duration-300 ease-in-out transform translate-x-6
              ${glowColor}
            `}
          />
        )}

        {/* Inner glow khi danger */}
        {isChecked && isDanger && (
          <div
            className="
              absolute left-1 top-1 w-6 h-6 rounded-full
              transition-all duration-300 ease-in-out transform translate-x-6
              bg-red-400 opacity-20
            "
          />
        )}
      </div>
    </label>
  );
};

export default Toggle;

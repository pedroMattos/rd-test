import { useState } from "react";

function Tooltip({
  content,
  children,
  position = "top",
}) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <div
        className={`
          pointer-events-none absolute z-50 whitespace-nowrap
          rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white shadow-lg
          transition-all duration-150 ease-out
          ${positionClasses[position]}
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {content}
      </div>
    </div>
  )
}

export default Tooltip

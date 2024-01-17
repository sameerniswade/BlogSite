import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button className={`px-3 text-black bg-white ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;

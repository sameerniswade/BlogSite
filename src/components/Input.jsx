import React, { forwardRef } from "react";

const Input = forwardRef(({ lable, type, className, ...props }, ref) => {
  return (
    <div className="m-2">
      {lable && <lable>{lable}</lable>}
      <input
        ref={ref}
        type={type}
        className={`border-black border-2 text-black ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;

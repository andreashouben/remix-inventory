import React from "react";
import { an } from "vitest/dist/global-58e8e951";

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactElement;
  name?: string;
  value?: string;
  label: string;
  [key: string]: any;
};

export function IconButton({
  children,
  onClick,
  name,
  value,
  label,
  ...props
}: ButtonProps) {
  return (
    <div className="tooltip" data-tip={label}>
      <button
        aria-label={label}
        onClick={onClick}
        className="btn-primary btn-sm btn-square btn"
        name={name}
        value={value}
        {...props}
      >
        {React.cloneElement(React.Children.only(children), {
          className: "h-5  w-5 ",
        })}
      </button>
    </div>
  );
}

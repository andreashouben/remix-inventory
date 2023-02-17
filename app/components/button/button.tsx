import React from "react";

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  name?: string;
  value?: string;
};

export function Button({ children, onClick, name, value }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md 
    border-b-2 
    border-purple-300 
    bg-purple-500 
    p-2 
    font-bold 
    text-white
    drop-shadow-md
    hover:bg-purple-400
    
    active:drop-shadow-none
    `}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
}

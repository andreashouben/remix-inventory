import type { HTMLInputTypeAttribute } from "react";

type InputProps = {
  name: string;
  type: HTMLInputTypeAttribute;
  [x: string]: any;
};

export function Input({ name, type, ...props }: InputProps) {
  return <input name={name} type={type} required {...props} />;
}

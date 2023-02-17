import type { HTMLInputTypeAttribute } from "react";

type InputProps = {
  name: string;
  type: HTMLInputTypeAttribute;
};

export function Input({ name, type }: InputProps) {
  return <input name={name} type={type} required />;
}

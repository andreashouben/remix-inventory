import { Form } from "@remix-run/react";
import { CheckIcon } from "@heroicons/react/20/solid";

type SubmitFormProps = {
  title: string;
  placeholder: string;
  name: string;
};

export function SubmitForm({ name, placeholder, title }: SubmitFormProps) {
  return (
    <section>
      <h2>{title}</h2>

      <Form method="post" className="flex gap-2">
        <input
          placeholder={placeholder}
          className="input grow"
          type="text"
          name={name}
          autoFocus
        />

        <button className="btn-primary btn gap-2">
          <CheckIcon className="h-6 w-6" /> Submit
        </button>
      </Form>
    </section>
  );
}

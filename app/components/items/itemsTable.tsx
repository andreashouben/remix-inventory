import type { FormEvent } from "react";
import React, { useRef } from "react";
import type { containerService } from "~/service/containerService";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Form, Link } from "@remix-run/react";

type ItemsTableProps = {
  items: Awaited<ReturnType<typeof containerService.getItemsInContainer>>;
};

export function ItemsTable({ items }: ItemsTableProps) {
  const delFormRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: FormEvent) => {
    if (!confirm("Really?")) {
      e.preventDefault();
    }
  };

  return (
    <>
      <h3>Items</h3>
      <table className="table-compact table w-full table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Amount</th>
            <th>Unit</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr key={i.id}>
              <th>{idx + 1}</th>
              <td>{i.name}</td>
              <td>{i.amount} </td>
              <td>{i.unit.name}</td>
              <td>
                <Link to={`/items/${i.id}`}>
                  <button className="btn-secondary btn-sm btn-square  btn">
                    <PencilIcon className={"h-4"} />
                  </button>
                </Link>
              </td>
              <td>
                <Form
                  ref={delFormRef}
                  action={`/container/${i.containerId}/items/${i.id}`}
                  method="post"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <button
                    className="btn-warning btn-sm btn-square btn"
                    name="_action"
                    value="delete"
                  >
                    <XMarkIcon className={"h-4"} />
                  </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

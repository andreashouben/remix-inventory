import { itemService } from "~/service/itemService";
import { containerService } from "~/service/containerService";
import { unitService } from "~/service/unitService";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { CheckIcon } from "@heroicons/react/20/solid";

type LoaderData = {
  item: Awaited<ReturnType<typeof itemService.findItem>>;
  container: Awaited<ReturnType<typeof containerService.getContainer>>;
  units: Awaited<ReturnType<typeof unitService.getUnits>>;
};
export const loader: LoaderFunction = async ({ params }) => {
  const itemId = parseInt(params.itemId!);
  const item = await itemService.findItem(itemId);
  const container = await containerService.getContainer(item.containerId);
  const units = await unitService.getUnits();

  return json({ item, container, units });
};

export const action: ActionFunction = async ({ params, request }) => {
  const itemId = parseInt(params.itemId!);
  const { itemName, amount, unitId } = Object.fromEntries(
    await request.formData()
  );

  if (
    typeof itemName !== "string" ||
    typeof amount !== "string" ||
    typeof unitId !== "string"
  ) {
    throw new Error("Invalid Form Data");
  }

  const item = await itemService.udateItem({
    id: itemId,
    amount: parseInt(amount),
    unitId: parseInt(unitId),
    name: itemName,
  });

  return redirect(`/container/${item.containerId}`);
};

export default function EditItem() {
  const { item, container, units } = useLoaderData() as LoaderData;
  return (
    <>
      <h2>{`Edit Item in '${container.name}'`}</h2>

      <Form method="post" className="form-control">
        <label className="input-group pb-3">
          <span className="w-2/12">Item Name</span>
          <input
            required
            placeholder={"Item Name"}
            className="input-bordered input w-10/12"
            type="text"
            name={"itemName"}
            defaultValue={item.name}
            autoFocus
          />
        </label>
        <label className="input-group pb-3">
          <span className="w-2/12">Amount</span>
          <input
            required
            placeholder={"Amount"}
            className="input-bordered input w-8/12"
            type="number"
            defaultValue={item.amount}
            name={"amount"}
          />
          <select
            className="select-bordered select w-2/12"
            name="unitId"
            defaultValue={item.unitId}
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>

        <button className="btn-primary btn gap-2">
          <CheckIcon className="h-6 w-6" /> Submit
        </button>
      </Form>
    </>
  );
}

import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { containerService } from "~/service/containerService";
import { db } from "~/utils/db.server";
import { CheckIcon } from "@heroicons/react/20/solid";
import { unitService } from "~/service/unitService";

type LoaderData = {
  container: Awaited<ReturnType<typeof containerService.getContainer>>;
  units: Awaited<ReturnType<typeof unitService.getUnits>>;
};
export const loader: LoaderFunction = async ({ params }) => {
  const container = await containerService.getContainer(
    parseInt(params.containerId!)
  );
  const units = await unitService.getUnits();
  return json<LoaderData>({ container, units });
};

export const action: ActionFunction = async ({ request, params }) => {
  const containerId = params.containerId;
  if (!containerId) {
    throw new Response(`Container id ${containerId} not found`, {
      status: 404,
    });
  }
  const { itemName, unitId, amount } = Object.fromEntries(
    await request.formData()
  );

  if (
    typeof itemName !== "string" ||
    typeof unitId !== "string" ||
    typeof amount !== "string"
  ) {
    throw new Error("Form not submitted correctly.");
  }
  const unitIdInt = parseInt(unitId);
  const amountInt = parseInt(amount);

  await db.item.create({
    data: {
      name: itemName,
      unitId: unitIdInt,
      amount: amountInt,
      containerId: parseInt(containerId),
    },
  });
  return redirect(`/container/${containerId}`);
};

export default function AddItem() {
  const { container, units } = useLoaderData() as LoaderData;

  return (
    <>
      <h2>{`Add Item to Container '${container.name}'`}</h2>

      <Form method="post" className="form-control">
        <label className="input-group pb-3">
          <span className="w-2/12">Item Name</span>
          <input
            placeholder={"Item Name"}
            className="input-bordered input w-10/12"
            type="text"
            name={"itemName"}
            autoFocus
            required
          />
        </label>
        <label className="input-group pb-3">
          <span className="w-2/12">Amount</span>
          <input
            placeholder={"Amount"}
            className="input-bordered input w-8/12"
            type="number"
            name={"amount"}
            required
          />
          <select className="select-bordered select w-2/12" name="unitId">
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

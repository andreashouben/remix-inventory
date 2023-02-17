import { Form, useLoaderData } from "@remix-run/react";
import { Label } from "~/components/label/label";
import { Input } from "~/components/input/input";
import { Button } from "~/components/button/button";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { containerService } from "~/routes/container/containerService";
import { db } from "~/utils/db.server";

type LoaderData = {
  container: Awaited<ReturnType<typeof containerService.getContainer>>;
};
export const loader: LoaderFunction = async ({ params }) => {
  const container = await containerService.getContainer(
    parseInt(params.containerId!)
  );
  return json<LoaderData>({ container });
};

export const action: ActionFunction = async ({ request, params }) => {
  const containerId = params.containerId;
  if (!containerId) {
    throw new Response(`Container id ${containerId} not found`, {
      status: 404,
    });
  }
  const formData = await request.formData();
  const itemName = formData.get("item-name");
  if (typeof itemName !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  await db.item.create({
    data: {
      name: itemName,
      containerId: parseInt(containerId),
    },
  });
  return redirect(`/container/${containerId}`);
};

export default function AddItem() {
  const { container } = useLoaderData() as LoaderData;

  return (
    <section>
      <h2>Add Item to Container '{container.name}'</h2>

      <Form method="post" className="grid grid-cols-1 gap-2 text-center">
        <fieldset>
          <Label>
            Item Name: <br />
            <Input type="text" name="item-name" />
          </Label>
        </fieldset>

        <div className="">
          <Button>Submit</Button>
        </div>
      </Form>
    </section>
  );
}

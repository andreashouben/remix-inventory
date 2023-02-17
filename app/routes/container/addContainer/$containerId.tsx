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
  const containerId = parseInt(params.containerId!);
  const formData = await request.formData();
  const containerName = formData.get("container-name");
  if (typeof containerName !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  await db.container.create({
    data: {
      name: containerName,
      parentContainerId: containerId,
    },
  });
  return redirect(`/container/${containerId}`);
};

export default function AddItem() {
  const { container } = useLoaderData() as LoaderData;

  return (
    <section>
      <h2>Add Container to Container '{container.name}'</h2>

      <Form method="post" className="grid grid-cols-1 gap-2 text-center">
        <fieldset>
          <Label>
            Container Name: <br />
            <Input type="text" name="container-name" />
          </Label>
        </fieldset>

        <div>
          <Button>Submit</Button>
        </div>
      </Form>
    </section>
  );
}

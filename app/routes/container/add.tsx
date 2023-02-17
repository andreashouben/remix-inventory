import { Form } from "@remix-run/react";
import { Button } from "~/components/button/button";
import type { ActionFunction } from "@remix-run/router";
import { redirect } from "@remix-run/router";
import { db } from "~/utils/db.server";
import { Label } from "~/components/label/label";
import { Input } from "~/components/input/input";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let containerName = formData.get("container-name");

  if (typeof containerName !== "string") {
    throw new Error("Form not submitted correctly.");
  }

  await db.container.create({
    data: { name: containerName },
  });
  return redirect("/");
};

export default function AddContainer() {
  return (
    <section>
      <h2>Add Container</h2>

      <Form method="post" className="grid grid-cols-1 gap-2 text-center">
        <fieldset>
          <Label>
            Container Name: <br />
            <Input type="text" name="container-name" />
          </Label>
        </fieldset>

        <div className="">
          <Button>Submit</Button>
        </div>
      </Form>
    </section>
  );
}

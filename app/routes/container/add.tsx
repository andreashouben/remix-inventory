import type { ActionFunction } from "@remix-run/router";
import { redirect } from "@remix-run/router";
import { db } from "~/utils/db.server";
import { SubmitForm } from "~/components/forms/submitForm";

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
      <SubmitForm
        title={"Add Container"}
        placeholder={"Container Name"}
        name={"container-name"}
      />
    </section>
  );
}

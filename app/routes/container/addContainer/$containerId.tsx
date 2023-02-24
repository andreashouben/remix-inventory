import { Form, useLoaderData } from "@remix-run/react";
import { Label } from "~/components/label/label";
import { Input } from "~/components/input/input";
import { IconButton } from "~/components/button/iconButton";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { containerService } from "~/service/containerService";
import { db } from "~/utils/db.server";
import { CheckIcon } from "@heroicons/react/20/solid";
import { SubmitForm } from "~/components/forms/submitForm";

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
      <SubmitForm
        title={`Add Container to Container '${container.name}'`}
        placeholder="Container Name"
        name="container-name"
      />
    </section>
  );
}

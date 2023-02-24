import type { ActionFunction } from "@remix-run/node";
import { itemService } from "~/service/itemService";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request, params }) => {
  const containerId = parseInt(params.containerId!);
  const itemId = parseInt(params.itemId!);

  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  if (_action === "delete") {
    await itemService.deleteItem(itemId);
  }
  return redirect(`/container/${containerId}`);
};

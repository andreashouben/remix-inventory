import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import type { Container as ContainerFromDb } from "@prisma/client";
import { IconButton } from "~/components/button/iconButton";
import { containerService } from "~/service/containerService";
import React, { useEffect } from "react";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import { ContainerNavigation } from "~/components/containerNavigation/containerNavigation";
import { ContainerList } from "~/components/container/containerList";
import { ItemsTable } from "~/components/items/itemsTable";

type LoaderData = {
  container: Awaited<ReturnType<typeof containerService.getContainer>>;
  containers: Awaited<
    ReturnType<typeof containerService.getContainersForParent>
  >;
  items: Awaited<ReturnType<typeof containerService.getItemsInContainer>>;
  parents: ContainerFromDb[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const container = await containerService.getContainer(
    parseInt(params.containerId!)
  );
  const containers = await containerService.getContainersForParent(
    container.id
  );

  const parents = await containerService.fetchParentContainers(
    container.parentContainer,
    []
  );
  parents.sort((a, b) => (a.name > b.name ? 1 : -1));

  const items = await containerService.getItemsInContainer(container.id);

  return json<LoaderData>({ container, items, containers, parents });
};

export const action: ActionFunction = async ({ request, params }) => {
  const containerId = parseInt(params.containerId!);
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);
  if (_action === "delete") {
    await db.item.deleteMany({
      where: {
        containerId,
      },
    });
    await db.container.delete({
      where: {
        id: containerId,
      },
    });
  }
  return redirect("/");
};
export default function ContainerPage() {
  const { parents, container, items, containers } =
    useLoaderData() as LoaderData;

  const navigate = useNavigate();

  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key.toLocaleLowerCase() === "i") {
        navigate(`/container/addItem/${container.id}`);
      }
      if (e.key.toLocaleLowerCase() === "c") {
        navigate(`/container/addContainer/${container.id}`);
      }
    };
    window.document.addEventListener("keydown", onKeypress);
    return () => {
      window.document.removeEventListener("keydown", onKeypress);
    };
  }, [navigate, container]);

  return (
    <section>
      <header className="flex items-center justify-between">
        <h2>Container "{container.name}"</h2>
        <div>
          <Link to={`/container/addContainer/${container.id}`}>
            <button className="btn-primary btn-md btn gap-2">
              <kbd className="kbd kbd-sm text-black">C</kbd>
              Add Container
            </button>
          </Link>
          <Link to={`/container/addItem/${container.id}`} className="pl-2">
            <button className="btn-primary btn-md btn gap-2">
              <kbd className="kbd kbd-sm text-black">I</kbd>
              Add Item
            </button>
          </Link>
        </div>
      </header>
      <nav className="inline">
        <ContainerNavigation container={parents} />
      </nav>
      {containers.length > 0 && <ContainerList containers={containers} />}
      {items.length > 0 && <ItemsTable items={items} />}
    </section>
  );
}

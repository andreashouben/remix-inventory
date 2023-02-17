import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { Link, useLoaderData } from "@remix-run/react";
import type { Container as ContainerFromDb } from "@prisma/client";
import { Button } from "~/components/button/button";
import { containerService } from "~/routes/container/containerService";
import { Container } from "~/components/container/container";
import React from "react";

type LoaderData = {
  container: Awaited<ReturnType<typeof containerService.getContainer>>;
  containers: Awaited<
    ReturnType<typeof containerService.getContainersForParent>
  >;
  items: Awaited<ReturnType<typeof containerService.getItems>>;
  parents: ContainerFromDb[];
};

const fetchParent = async (
  parent: ContainerFromDb | null,
  names: ContainerFromDb[]
): Promise<ContainerFromDb[]> => {
  if (parent === null) {
    return names;
  }
  names.push(parent);
  const container = await containerService.getContainer(parent.id);

  return await fetchParent(container.parentContainer, names);
};

export const loader: LoaderFunction = async ({ params }) => {
  const container = await containerService.getContainer(
    parseInt(params.containerId!)
  );
  const containers = await containerService.getContainersForParent(
    container.id
  );

  const parents = (await fetchParent(container.parentContainer, [])).sort(
    (a, b) => (a.name > b.name ? 1 : -1)
  );
  const items = await containerService.getItems(container.id);

  return json<LoaderData>({ container, items, containers, parents });
};

export const action: ActionFunction = async ({ request, params }) => {
  const containerId = parseInt(params.containerId!);
  if (request.method === "DELETE") {
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
  return (
    <section>
      <h2>
        {parents.length > 0 &&
          [...parents]
            .map<React.ReactNode>((c) => (
              <Link key={c.id} to={`/container/${c.id}`}>
                {c.name}
              </Link>
            ))
            .reduce((prev, cur) => [prev, <span> &gt; </span>, cur])}
        {parents.length > 0 && " > "}
        {container.name}
      </h2>
      <h3>Container</h3>
      <ol>
        {containers.map((c) => (
          <li key={c.id}>
            <Container
              containerName={c.name}
              containerId={c.id}
              itemCount={c._count.items}
              containerCount={c._count.containers}
            />
          </li>
        ))}
      </ol>
      <h3>Items</h3>
      <ol>
        {items.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ol>
      <Link to={`/container/addItem/${container.id}`}>
        <Button>Add Item</Button>
      </Link>

      <Link to={`/container/addContainer/${container.id}`}>
        <Button>Add Container</Button>
      </Link>

      <Link to={"/"}>
        <Button>Back to container list</Button>
      </Link>
    </section>
  );
}

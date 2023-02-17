import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button/button";

import { db } from "~/utils/db.server";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Container as ContainerFromDb } from "@prisma/client";
import { Container } from "~/components/container/container";

type LoaderData = {
  containers: (ContainerFromDb & {
    _count: { items: number; containers: number };
  })[];
};

export const loader: LoaderFunction = async () => {
  const containers = await db.container.findMany({
    where: {
      parentContainer: null,
    },
    include: {
      _count: {
        select: {
          items: true,
          containers: true,
        },
      },
    },
  });

  return json<LoaderData>({ containers });
};

export default function Index() {
  const { containers } = useLoaderData() as LoaderData;

  return (
    <section>
      <ol>
        {containers.map((c) => (
          <li key={c.id}>
            <Container
              key={c.id}
              containerId={c.id}
              containerName={c.name}
              itemCount={c._count.items}
              containerCount={c._count.containers}
            />
          </li>
        ))}
      </ol>
      <Link to={"/container/add"}>
        <Button>Add container</Button>
      </Link>
    </section>
  );
}

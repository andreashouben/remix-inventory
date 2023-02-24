import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { IconButton } from "~/components/button/iconButton";

import { db } from "~/utils/db.server";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Container as ContainerFromDb } from "@prisma/client";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import { ContainerList } from "~/components/container/containerList";
import { containerService } from "~/service/containerService";

type LoaderData = {
  containers: Awaited<
    ReturnType<typeof containerService.getContainersForParent>
  >;
};

export const loader: LoaderFunction = async () => {
  const containers = await containerService.getContainersForParent(null);

  return json<LoaderData>({ containers });
};

export default function Index() {
  const { containers } = useLoaderData() as LoaderData;

  return (
    <section>
      <header className="flex items-center justify-between">
        <h2>Your current inventory:</h2>
        <div>
          <Link to={`/container/add`}>
            <IconButton label="Add Container">
              <FolderPlusIcon />
            </IconButton>
          </Link>
        </div>
      </header>

      <div className="pb-2 pt-2 text-sm">&nbsp;</div>
      {containers.length > 0 && <ContainerList containers={containers} />}
    </section>
  );
}

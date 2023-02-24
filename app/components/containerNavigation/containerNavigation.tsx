import type { Container as ContainerFromDb } from ".prisma/client";
import React from "react";
import { Link } from "@remix-run/react";

type ContainerNavigationProps = {
  container: ContainerFromDb[];
};

export function ContainerNavigation({ container }: ContainerNavigationProps) {
  if (container.length === 0) {
    return (
      <div className="pt-2 pb-2 text-sm italic text-gray-400">
        <Link className="link" to={"/"}>
          No Parent Containers
        </Link>
      </div>
    );
  }
  return (
    <div className="breadcrumbs  flex text-sm">
      <span className="mr-3">Parent Containers:</span>
      <ul>
        {container.map((c) => (
          <li key={c.id}>
            <Link to={`/container/${c.id}`} className="link">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

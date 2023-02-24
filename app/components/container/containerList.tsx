import React from "react";
import { Container } from "~/components/container/container";
import type { containerService } from "~/service/containerService";

type ContainerListProps = {
  containers: Awaited<
    ReturnType<typeof containerService.getContainersForParent>
  >;
};

export function ContainerList({ containers }: ContainerListProps) {
  return (
    <div>
      <header>
        <h3>Container</h3>
      </header>
      <ol>
        {containers.map((c) => (
          <li key={c.id} className="pb-2">
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
    </div>
  );
}

import { db } from "~/utils/db.server";
import type { Container as ContainerFromDb } from ".prisma/client";

export const containerService = {
  async getContainer(id: number) {
    const container = await db.container.findFirst({
      where: { id },
      select: {
        id: true,
        containers: true,
        items: true,
        name: true,
        parentContainer: true,
      },
    });
    if (container === null) {
      throw new Response(`Container with id ${id} not found`, { status: 404 });
    }
    return container;
  },
  async getContainersForParent(parentContainerId: number | null) {
    return db.container.findMany({
      where: {
        parentContainerId,
      },
      select: {
        name: true,
        id: true,
        _count: { select: { items: true, containers: true } },
      },
    });
  },
  async getItemsInContainer(containerId: number) {
    return db.item.findMany({
      where: {
        containerId,
      },
      include: {
        unit: true,
      },
    });
  },
  async fetchParentContainers(
    parent: ContainerFromDb | null,
    parents: ContainerFromDb[]
  ): Promise<ContainerFromDb[]> {
    if (parent === null) {
      return parents;
    }
    parents.push(parent);
    const container = await containerService.getContainer(parent.id);
    return await this.fetchParentContainers(container.parentContainer, parents);
  },
};

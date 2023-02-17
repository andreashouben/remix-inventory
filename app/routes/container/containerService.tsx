import { db } from "~/utils/db.server";

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
  async getContainersForParent(parentContainerId: number) {
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
  async getItems(containerId: number) {
    return db.item.findMany({
      where: {
        containerId,
      },
    });
  },
};

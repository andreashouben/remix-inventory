import { db } from "~/utils/db.server";

const updateItemObject = {
  async deleteItem(id: number) {
    return db.item.delete({
      where: {
        id,
      },
    });
  },
  async findItem(id: number) {
    const item = await db.item.findUnique({
      where: {
        id,
      },
    });
    if (item === null) {
      throw new Error(`Could not find item for id ${id}`);
    }
    return item;
  },
  async udateItem({
    id,
    name,
    amount,
    unitId,
  }: {
    id: number;
    name: string;
    amount: number;
    unitId: number;
  }) {
    return db.item.update({
      where: {
        id,
      },
      data: {
        name,
        amount,
        unitId,
      },
    });
  },
};
export const itemService = updateItemObject;

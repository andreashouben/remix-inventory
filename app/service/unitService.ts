import { db } from "~/utils/db.server";

export const unitService = {
  async getUnits() {
    return db.unit.findMany();
  },
};

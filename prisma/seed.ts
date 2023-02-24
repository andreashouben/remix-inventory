import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  const units = ["pc(s)", "ml", "l", "g", "kg"];

  await Promise.all(
    units.map((name, id) => {
      return prismaClient.unit.create({
        data: { id: id + 1, name },
      });
    })
  );
}

main()
  .then(async () => {
    prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

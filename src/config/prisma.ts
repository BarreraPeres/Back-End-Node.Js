import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'],
}) //conecxao do prisma com o banco de dados
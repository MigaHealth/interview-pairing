import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
// import { isNameValid } from "~/helpers/name";
import { prisma } from "~/server/prisma";

export const consumerRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.consumer.findMany();
  }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const consumer = await prisma.consumer.findUnique({
        where: { id },
      });

      if (!consumer) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return consumer;
    }),

  savePhoneNumber: publicProcedure
    .input(
      z.object({
        id: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, phone } = input;
      const consumer = await prisma.consumer.update({
        where: { id },
        data: { phone },
      });

      return consumer;
    }),

  saveName: publicProcedure
    .input(
      z.object({
        /* TODO: inputs */
      })
    )
    .mutation(async (/*{ input }*/) => {
      /* TODO: validate name */
      /* const nameValid = isNameValid(input.name); */
      /* save name if valid, otherwise throw TRPCError */
    }),
});

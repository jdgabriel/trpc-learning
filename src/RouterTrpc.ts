import * as trpc from "@trpc/server";
import { z } from "zod";

type User = {
  id: number;
  name: string;
};

const data: User[] = [];

const appRouter = trpc
  .router()
  .query("getUser", {
    input: z.string(),
    async resolve({ input }) {
      return data.find((d) => d.name === input);
    },
  })
  .query("allUsers", {
    async resolve({ ctx }) {
      return data;
    },
  })
  .mutation("createUser", {
    input: z.object({ name: z.string() }),
    async resolve({ input }) {
      const dataUser: User = {
        id: Math.random(),
        name: input.name,
      };
      data.push(dataUser);
      return dataUser;
    },
  });

export type AppRouter = typeof appRouter;

export { appRouter };

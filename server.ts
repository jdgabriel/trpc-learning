import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./src/RouterTrpc";

const app = express();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const PORT = 3636;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

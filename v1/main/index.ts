import { Application, Router } from "./deps.ts";
import { applyPages } from "./utils.ts";

const router : Router = new Router();
applyPages(router);

const app : Application = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
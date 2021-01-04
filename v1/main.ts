import { Application } from "./deps.ts";

const app : Application = new Application();

app.use((ctx) => {
    ctx.response.body = "Hello World 22!";
});

await app.listen({ port: 8000 });
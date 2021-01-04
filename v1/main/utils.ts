import {existsSync, walkSync, Router} from "./deps.ts";

export const applyPages = (router : Router) => {
    if (existsSync("../pages")) {
        for (const entry of walkSync("../pages")) {
            if (entry.path.indexOf('..\\pages\\') !== -1) {
                const page = entry.path
                    .replace('..\\pages\\', '')
                    .replace('.ts', '')
                    .replace('.js', '');

                router.get(`/${page}`, (context) => {
                    context.response.body = "Hello "+page+"!";
                });
            }
        }
    }
};
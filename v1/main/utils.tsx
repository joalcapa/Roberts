import pages from '../pages/index.ts';
import {
    existsSync,
    walkSync,
    Router,
    React,
    ReactDOMServer,
} from './deps.ts';

export const applyPages = (router : Router) => {
    const pagesAny : any = pages;

    if (existsSync("../pages")) {
        for (const entry of walkSync("../pages")) {
            if (entry.path.indexOf('..\\pages\\') !== -1 && entry.path.indexOf('index') === -1) {
                const page = entry.path
                    .replace('..\\pages\\', '')
                    .replace('.tsx', '')
                    .replace('.jsx', '')
                    .replace('.ts', '')
                    .replace('.js', '');

                const App = pagesAny[page];
                const html =
                    `<html>
                        <head>
                            <script>
                                 import React from "https://dev.jspm.io/react@16.13.1";
                                 import ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";
                                 const App = ${App};
                                 ReactDOM.hydrate(React.createElement(App), document.body);
                            </script>
                        </head>
                        <body>
                            ${(ReactDOMServer as any).renderToString(<App />)}
                        </body>
                    </html>`;

                router.get(`/${page}`, (context) => {
                    context.response.body = html;
                });
            }
        }
    }
};
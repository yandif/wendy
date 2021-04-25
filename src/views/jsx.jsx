/* @jsx h */
import {
  h,
  renderHTML,
} from "https://denopkg.com/syumai/deno-libs/jsx/renderer.ts";

const Body = () => (
  <body>
    <main>
      <h1>jsx</h1>
    </main>
  </body>
);

const html = (
  <html>
    <head>
      <title>wendy.deno.dev</title>
    </head>
    <Body />
  </html>
);

export default function (req, params) {
  return new Response(renderHTML(html), {
    status: 200,
    headers: {
      server: "denosr",
      "content-type": "text/html",
    },
  });
}

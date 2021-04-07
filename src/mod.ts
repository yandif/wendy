/// <reference path="./deployctl.d.ts" />
import * as path from "https://deno.land/std@0.92.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

addEventListener("fetch", async (event: FetchEvent) => {
  const url: string = path.resolve(__dirname, "./index.html");
  const str: string = await Deno.readTextFile(url);
  const response = new Response(str, {
    headers: { "content-type": "text/html" },
  });
  event.respondWith(response);
});

import {
  match,
  pathToRegexp,
} from "https://deno.land/x/path_to_regexp@v6.2.0/index.ts";
import { logger } from "../utils/mod.js";

import NotFoundPage from "./404.js";
import ServerErrorPage from "./500.js";

let routes = { 404: NotFoundPage, 500: ServerErrorPage };

async function handleRequest(request, routes) {
  const startTime = new Date();

  const { pathname } = new URL(request.url);
  let response;
  try {
    for (const route of Object.keys(routes)) {
      if (pathToRegexp(route).test(pathname)) {
        const getParams = match(route);
        const { params } = getParams(pathname);
        response = await routes[route](request, params);
      }
    }

    if (response === undefined) {
      response = await routes["404"](request, {});
    }
  } catch (error) {
    console.error("服务端错误: ", error);
    response = await routes["500"](request, { error: error.message });
  }

  const endTime = new Date();
  const logMessage = `${request.method} ${pathname} ${response.status} ${
    endTime - startTime
  }ms`;
  logger(logMessage, response.status);
  return response;
}

export default function app(userRoutes) {
  routes = { ...routes, ...userRoutes };
  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request, routes));
  });
}

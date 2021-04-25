import app from "./app/mod.js";
import index from "./views/index.js";
import cat from "./views/cat.js";
import blog from "./views/blog.js";
import ip from "./views/ip.js";
import json from "./views/json.js";
import favicon from "./views/favicon.js";
import jsx from "./views/jsx.jsx";

app({
  "/": index,
  "/cat/:width/:height": cat,
  "/blog": blog,
  "/ip": ip,
  "/json": json,
  "/jsx": jsx,
  "/favicon.ico": favicon,
});

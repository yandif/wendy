export default function () {
  return new Response("<h1 align=center>资源不存在</h1>", {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

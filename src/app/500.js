export default function (req, params) {
  return new Response(
    "<h1 align=center>服务器错误：" + params.error + "</h1>",
    {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

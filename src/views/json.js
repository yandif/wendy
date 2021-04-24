export default function (_request, _params) {
  const json = JSON.stringify({
    message: "Hello from Deno Deploy",
  });

  return new Response(json, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}

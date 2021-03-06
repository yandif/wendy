export default function (request, _params) {
  const ip = request.headers.get("x-forwarded-for");

  console.log(request.headers);
  const response = new Response(
    `
  <!DOCTYPE html>

<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wendy</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      text-shadow: 0 1px 0 hsl(174, 5%, 80%), 0 2px 0 hsl(174, 5%, 75%),
        0 3px 0 hsl(174, 5%, 70%), 0 4px 0 hsl(174, 5%, 66%),
        0 5px 0 hsl(174, 5%, 64%), 0 6px 0 hsl(174, 5%, 62%),
        0 7px 0 hsl(174, 5%, 61%), 0 8px 0 hsl(174, 5%, 60%),
        0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
        0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
        0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);

    }

    .app {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgb(218, 218, 28);
    }

    h1 {
      font-size: 60px;
      font-weight: bold;
      color: white;
      margin-bottom: 15px;
    }

    h6 {
      margin-top: 15px;
      font-size: 32px;
      font-weight: bold;
      color: white;
    }

    a {
      text-decoration: none;
      color: yellow;
    }

  </style>
</head>


<body>
  <div class="app">

    <h1>你的ip地址是: ${ip}</h1>


  </div>


</body>

</html>

  `,
    {
      headers: { "content-type": "text/html" },
    }
  );
  return response;
}

/// <reference path="./deployctl.d.ts" />

addEventListener("fetch", (event: FetchEvent) => {  
  const str =`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wendy</title>
</head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(218, 218, 28);
  }

  h1 {
    font-size: 81px;
    font-weight: bold;
    color: white;
  }

</style>

<body>
  <div class="app">
    <h1>Wendy</h1>
  </div>
</body>

</html>`;
  const response = new Response(str, {
    headers: { "content-type": "text/html" },
  });
  event.respondWith(response);
});

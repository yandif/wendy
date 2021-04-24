export default async function (_request, _params) {
  const post = await fetch(
    `https://yandif.com/favicon.ico
    `
  );
  return post;
}

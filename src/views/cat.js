export default async function (_request, params) {
  const post = await fetch(
    `http://placekitten.com/${params.width}/${params.height}`
  );
  return post;
}

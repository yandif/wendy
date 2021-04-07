export async function readHTML(url: string): Promise<string> {
  return await Deno.readTextFile(url);
}

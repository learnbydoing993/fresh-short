import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts"
import { ShortEntity, createShort } from "./db.ts";

export async function newShort(orginalUrl: string | undefined, login: string) {
  if (!orginalUrl || orginalUrl.length === 0) {
    const errorMsg = "Invalid url provided!"
    const headers = new Headers();
    headers.set("location", `/account/myshorts?error=${errorMsg}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  const newShort: ShortEntity = {
    userLogin: login,
    shortUrl: nanoid(11),
    originalUrl: orginalUrl!
  } 
  
  await createShort(newShort)

  const headers = new Headers();
  headers.set("location", "/account/myshorts");
  return new Response(null, {
    status: 303,
    headers,
  });
}
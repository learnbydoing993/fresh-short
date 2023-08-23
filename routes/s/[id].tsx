import { Handlers } from "$fresh/server.ts";
import { getShort } from "../../utils/db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;

    const short = await getShort(id);

    if (short === null) {
      return ctx.renderNotFound();
    }

    const headers = new Headers();
    headers.set("location", short.originalUrl);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
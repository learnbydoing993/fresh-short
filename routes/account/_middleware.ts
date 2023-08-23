import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import { State } from "../_middleware.ts";

export async function handler(
  _: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const redirect = new Response(null, {
    status: 303,
    headers: { Location: "/" },
  });
  if (ctx.state.sessionId === undefined) return redirect;
  if (ctx.state.user === undefined) return redirect;

  return await ctx.next();
}
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getSessionId } from "kv_oauth";
import { UserEntity, getUserBySession } from "../utils/db.ts";

export interface State {
  sessionId?: string;
  user?: UserEntity;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const sessionId = await getSessionId(req);
  ctx.state.sessionId = sessionId;

  if (sessionId) {
    const user = await getUserBySession(sessionId);
    if (user) ctx.state.user = user;
  }
  return await ctx.next();
}
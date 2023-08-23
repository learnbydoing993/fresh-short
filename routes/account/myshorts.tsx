// deno-lint-ignore-file
import { Handlers, RouteContext } from "$fresh/server.ts";
import Short from "../../islands/Short.tsx";
import { ShortEntity, deleteShort, getShortsByUser } from "../../utils/db.ts";
import { newShort } from "../../utils/helper.ts";
import { State } from "../_middleware.ts";

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const orginalUrl = form.get("original")?.toString();

    return newShort(orginalUrl, ctx.state.user!.login);
  },

  async DELETE(req, ctx) {
    const short = await req.json() as ShortEntity
    if (ctx.state.user!.login === short.userLogin) {
      await deleteShort(short);
    }
    
    return ctx.render();
  }
};

export default async function ShortsPage(req: Request, ctx: RouteContext<any, State>) {
  const error = new URL(req.url).searchParams.get("error");
  const shorts = await getShortsByUser(ctx.state.user!.login);

  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {error && (
          <div class="w-full bg-red-400 border-l-4 p-4 mb-5" role="alert">
            <p class="font-bold">Error</p>
            <p>Failed creating short</p>
            <p>{error}</p>
          </div>
        )}
        <div class="w-full">
          <div class="mb-4 flex items-center">
            <form method="POST" class="flex items-center w-full">
              <input type="text" name="original" class="px-4 py-2 border rounded border(gray-500 2) w-full" placeholder="Enter your text" />
              <button type="submit" class="ml-2 px-3 py-1 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 active:bg-yellow-400">Submit</button>
            </form>
          </div>
          
          <ul class="space-y-4">
            { shorts.map(short => 
              <li class="bg-white p-4 rounded-md shadow-md">
                <Short short={short} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    
  );
}

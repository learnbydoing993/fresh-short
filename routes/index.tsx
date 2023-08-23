import { Handlers, PageProps } from "$fresh/server.ts";
import IconBrandGithubFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-github-filled.tsx"
import { State } from "./_middleware.ts";
import { newShort } from "../utils/helper.ts";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({...ctx.state});
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const orginalUrl = form.get("original")?.toString();

    if (!ctx.state.user) {
      const headers = new Headers();
      headers.set("location", "/");
      return new Response(null, {
        status: 302,
        headers,
      });
    }

    return newShort(orginalUrl, ctx.state.user!.login);
  },
}

export default function Home(props: PageProps) {
  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-3xl font-bold">Welcome to Fresh<span class="text-yellow-500">Short</span></h1>
        <p class="my-5 text-xl">
          Elevate Your Links, Simplify Your Sharing!
        </p>
        {
          props.data.sessionId ? (
            <>
              <form method="POST">
                <input type="text" name="original" class="px-3 py-2 bg-white rounded border(yellow-500 2)" placeholder="Come on..." />
                <button type="submit" class="mt-3 px-3 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 active:bg-yellow-400">Short me</button>
              </form>
            </>
          ) : (
            <a href="/signin" class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md shadow-md flex items-center">
              <IconBrandGithubFilled class="w-6 h-6 inline-block mr-2" />
              Sign in with GitHub
            </a>
          )
        }
      </div>
    </div>
  );
}

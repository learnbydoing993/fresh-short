import { LayoutProps } from "$fresh/server.ts";
import { Navbar } from "../components/Navbar.tsx";
import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-github.tsx";

export default function Layout({ Component, state }: LayoutProps) {
  return (
    <div class="layout">
      <Navbar sessionId={state.sessionId as string | undefined} />
      <Component />
      
      <footer class="fixed bottom-0 left-0 z-20 w-full p-4">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center">© 2023 LearnByDoing</span>
          <ul class="flex flex-wrap items-center mt-3">
              <li>
                <a
                  href="https://github.com/learnbydoing993/fresh-short"
                  class="inline-block mr-4"
                  aria-label="GitHub"
                >
                  <BrandGithub aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://fresh.deno.dev">
                  <img
                    width="170"
                    src="https://fresh.deno.dev/fresh-badge.svg"
                    alt="Made with Fresh"
                  />
                </a>
              </li>
          </ul>
          </div>
      </footer>
    </div>
  );
}
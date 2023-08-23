import { LayoutProps } from "$fresh/server.ts";
import { Navbar } from "../components/Navbar.tsx";

export default function Layout({ Component, state }: LayoutProps) {
  return (
    <div class="layout">
      <Navbar sessionId={state.sessionId as string | undefined} />
      <Component />
    </div>
  );
}
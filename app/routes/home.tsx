import type { Route } from "./+types/home";
import Main from "~/main/Main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "XChat | Home" }
  ];
}

export default function Home() {
  return <Main />;
}

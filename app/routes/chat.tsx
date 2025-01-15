import Messenger from "~/messenger/Messenger";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "XChat | Messenger" }
  ];
}

export default function Home() {
  return <Messenger />;
}

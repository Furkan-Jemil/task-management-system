import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Task Management System" },
  ];
}

export function loader() {
  return redirect("/dashboard");
}

export default function Home() {
  return null;
}

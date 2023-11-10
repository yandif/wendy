import type { MetaFunction } from "@remix-run/node";
import { Welcome } from "~/web/components/Welcome/Welcome";
import { ColorSchemeToggle } from "~/web/components/ColorSchemeToggle/ColorSchemeToggle";

export const meta: MetaFunction = () => {
  return [
    { title: "Mantine Remix App" },
    { name: "description", content: "Welcome to Mantine!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Welcome />
      <ColorSchemeToggle />
    </div>
  );
}

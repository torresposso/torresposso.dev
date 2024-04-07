import { type PageProps } from "$fresh/server.ts";
import { CSS } from "jsr:@deno/gfm@0.6";
import { Navbar } from "@/islands/Navbar.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html className="dark" lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Torres Posso | Full-stack web developer</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="bg-gray-950 text-gray-100">
        <Component />
      </body>
    </html>
  );
}

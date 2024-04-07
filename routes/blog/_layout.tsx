import { defineLayout } from "$fresh/server.ts";
import { Navbar } from "@/islands/Navbar.tsx";
import Footer from "@/islands/Footer.tsx";

export default defineLayout(async (req, ctx) => {
  return (
    <div class="p-4">
      <Navbar />

      <ctx.Component />
    </div>
  );
});

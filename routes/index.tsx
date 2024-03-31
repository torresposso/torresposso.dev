import { useSignal } from "@preact/signals";
import { Hero } from "@/islands/Hero.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Hero />
    </>
  );
}

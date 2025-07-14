import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";

export default function Home() {
  return (
    <div className="min-h-screen">
           <main>
            <Hero/>
            <About/>
           </main>
    </div>
  );
}

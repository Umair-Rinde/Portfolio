import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
           <main>
            <Hero/>
            <About/>
            <Projects/>
            <Contact/>
           </main>
    </div>
  );
}

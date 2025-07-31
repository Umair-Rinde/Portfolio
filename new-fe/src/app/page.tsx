import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CompaniesSection from "./components/Companies";

export default function Home() {
  return (
    <div className="min-h-screen">
           <main>
            <Hero/>
            <About/>
            <Projects/>
            <CompaniesSection/>
            <Contact/>
           </main>
    </div>
  );
}

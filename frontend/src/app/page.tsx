import { TechStack } from '@/components/Techstack';
import { Header } from '../components/Headers';
import { Projects } from '../components/Projects';
import { Footer } from '@/components/Footer';

const Home = () => (
  <div>
    <Header />
    <TechStack />
    <Projects />
    <Footer />
  </div>
);

export default Home;

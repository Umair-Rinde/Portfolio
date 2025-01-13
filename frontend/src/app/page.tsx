import { TechStack } from '@/components/Techstack';
import { Header } from '../components/Headers';
import { Projects } from '../components/Projects';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Home = () => (
  <GoogleOAuthProvider clientId='28690654160-cnt45tfs53cm9t0hm0ors5o3s3cj9oln.apps.googleusercontent.com'>
    <div>
      <Header />
      <TechStack />
      <Projects />
      <GoogleLoginButton />
    </div>
  </GoogleOAuthProvider>
);

export default Home;

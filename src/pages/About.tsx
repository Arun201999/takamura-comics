import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-orange-500">About Takamura Comics</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg">
              Takamura Comics is a global platform dedicated to connecting talented comic artists with passionate readers from around the world.
            </p>
            <p className="text-lg mt-4">
              Our mission is to create an inclusive space where artists can showcase their creativity, build an audience, and earn from their work, while readers can discover unique, diverse stories from creators they love.
            </p>
            <p className="text-lg mt-4">Founded in 2025, Takamura Comics has grown into a vibrant community of artists and comic enthusiasts who share a love for visual storytelling in all its forms.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default About;
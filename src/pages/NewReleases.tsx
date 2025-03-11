
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NewReleases = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">New Releases</h1>
          <p className="text-lg text-muted-foreground">
            No new releases yet. Check back soon!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewReleases;

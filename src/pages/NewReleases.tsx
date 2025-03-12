import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CalendarDays } from 'lucide-react';
const NewReleases = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-orange-500">New Releases</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The latest comics from our talented artists. Check back regularly as new content is added every day.
            </p>
          </div>
          
          <div className="flex items-center justify-center mb-16">
            <div className="bg-orange-100 dark:bg-orange-900/20 rounded-lg p-8 max-w-md text-center">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              <h2 className="text-2xl font-semibold mb-2 text-orange-500">Coming Soon!</h2>
              <p className="text-gray-900">
                No new releases yet. Artists are currently setting up their accounts and preparing their comics.
              </p>
              <p className="mt-4 text-gray-950">
                Check back soon or sign up for notifications to be alerted when new comics are published.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Upload Schedule</h2>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span>1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Artist Registration</h3>
                    <p className="text-gray-50">Artists are currently registering and setting up their profiles.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span>2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Content Creation</h3>
                    <p className="text-gray-50">Comics are being created and prepared for publication.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span>3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Initial Release</h3>
                    <p className="text-gray-50">The first wave of comics will be released soon!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default NewReleases;
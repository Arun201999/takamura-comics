
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Paintbrush, Upload, BookOpen, LineChart, Settings, AlertTriangle } from 'lucide-react';

const ArtistDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If the user is not logged in or not an artist, redirect to login
  if (!user || user.role !== 'artist') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2 text-orange-500">Artist Dashboard</h1>
            <p className="text-lg text-gray-400">
              Welcome back, {user.name}. Manage your comics and track performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-1">0</h3>
              <p className="text-gray-400">Published Comics</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-1">0</h3>
              <p className="text-gray-400">Total Views</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-1">$0.00</h3>
              <p className="text-gray-400">Earned Revenue</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-white">Upload New Comic</h2>
              <p className="text-gray-400 mb-6">
                Share your work with our growing community of readers.
                Follow the submission guidelines for the best approval rate.
              </p>
              <div className="flex gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Upload className="mr-2 h-4 w-4" /> Upload Comic
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <AlertTriangle className="mr-2 h-4 w-4" /> View Guidelines
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-white">Monetization</h2>
              <p className="text-gray-400 mb-6">
                Set up payment methods, subscription tiers, and manage how you earn 
                from your creative work.
              </p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Settings className="mr-2 h-4 w-4" /> Monetization Settings
              </Button>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Comics</h2>
              <Button variant="link" className="text-orange-500">View All</Button>
            </div>
            
            <div className="flex items-center justify-center py-12">
              <div className="text-center max-w-md">
                <Paintbrush className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">No Comics Yet</h3>
                <p className="text-gray-400 mb-6">
                  You haven't published any comics yet. Create your first comic to get started.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <BookOpen className="mr-2 h-4 w-4" /> Create New Comic
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
              <Button variant="link" className="text-orange-500">Detailed View</Button>
            </div>
            
            <div className="flex items-center justify-center py-12">
              <div className="text-center max-w-md">
                <LineChart className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">No Data Available</h3>
                <p className="text-gray-400">
                  Analytics will be available once you publish your first comic and start getting views.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArtistDashboard;

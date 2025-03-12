
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Genres = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample genres that would typically be fetched from an API
  const genres = [{
    id: 1,
    name: 'Action',
    description: 'Comics featuring intense physical action and adventure',
    color: 'bg-red-500'
  }, {
    id: 2,
    name: 'Comedy',
    description: 'Humorous stories that aim to make readers laugh',
    color: 'bg-yellow-500'
  }, {
    id: 3,
    name: 'Romance',
    description: 'Stories centered around romantic relationships',
    color: 'bg-pink-500'
  }, {
    id: 4,
    name: 'Sci-Fi',
    description: 'Comics set in futuristic or space settings with advanced technology',
    color: 'bg-blue-500'
  }, {
    id: 5,
    name: 'Fantasy',
    description: 'Stories set in magical or supernatural worlds',
    color: 'bg-purple-500'
  }, {
    id: 6,
    name: 'Horror',
    description: 'Comics designed to frighten or scare the reader',
    color: 'bg-gray-700'
  }, {
    id: 7,
    name: 'Drama',
    description: 'Character-driven stories with emotional themes',
    color: 'bg-green-500'
  }, {
    id: 8,
    name: 'Mystery',
    description: 'Stories involving solving a crime or uncovering secrets',
    color: 'bg-indigo-500'
  }];

  const handleGenreClick = (genreName: string) => {
    // Navigate to the genre-specific page
    navigate(`/explore?genre=${genreName.toLowerCase()}`);
  };

  return <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-orange-500 text-center">Comics by Genre</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Explore comics across different genres. Click on a genre to discover related comics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {genres.map(genre => <div key={genre.id} className="bg-zinc-900 rounded-lg shadow-sm overflow-hidden border border-zinc-800 hover:shadow-md transition-shadow">
                <div className={`h-3 ${genre.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{genre.name}</h3>
                  <p className="text-gray-400 mb-4">{genre.description}</p>
                  <Button 
                    variant="link" 
                    className="text-orange-500 font-medium hover:text-orange-600 transition-colors p-0"
                    onClick={() => handleGenreClick(genre.name)}
                  >
                    Browse {genre.name} Comics
                  </Button>
                </div>
              </div>)}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Note: No comics have been uploaded yet. Genres will be populated with content once artists begin uploading.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Genres;

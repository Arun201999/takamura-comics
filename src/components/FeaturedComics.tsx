import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComicCard, { Comic } from './ComicCard';

export interface Comic {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  authorId: string;
  views: number;
  rating: number;
  chapters: number;
  genres: string[];
  isNew?: boolean;
  lastUpdated: string;
}

interface FeaturedComicsProps {
  title?: string;
  viewAllLink?: string;
  limit?: number;
  featured?: boolean;
}

const FeaturedComics = ({
  title = "Featured Comics",
  viewAllLink = "/explore",
  limit = 6,
  featured = false
}: FeaturedComicsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const comics: Comic[] = []; // Empty array instead of mock data

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <Link
            to={viewAllLink}
            className="text-sm font-medium flex items-center gap-1 hover:text-primary"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {comics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No comics available yet. Comics will appear here once artists start uploading their work.
            </p>
          </div>
        ) : (
          <div 
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${featured ? '3' : '6'} gap-4 md:gap-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            {comics.map((comic, index) => (
              <div
                key={comic.id}
                className={`transition-all duration-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ComicCard comic={comic} featured={featured} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedComics;


import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComicCard, { Comic } from './ComicCard';

// Mock data for demo
const MOCK_COMICS: Comic[] = [
  {
    id: '1',
    title: 'The Shadow Chronicles',
    coverImage: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    author: 'Akira Tanaka',
    authorId: 'author1',
    views: 125000,
    rating: 4.9,
    chapters: 45,
    genres: ['Action', 'Fantasy', 'Drama'],
    isNew: true,
    lastUpdated: '2d ago'
  },
  {
    id: '2',
    title: 'Cyber Ronin',
    coverImage: 'https://images.unsplash.com/photo-1601513237233-e8e3fca71991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    author: 'Hikaru Sato',
    authorId: 'author2',
    views: 89000,
    rating: 4.7,
    chapters: 32,
    genres: ['Sci-Fi', 'Cyberpunk', 'Action'],
    lastUpdated: '1w ago'
  },
  {
    id: '3',
    title: 'Spirit Garden',
    coverImage: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    author: 'Yuna Kim',
    authorId: 'author3',
    views: 65000,
    rating: 4.8,
    chapters: 28,
    genres: ['Fantasy', 'Romance', 'Supernatural'],
    isNew: true,
    lastUpdated: '3d ago'
  },
  {
    id: '4',
    title: 'Midnight Detective',
    coverImage: 'https://images.unsplash.com/photo-1604631806268-bed206afa100?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    author: 'Kenji Watanabe',
    authorId: 'author4',
    views: 52000,
    rating: 4.6,
    chapters: 21,
    genres: ['Mystery', 'Crime', 'Drama'],
    lastUpdated: '5d ago'
  },
  {
    id: '5',
    title: 'Battle Academy',
    coverImage: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    author: 'Haruki Matsumoto',
    authorId: 'author5',
    views: 78000,
    rating: 4.5,
    chapters: 56,
    genres: ['Action', 'School Life', 'Comedy'],
    lastUpdated: '2w ago'
  },
  {
    id: '6',
    title: 'Yokai Tales',
    coverImage: 'https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    author: 'Sakura Ishikawa',
    authorId: 'author6',
    views: 42000,
    rating: 4.7,
    chapters: 19,
    genres: ['Horror', 'Supernatural', 'Historical'],
    isNew: true,
    lastUpdated: '1d ago'
  }
];

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
  const comics = MOCK_COMICS.slice(0, limit);

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
      </div>
    </section>
  );
};

export default FeaturedComics;

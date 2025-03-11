
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Star, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

interface ComicCardProps {
  comic: Comic;
  featured?: boolean;
}

const ComicCard = ({ comic, featured = false }: ComicCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/comic/${comic.id}`} 
      className={`block rounded-lg overflow-hidden hover-lift group ${
        featured ? 'h-full' : ''
      }`}
    >
      <div className="relative">
        <AspectRatio ratio={featured ? 3/4 : 2/3} className="bg-muted/30">
          <div className={`absolute inset-0 bg-muted/50 backdrop-blur-sm ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
          <img
            src={comic.coverImage}
            alt={comic.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </AspectRatio>
        
        {comic.isNew && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-semibold">
            NEW
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-90 group-hover:opacity-100 transition-opacity">
          <h3 className="font-semibold truncate text-sm md:text-base">
            {comic.title}
          </h3>
          <p className="text-xs text-white/80 mt-1 truncate">by {comic.author}</p>
        </div>
      </div>

      <div className="p-3 bg-card">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{comic.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-3 w-3 mr-1 text-amber-500" />
            <span>{comic.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{comic.lastUpdated}</span>
          </div>
        </div>
        
        {featured && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1 mt-2">
              {comic.genres.slice(0, 3).map((genre) => (
                <span key={genre} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                  {genre}
                </span>
              ))}
              {comic.genres.length > 3 && (
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                  +{comic.genres.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ComicCard;

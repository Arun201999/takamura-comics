
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Upload } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background z-10 rounded-none"></div>
        <img src="/lovable-uploads/d66d05c5-316d-4ed9-b9bc-667b1749612d.png" alt="Hero background" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-lime-50">
            Where Comic Artists <span className="text-lime-50">Thrive</span>
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto font-bold text-slate-50 md:text-xl">
            Takamura Comics connects talented artists with passionate readers. Share your art, build your audience, and earn from your creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="gap-2 px-8 py-6 text-base font-medium bg-red-700 hover:bg-red-600">
                Explore Comics
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            {user && user.role === 'artist' ? (
              <Link to="/dashboard/upload">
                <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-base font-medium bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/20">
                  Upload Comic
                  <Upload className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/join">
                <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-base font-medium bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/20">
                  Join as Artist
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

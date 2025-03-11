
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Where Comic Artists <span className="text-primary-foreground">Thrive</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Takamura Comics connects talented artists with passionate readers. Share your art, build your audience, and earn from your creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="gap-2 px-8 py-6 text-base font-medium">
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

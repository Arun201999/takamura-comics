
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange-50 dark:bg-orange-950/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-orange-500">TAKAMURA COMICS</h2>
            <p className="text-sm text-muted-foreground">
              Empowering comic artists to share their work and connect with readers worldwide.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
              >
                <Facebook className="h-5 w-5 text-orange-600" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
              >
                <Twitter className="h-5 w-5 text-orange-600" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
              >
                <Instagram className="h-5 w-5 text-orange-600" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-orange-600">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/explore" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Browse Comics
                </Link>
              </li>
              <li>
                <Link to="/top" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/new" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Genres
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-orange-600">For Artists</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/join" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Join as Artist
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Artist Dashboard
                </Link>
              </li>
              <li>
                <Link to="/monetization" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Monetization
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Submission Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-orange-600">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-orange-200/50 dark:border-orange-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Takamura Comics. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-orange-500 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-orange-500 transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-xs text-muted-foreground hover:text-orange-500 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const Header = () => {
  const {
    user,
    logout
  } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  return <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10 transition-all duration-300 ${isScrolled ? 'bg-black/80 dark:bg-black/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-red-700">TAKAMURA COMICS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Explore
          </Link>
          <Link to="/top" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Top Rated
          </Link>
          <Link to="/new" className="text-sm font-medium hover:text-orange-500 transition-colors">
            New Releases
          </Link>
          <Link to="/genres" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Genres
          </Link>
          {user?.role === 'artist' && <Link to="/dashboard" className="text-sm font-medium hover:text-orange-500 transition-colors">
              Artist Dashboard
            </Link>}
        </nav>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-1">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">Profile</Link>
                </DropdownMenuItem>
                {user.role === 'artist' && <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
                  </DropdownMenuItem>}
                <DropdownMenuItem asChild>
                  <Link to="/bookmarks" className="cursor-pointer w-full">Bookmarks</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <Link to="/login">
              <Button variant="black" className="flex items-center space-x-2 hover:text-orange-500">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center justify-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 top-16 bg-black z-40 animate-in slide-down">
          <nav className="flex flex-col p-6 space-y-4">
            <Link to="/" className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors">
              Explore
            </Link>
            <Link to="/top" className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors">
              Top Rated
            </Link>
            <Link to="/new" className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors">
              New Releases
            </Link>
            <Link to="/genres" className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors">
              Genres
            </Link>
            {user?.role === 'artist' && <Link to="/dashboard" className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors">
                Artist Dashboard
              </Link>}
            <div className="pt-4 border-t">
              {user ? <>
                  <div className="flex items-center space-x-3 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <Link to="/profile" className="block text-sm p-2 hover:bg-secondary rounded-md transition-colors">
                      Profile
                    </Link>
                    <Link to="/bookmarks" className="block text-sm p-2 hover:bg-secondary rounded-md transition-colors">
                      Bookmarks
                    </Link>
                    <button onClick={() => logout()} className="block w-full text-left text-sm p-2 hover:bg-secondary rounded-md transition-colors">
                      Log out
                    </button>
                  </div>
                </> : <Link to="/login" className="block">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Sign In</Button>
                </Link>}
            </div>
          </nav>
        </div>}
    </header>;
};
export default Header;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Join = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Join as an Artist</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Share your comics with the world and build your audience on Takamura Comics.
          </p>
          {!user ? (
            <Button size="lg" onClick={() => navigate('/login')}>
              Sign up to get started
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-lg">Welcome! You're logged in as {user.name}.</p>
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;

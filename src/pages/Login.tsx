
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If user is already logged in, redirect
  if (!isLoading && user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <AuthModal redirectPath={redirectPath} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;

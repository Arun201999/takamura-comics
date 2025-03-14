
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Facebook, Twitter, Mail, AlertCircle, Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AuthModalProps {
  defaultTab?: 'login' | 'register';
  redirectPath?: string;
}

const AuthModal = ({ defaultTab = 'login', redirectPath = '/' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('reader');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showProviderError, setShowProviderError] = useState(false);
  
  const { loginWithGoogle, loginWithFacebook, loginWithTwitter, loginWithEmail, registerWithEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShowProviderError(false);

    try {
      await loginWithEmail(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate(redirectPath);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setShowProviderError(false);

    try {
      await registerWithEmail(email, password, name, role);
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      setActiveTab('login');
    } catch (err: any) {
      console.error('Registration error:', err);
      let errorMessage = err.message || 'Failed to create account';
      
      if (errorMessage.includes('User already registered')) {
        errorMessage = 'This email is already registered. Please log in instead.';
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter') => {
    setIsLoading(true);
    setError('');
    setShowProviderError(false);

    try {
      switch (provider) {
        case 'google':
          await loginWithGoogle();
          break;
        case 'facebook':
          await loginWithFacebook();
          break;
        case 'twitter':
          await loginWithTwitter();
          break;
      }
    } catch (err: any) {
      console.error(`${provider} login error:`, err);
      
      // Check for the specific provider not enabled error
      if (err.message?.includes('provider is not enabled') || 
          err.error_code === 'validation_failed' ||
          err.msg?.includes('provider is not enabled')) {
        setShowProviderError(true);
        setError(`${provider} login is not properly configured. Please contact support.`);
      } else {
        setError(`Failed to login with ${provider}`);
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || `There was an error signing in with ${provider}. Please try again.`,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Welcome to Takamura Comics</h2>
        <p className="text-muted-foreground mt-2">
          {activeTab === 'login' ? 'Sign in to continue' : 'Create your account'}
        </p>
      </div>

      {showProviderError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Provider Error</AlertTitle>
          <AlertDescription>
            The selected authentication provider is not enabled in your Supabase project. 
            Please enable it in the Supabase dashboard under Authentication → Providers.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue={defaultTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-6 animate-in fade-in-50">
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5" />
              <span>Continue with Google</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
            >
              <Facebook className="h-5 w-5 text-blue-600" />
              <span>Continue with Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('twitter')}
              disabled={isLoading}
            >
              <Twitter className="h-5 w-5 text-blue-400" />
              <span>Continue with Twitter</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a 
                  href="#" 
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && !showProviderError && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="register" className="space-y-6 animate-in fade-in-50">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input 
                id="register-email" 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input 
                id="register-password" 
                type="password" 
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reader" id="reader" />
                  <Label htmlFor="reader">Reader</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="artist" id="artist" />
                  <Label htmlFor="artist">Comic Artist</Label>
                </div>
              </RadioGroup>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5" />
              <span>Sign up with Google</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
            >
              <Facebook className="h-5 w-5 text-blue-600" />
              <span>Sign up with Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('twitter')}
              disabled={isLoading}
            >
              <Twitter className="h-5 w-5 text-blue-400" />
              <span>Sign up with Twitter</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-xs text-center text-muted-foreground">
        By continuing, you agree to our{' '}
        <a href="/terms" className="underline underline-offset-2 hover:text-foreground">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default AuthModal;

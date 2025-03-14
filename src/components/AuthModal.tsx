
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail, AlertCircle, LockIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AuthModalProps {
  defaultTab?: 'login' | 'register';
  redirectPath?: string;
}

const AuthModal = ({
  defaultTab = 'login',
  redirectPath = '/'
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('reader');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithEmail, registerWithEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form validation states
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    name: ''
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (isLogin = false) => {
    const errors = {
      email: '',
      password: '',
      name: ''
    };
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!isLogin && !name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    setIsLoading(true);
    setError('');
    
    try {
      await loginWithEmail(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in."
      });
      navigate(redirectPath);
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email before logging in. Check your inbox for a verification link.';
      } else if (err.error_code === 'validation_failed') {
        errorMessage = 'Authentication service error. Please try again later.';
      } else {
        errorMessage = err.message || 'An error occurred during login. Please try again.';
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(false)) return;

    setIsLoading(true);
    setError('');
    
    try {
      await registerWithEmail(email, password, name, role);
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account. Check your spam folder if you don't see it."
      });
      setActiveTab('login');
    } catch (err: any) {
      console.error('Registration error:', err);
      let errorMessage = err.message || 'Failed to create account';
      
      if (errorMessage.includes('User already registered')) {
        errorMessage = 'This email is already registered. Please log in instead.';
      } else if (err.error_code === 'validation_failed') {
        errorMessage = 'Registration failed. Please try a different email or try again later.';
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage
      });
    } finally {
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

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs 
        defaultValue={defaultTab} 
        onValueChange={v => setActiveTab(v as 'login' | 'register')}
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-6 animate-in fade-in-50">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className={`pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                  required 
                />
              </div>
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:text-primary/80" onClick={e => {
                  e.preventDefault();
                  toast({
                    title: "Password Reset",
                    description: "This feature is coming soon. Please contact support if you forgot your password."
                  });
                }}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className={`pl-10 ${formErrors.password ? 'border-red-500' : ''}`}
                  required 
                />
              </div>
              {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <button 
                className="text-primary hover:underline" 
                onClick={() => setActiveTab('register')}
              >
                Register now
              </button>
            </p>
          </div>
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
                onChange={e => setName(e.target.value)} 
                className={formErrors.name ? 'border-red-500' : ''}
                required 
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className={`pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                  required 
                />
              </div>
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="register-password" 
                  type="password" 
                  placeholder="Create a password (min. 6 characters)" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className={`pl-10 ${formErrors.password ? 'border-red-500' : ''}`}
                  required 
                  minLength={6} 
                />
              </div>
              {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup value={role} onValueChange={value => setRole(value as UserRole)}>
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account? <button 
                className="text-primary hover:underline" 
                onClick={() => setActiveTab('login')}
              >
                Sign in instead
              </button>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              By registering, you'll need to verify your email before logging in.
            </p>
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

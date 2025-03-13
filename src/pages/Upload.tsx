
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload as UploadIcon, ImageIcon, FileText, FileUp } from 'lucide-react';

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not an artist
  useEffect(() => {
    if (!user) {
      navigate('/login');
      toast({
        title: "Access Denied",
        description: "Please login to access this page.",
        variant: "destructive"
      });
    } else if (user.role !== 'artist') {
      navigate('/');
      toast({
        title: "Artists Only",
        description: "This page is only available to artists.",
        variant: "destructive"
      });
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [user, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Comic Uploaded!",
      description: "Your comic has been successfully uploaded and is pending review.",
    });
    // In a real app, you would handle the upload logic here
  };

  if (!user || user.role !== 'artist') {
    return null; // Prevent flash of content before redirect
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-red-500">Upload Comic</h1>
            <p className="text-slate-300">Share your creativity with our community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Comic Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter comic title" 
                  className="bg-zinc-900 border-zinc-700 text-white"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell readers about your comic..." 
                  className="bg-zinc-900 border-zinc-700 text-white min-h-[120px]"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="genre" className="text-white">Genre</Label>
                <select 
                  id="genre"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
                  required
                >
                  <option value="">Select Genre</option>
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="horror">Horror</option>
                  <option value="romance">Romance</option>
                  <option value="sci-fi">Science Fiction</option>
                  <option value="slice-of-life">Slice of Life</option>
                </select>
              </div>
              
              <div>
                <Label className="text-white mb-2 block">Cover Image</Label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center bg-zinc-900/50">
                  <div className="flex flex-col items-center">
                    <ImageIcon className="h-12 w-12 text-zinc-500 mb-4" />
                    <p className="text-zinc-400 mb-2">Drag and drop or click to upload</p>
                    <p className="text-xs text-zinc-500 mb-4">PNG, JPG, GIF up to 5MB</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      Select Image
                    </Button>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
              
              <div>
                <Label className="text-white mb-2 block">Comic Files</Label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center bg-zinc-900/50">
                  <div className="flex flex-col items-center">
                    <FileText className="h-12 w-12 text-zinc-500 mb-4" />
                    <p className="text-zinc-400 mb-2">Drag and drop or click to upload comic pages</p>
                    <p className="text-xs text-zinc-500 mb-4">PNG, JPG up to 10MB each</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      Select Files
                    </Button>
                  </div>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-zinc-800">
              <Button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto gap-2"
                size="lg"
              >
                <UploadIcon className="h-4 w-4" />
                Upload Comic
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;

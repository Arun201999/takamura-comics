
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  BarChart, 
  Upload, 
  Library, 
  DollarSign, 
  Settings, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  Bookmark
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { BarChart as Chart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip } from 'recharts';

// Mock data for the dashboard
const viewsData = [
  { name: 'Mon', views: 400 },
  { name: 'Tue', views: 300 },
  { name: 'Wed', views: 500 },
  { name: 'Thu', views: 280 },
  { name: 'Fri', views: 590 },
  { name: 'Sat', views: 800 },
  { name: 'Sun', views: 700 }
];

const myComics = [
  {
    id: '1',
    title: 'The Shadow Chronicles',
    coverImage: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    chapters: 45,
    views: 125000,
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    title: 'Cyber Ronin',
    coverImage: 'https://images.unsplash.com/photo-1601513237233-e8e3fca71991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    chapters: 32,
    views: 89000,
    lastUpdated: '1 week ago'
  }
];

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If user is not an artist, redirect to home
  if (!isLoading && (!user || user.role !== 'artist')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Artist Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your comics, track performance, and grow your audience
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload New Comic</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="comics" className="flex items-center gap-2">
                <Library className="h-4 w-4" />
                <span>My Comics</span>
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Earnings</span>
              </TabsTrigger>
              <TabsTrigger value="audience" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Audience</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 animate-in fade-in-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">214,358</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 18%</span> vs last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">$3,249.50</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 12%</span> vs last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Bookmarks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Bookmark className="h-4 w-4 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">1,875</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 7%</span> vs last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Published Comics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Library className="h-4 w-4 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">2</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-blue-500">+ 1</span> this month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Views</CardTitle>
                  <CardDescription>How your comics performed this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <Chart data={viewsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="hsl(var(--primary))" />
                      </Chart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Comics</CardTitle>
                    <CardDescription>Recently published content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {myComics.map(comic => (
                      <div key={comic.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                        <img 
                          src={comic.coverImage} 
                          alt={comic.title} 
                          className="h-16 w-12 object-cover rounded-sm"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{comic.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {comic.chapters} chapters • {comic.views.toLocaleString()} views
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated {comic.lastUpdated}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">View All Comics</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>To-Do List</CardTitle>
                    <CardDescription>Things to improve your presence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <TrendingUp className="h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Optimize your profile</h4>
                          <p className="text-xs text-muted-foreground">
                            Add a bio and profile picture to attract more readers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Calendar className="h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Maintain consistent uploads</h4>
                          <p className="text-xs text-muted-foreground">
                            Set a publication schedule to build reader loyalty.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Users className="h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Engage with your audience</h4>
                          <p className="text-xs text-muted-foreground">
                            Respond to comments to build community around your work.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Placeholder for other tabs */}
            <TabsContent value="comics" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>My Comics</CardTitle>
                  <CardDescription>Manage your published comics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">This tab would contain a full list of your comics with management options.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Dashboard</CardTitle>
                  <CardDescription>Track your revenue from ad impressions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">This tab would show detailed earnings reports and payment history.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Analytics</CardTitle>
                  <CardDescription>Understand your readers better</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">This tab would show demographic data and engagement metrics about your audience.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your artist profile and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">This tab would contain account settings, payment information, and notification preferences.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

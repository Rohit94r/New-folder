"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, Calendar, MessageSquare, ThumbsUp, CheckCircle, Mail, Phone, Search, Plus, MapPin, Clock, X } from "lucide-react"
import { useState, useEffect } from "react"
import { communityAPI } from "@/lib/api"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

interface ProjectFridayStory {
  _id: string
  studentName: string
  branch: string
  year: string
  description: string
  helpReceived: string
  contactInfo?: {
    email: string
    phone: string
  }
  isVerified: boolean
  likes: { user: string }[]
  comments: {
    user: string
    text: string
    createdAt: string
  }[]
  createdAt: string
}

interface Post {
  _id: string
  title: string
  content: string
  category: string
  author: {
    name: string
  }
  likes: number
  comments: number
  posted: string
  image?: string
}

interface LostFoundItem {
  _id: string
  title: string
  description: string
  category: string
  location: string
  contactInfo: {
    email?: string
    phone?: string
  }
  status: 'Lost' | 'Found' | 'Returned'
  postedBy: string
  createdAt: string
}

export default function CommunityPage() {
  const { isLoggedIn, login } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("discussions")
  const [stories, setStories] = useState<ProjectFridayStory[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // Modal states
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [isReportItemModalOpen, setIsReportItemModalOpen] = useState(false)
  const [isShareStoryModalOpen, setIsShareStoryModalOpen] = useState(false)

  useEffect(() => {
    // Only fetch data if user is logged in
    if (!isLoggedIn) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch community posts
        const postsData = await communityAPI.getPosts()
        setPosts(postsData)
        
        // Fetch Project Friday stories
        const storiesData = await communityAPI.getStories()
        setStories(storiesData)
        
        // Filter lost and found items
        const lostFound = postsData.filter((post: Post) => 
          post.category === 'LostAndFound'
        )
        setLostFoundItems(lostFound)
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load community data. Please try again later."
        setError(errorMessage)
        console.error("Error fetching community data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isLoggedIn])

  // Handle login (in a real app, this would involve actual authentication)
  const handleLogin = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()
    
    // In a real app, you would call the login API and then update context
    // For now, we'll just simulate a successful login
    console.log('Login button clicked!')
    console.log('Email:', email)
    console.log('Password:', password)
    
    login({
      _id: "123",
      name: email.split('@')[0] || "John Doe",
      email: email || "john@example.com",
      role: "student"
    })
  }

  // Handle Create Post button click
  const handleCreatePost = () => {
    setIsCreatePostModalOpen(true)
  }

  // Handle Report Item button click
  const handleReportItem = () => {
    setIsReportItemModalOpen(true)
  }

  // Handle Share Story button click
  const handleShareStory = () => {
    setIsShareStoryModalOpen(true)
  }

  // Handle View College Events button click
  const handleViewCollegeEvents = () => {
    // Navigate to events page
    router.push('/events')
  }

  // Close all modals
  const closeAllModals = () => {
    setIsCreatePostModalOpen(false)
    setIsReportItemModalOpen(false)
    setIsShareStoryModalOpen(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-foreground mb-2">Student Community</h1>
                <p className="text-muted-foreground">
                  Join the community to share experiences, find help, and connect with fellow students
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">College Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your college email"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="college-id"
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="college-id" className="ml-2 text-sm text-foreground">
                    I have uploaded my college ID for verification
                  </label>
                </div>
                
                <Button 
                  type="button"
                  onClick={handleLogin} 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Login to Community
                </Button>
                
                <div className="text-center text-sm">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <button className="text-primary hover:underline">
                      Register
                    </button>
                  </p>
                </div>
              </div>
            </Card>
            
            <div className="mt-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">Why Join Our Community?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Connect</h3>
                  <p className="text-sm text-muted-foreground">Meet fellow students</p>
                </Card>
                <Card className="p-4">
                  <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Share</h3>
                  <p className="text-sm text-muted-foreground">Exchange experiences</p>
                </Card>
                <Card className="p-4">
                  <ThumbsUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Help</h3>
                  <p className="text-sm text-muted-foreground">Get support when needed</p>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-foreground">Loading community...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Community</h1>
            <p className="text-muted-foreground mt-2">
              Connect, share, and help fellow students
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search community..."
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button 
              className="gap-2 bg-primary text-primary-foreground"
              onClick={handleCreatePost}
            >
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="project-friday">Project Friday</TabsTrigger>
            <TabsTrigger value="lost-found">Lost & Found</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {posts.filter(post => post.category !== 'LostAndFound').length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No discussions yet</h3>
                    <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
                    <Button 
                      className="gap-2 bg-primary text-primary-foreground"
                      onClick={handleCreatePost}
                    >
                      <Plus className="w-4 h-4" />
                      Create Post
                    </Button>
                  </div>
                ) : (
                  posts.filter(post => post.category !== 'LostAndFound').map((post) => (
                    <Card key={post._id} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{post.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">by {post.author.name}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{post.posted}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      
                      <p className="text-foreground mb-4">{post.content}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold text-foreground mb-4">Top Contributors</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {item}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Student {item}</p>
                          <p className="text-sm text-muted-foreground">{10 - item} posts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-bold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <ThumbsUp className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Rajesh</span> liked your post
                        </p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MessageSquare className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Priya</span> commented on your post
                        </p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="project-friday" className="mt-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Project Friday</h2>
                  <p className="text-muted-foreground mt-2">
                    Success stories of students who got help through our community
                  </p>
                </div>
                <Button 
                  className="gap-2 bg-primary text-primary-foreground"
                  onClick={handleShareStory}
                >
                  <Plus className="w-4 h-4" />
                  Share Your Story
                </Button>
              </div>
            </div>
            
            {stories.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No stories yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to share your success story!</p>
                <Button 
                  className="gap-2 bg-primary text-primary-foreground"
                  onClick={handleShareStory}
                >
                  <Plus className="w-4 h-4" />
                  Share Your Story
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stories.map((story) => (
                  <Card key={story._id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{story.studentName}</h3>
                        <p className="text-muted-foreground">{story.branch}, Year {story.year}</p>
                      </div>
                      {story.isVerified && (
                        <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2">Challenge Faced</h4>
                      <p className="text-foreground">{story.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2">Help Received</h4>
                      <p className="text-foreground">{story.helpReceived}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{story.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                          <MessageSquare className="w-4 h-4" />
                          <span>{story.comments.length}</span>
                        </button>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="lost-found" className="mt-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Lost & Found</h2>
                  <p className="text-muted-foreground mt-2">
                    Help fellow students find their lost items or report found items
                  </p>
                </div>
                <Button 
                  className="gap-2 bg-primary text-primary-foreground"
                  onClick={handleReportItem}
                >
                  <Plus className="w-4 h-4" />
                  Report Item
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Items Returned</div>
                  <div className="text-xs text-muted-foreground">This week</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Active Cases</div>
                  <div className="text-xs text-muted-foreground">Currently searching</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">85%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="text-xs text-muted-foreground">Items recovered</div>
                </Card>
              </div>
            </div>
            
            {lostFoundItems.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No items reported</h3>
                <p className="text-muted-foreground mb-4">Be the first to report a lost or found item!</p>
                <Button 
                  className="gap-2 bg-primary text-primary-foreground"
                  onClick={handleReportItem}
                >
                  <Plus className="w-4 h-4" />
                  Report Item
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lostFoundItems.map((item) => (
                  <Card key={item._id} className="overflow-hidden">
                    <div className={`p-3 text-center text-white font-semibold ${
                      item.status === 'Lost' ? 'bg-red-500' : 
                      item.status === 'Found' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {item.status}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-foreground mb-4">{item.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {item.contactInfo?.email && (
                          <Button variant="outline" size="sm" className="gap-1 flex-1">
                            <Mail className="w-4 h-4" />
                            Email
                          </Button>
                        )}
                        {item.contactInfo?.phone && (
                          <Button variant="outline" size="sm" className="gap-1 flex-1">
                            <Phone className="w-4 h-4" />
                            Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="events" className="mt-6">
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Events Calendar</h3>
              <p className="text-muted-foreground mb-4">Coming soon! Check back later for community events.</p>
              <Button 
                variant="outline" 
                onClick={handleViewCollegeEvents}
              >
                View College Events
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Create Post Modal */}
      {isCreatePostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Create New Post</h3>
              <button 
                onClick={() => setIsCreatePostModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="General">General Discussion</option>
                    <option value="Help">Help Needed</option>
                    <option value="Resource">Resource Sharing</option>
                    <option value="LostAndFound">Lost & Found</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Content</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Write your post content here..."
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsCreatePostModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-primary text-primary-foreground"
                    onClick={() => {
                      console.log("Post created");
                      setIsCreatePostModalOpen(false);
                    }}
                  >
                    Create Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Report Item Modal */}
      {isReportItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Report Lost/Found Item</h3>
              <button 
                onClick={() => setIsReportItemModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Item Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Black Wallet, Blue Water Bottle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Where was it lost/found?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe the item and circumstances..."
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsReportItemModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-primary text-primary-foreground"
                    onClick={() => {
                      console.log("Item reported");
                      setIsReportItemModalOpen(false);
                    }}
                  >
                    Report Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Share Story Modal */}
      {isShareStoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Share Your Story</h3>
              <button 
                onClick={() => setIsShareStoryModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Branch</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Computer Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Year</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Challenge Faced</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe the challenge you faced..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Help Received</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How did the community help you?"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsShareStoryModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-primary text-primary-foreground"
                    onClick={() => {
                      console.log("Story shared");
                      setIsShareStoryModalOpen(false);
                    }}
                  >
                    Share Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
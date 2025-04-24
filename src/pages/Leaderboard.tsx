import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { posts } from "@/data/dummy-data";
import { Post, TimeFrame, SortBy } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Leaderboard = () => {
  const [sortBy, setSortBy] = useState<SortBy>("upvotes");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("all");
  const [leaderboardPosts, setLeaderboardPosts] = useState<Post[]>(
    // Only include published posts
    posts.filter(post => post.status === 'published')
      .sort((a, b) => b.upvotes - a.upvotes)
  );
  
  const handleSortChange = (value: string) => {
    const sort = value as SortBy;
    setSortBy(sort);
    
    // Sort the posts based on the selected sort option
    const sortedPosts = [...leaderboardPosts].sort((a, b) => 
      sort === "upvotes" ? b.upvotes - a.upvotes : b.views - a.views
    );
    
    setLeaderboardPosts(sortedPosts);
  };
  
  const handleTimeFrameChange = (value: string) => {
    const time = value as TimeFrame;
    setTimeFrame(time);
    
    // Apply time filter (in a real app, this would filter based on post date)
    // For this demo, we'll just keep the original sorting
    const filteredPosts = posts.filter(post => post.status === 'published')
      .sort((a, b) => sortBy === "upvotes" ? b.upvotes - a.upvotes : b.views - a.views);
    
    setLeaderboardPosts(filteredPosts);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Top Posts Leaderboard</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover the most popular content on BlogNest based on upvotes and views.
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upvotes">Upvotes</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Time:</span>
              <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {leaderboardPosts.length} posts
          </div>
        </div>
        
        <div className="space-y-6">
          {leaderboardPosts.map((post, index) => (
            <Link 
              to={`/post/${post.id}`} 
              key={post.id} 
              className="block group"
            >
              <div className="flex gap-6 p-4 rounded-2xl border bg-card hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 flex items-center justify-center w-8">
                  <span className={`text-lg font-bold ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                    #{index + 1}
                  </span>
                </div>
                
                <div className="hidden md:block flex-shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags && post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <img 
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    <span>{post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.description}
                  </p>
                  
                  <div className="flex gap-5">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-sm">{post.upvotes} upvotes</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{post.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;

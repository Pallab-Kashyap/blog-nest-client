
import { Post } from "@/types";
import { Link } from "react-router-dom";
import { ArrowUp, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const [saved, setSaved] = useState(post.saved || false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!upvoted) {
      setUpvotes(upvotes + 1);
      setUpvoted(true);
    } else {
      setUpvotes(upvotes - 1);
      setUpvoted(false);
    }
  };

  return (
    <Link to={`/post/${post.id}`} className="group">
      <div className="overflow-hidden rounded-2xl border bg-card hover:shadow-md transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        <div className="flex flex-col flex-grow p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center space-x-1">
              <img 
                src={post.author.avatar}
                alt={post.author.name}
                className="rounded-full w-6 h-6"
              />
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>
            <div className="text-muted-foreground text-xs">•</div>
            <div className="text-muted-foreground text-xs">{post.readingTime} min read</div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-accent"
                onClick={handleUpvote}
              >
                <ArrowUp 
                  className={`h-5 w-5 ${upvoted ? 'text-primary' : 'text-muted-foreground'}`}
                />
                <span className="ml-1 text-sm">{upvotes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-accent"
                onClick={handleSave}
              >
                {saved ? (
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                ) : (
                  <BookmarkPlus className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}


import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowUp, BookmarkPlus, BookmarkCheck, Twitter, Linkedin, Github } from "lucide-react";
import { posts } from "@/data/dummy-data";
import { Post, Comment } from "@/types";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Simple Markdown renderer component 
function MarkdownContent({ content }: { content: string }) {
  // This is a very simple markdown renderer
  // In a real application, you'd use a library like react-markdown
  const processedContent = content
    // Headers
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold my-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold my-2">$1</h3>')
    // Code blocks
    .replace(/```([^`]+)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    // Paragraphs
    .replace(/^(?!<h|<pre|<ul|<ol)(.+)$/gm, '<p class="my-2">$1</p>')
    // New lines
    .replace(/\n\n/g, '<br/>');

  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
}

// Comment component
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-sm">{comment.content}</p>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{comment.upvotes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              Reply
            </Button>
          </div>
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-5 mt-4 border-l-2 pl-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        setSaved(foundPost.saved || false);
        setUpvotes(foundPost.upvotes);
      }
      setLoading(false);
    }, 300);
  }, [id]);

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleUpvote = () => {
    if (!upvoted) {
      setUpvotes(upvotes + 1);
      setUpvoted(true);
    } else {
      setUpvotes(upvotes - 1);
      setUpvoted(false);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the comment to an API
    console.log("Submitting comment:", commentText);
    setCommentText("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <div className="text-xl">Post not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="container max-w-4xl py-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
              <div className="flex items-center gap-2">
                <img 
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="rounded-full w-8 h-8"
                />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <div className="text-muted-foreground">•</div>
              <div className="text-muted-foreground">{post.readingTime} min read</div>
              <div className="text-muted-foreground">•</div>
              <div className="text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{post.description}</p>
          </header>
          
          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="prose dark:prose-invert max-w-none mb-10">
            <MarkdownContent content={post.content} />
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Interaction buttons */}
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={handleUpvote}
                className="flex items-center gap-2"
              >
                <ArrowUp className={`h-5 w-5 ${upvoted ? 'text-primary' : ''}`} />
                <span>{upvotes}</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                {saved ? (
                  <>
                    <BookmarkCheck className="h-5 w-5 text-primary" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-5 w-5" />
                    <span>Save</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          {/* Author section */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 rounded-2xl bg-muted/40 mb-10">
            <img 
              src={post.author.avatar}
              alt={post.author.name}
              className="rounded-full w-16 h-16"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">{post.author.name}</h3>
              {post.author.bio && (
                <p className="text-muted-foreground mb-3">{post.author.bio}</p>
              )}
              {post.author.socialLinks && (
                <div className="flex items-center gap-3">
                  {post.author.socialLinks.twitter && (
                    <a 
                      href={post.author.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {post.author.socialLinks.linkedin && (
                    <a 
                      href={post.author.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {post.author.socialLinks.github && (
                    <a 
                      href={post.author.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Comments section */}
          <section id="comments">
            <h2 className="text-xl font-semibold mb-6">
              Comments ({post.comments.length})
            </h2>
            
            {/* New comment form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
              <Textarea 
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="mb-3"
                rows={3}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!commentText.trim()}>
                  Post Comment
                </Button>
              </div>
            </form>
            
            {/* Comment list */}
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default PostDetail;

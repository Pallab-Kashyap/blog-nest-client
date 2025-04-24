
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { myPosts } from "@/data/dummy-data";
import { Post } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow
} from "@/components/ui/table";

const MyPosts = () => {
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [posts, setPosts] = useState<Post[]>(myPosts);
  
  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.status === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">My Posts</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex rounded-lg overflow-hidden border">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'} 
                className="rounded-none border-0 flex-1"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'draft' ? 'default' : 'outline'} 
                className="rounded-none border-0 flex-1"
                onClick={() => setFilter('draft')}
              >
                Drafts
              </Button>
              <Button
                variant={filter === 'published' ? 'default' : 'outline'} 
                className="rounded-none border-0 flex-1"
                onClick={() => setFilter('published')}
              >
                Published
              </Button>
              <Button
                variant={filter === 'archived' ? 'default' : 'outline'} 
                className="rounded-none border-0 flex-1"
                onClick={() => setFilter('archived')}
              >
                Archived
              </Button>
            </div>
            
            <Button className="whitespace-nowrap">
              New Post
            </Button>
          </div>
        </div>
        
        <div className="rounded-2xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Title</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden md:table-cell">Upvotes</TableHead>
                <TableHead className="hidden lg:table-cell">Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No posts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="hidden sm:block w-12 h-12 rounded overflow-hidden shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <Link
                            to={`/post/${post.id}`}
                            className="font-medium hover:underline line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-1 sm:hidden">
                            <StatusBadge status={post.status} />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <StatusBadge status={post.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.upvotes}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {post.views}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" asChild>
                        <Link to={`/post/${post.id}`}>View</Link>
                      </Button>
                      <Button variant="ghost" className="ml-2">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default MyPosts;

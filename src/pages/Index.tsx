
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { BlogCard } from "@/components/blog-card";
import { posts } from "@/data/dummy-data";
import { Post } from "@/types";

const Index = () => {
  const featuredPosts = posts.filter(post => post.status === 'published');
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(featuredPosts);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="container py-8 md:py-12">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Discover fascinating insights
            </h1>
            <p className="text-muted-foreground text-lg md:w-2/3">
              Welcome to BlogNest, where ideas take flight. Explore thought-provoking articles from our community of writers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

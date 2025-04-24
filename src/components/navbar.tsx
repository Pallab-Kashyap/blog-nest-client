
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home, List, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl md:text-2xl">BlogNest</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className="transition-colors hover:text-foreground/80 text-muted-foreground"
          >
            Leaderboard
          </Link>
          <Link
            to="/my-posts"
            className="transition-colors hover:text-foreground/80 text-muted-foreground"
          >
            My Posts
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isMobile && (
            <div className="flex md:hidden">
              <nav className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/">
                    <Home className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/leaderboard">
                    <List className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/my-posts">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

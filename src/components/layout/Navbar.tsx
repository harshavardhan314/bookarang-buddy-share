
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Book, BookOpen, Home, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Bookarang</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={cn(
              "nav-item", 
              isActive('/') && "text-primary after:w-full"
            )}
          >
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </div>
          </Link>
          <Link 
            to="/borrow" 
            className={cn(
              "nav-item", 
              isActive('/borrow') && "text-primary after:w-full"
            )}
          >
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              <span>Borrow</span>
            </div>
          </Link>
          <Link 
            to="/lend" 
            className={cn(
              "nav-item", 
              isActive('/lend') && "text-primary after:w-full"
            )}
          >
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Lend</span>
            </div>
          </Link>
          <Link 
            to="/notifications" 
            className={cn(
              "nav-item relative", 
              isActive('/notifications') && "text-primary after:w-full"
            )}
          >
            <div className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              <Badge className="absolute -top-2 -right-2 bg-primary h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </div>
          </Link>
          <Link 
            to="/profile" 
            className={cn(
              "nav-item", 
              isActive('/profile') && "text-primary after:w-full"
            )}
          >
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </div>
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" className="btn-hover" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

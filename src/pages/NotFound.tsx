
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for seems to be missing. It might have been moved, deleted, or perhaps was never there in the first place.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <BookOpen className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/borrow">
              <Search className="mr-2 h-4 w-4" />
              Browse Books
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, DollarSign, Package, Search, Star, UserCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock quotes for the rotating book quotes section
const BOOK_QUOTES = [
  {
    quote: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin"
  },
  {
    quote: "Books are a uniquely portable magic.",
    author: "Stephen King"
  },
  {
    quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    quote: "Reading is essential for those who seek to rise above the ordinary.",
    author: "Jim Rohn"
  },
  {
    quote: "That's the thing about books. They let you travel without moving your feet.",
    author: "Jhumpa Lahiri"
  }
];

const Home = () => {
  const [quoteIndex, setQuoteIndex] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % BOOK_QUOTES.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentQuote = BOOK_QUOTES[quoteIndex];
  
  return (
    <div className="container px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 px-4 mb-12 rounded-2xl bg-gradient-to-r from-bookarang-mint to-bookarang-sky text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Welcome to Bookarang, <span className="text-primary">Adarsh</span>!
        </h1>
        
        <div className="max-w-2xl mx-auto mb-8 h-24 flex items-center justify-center">
          <div className="animate-fade-in" key={quoteIndex}>
            <p className="text-lg italic mb-2">&ldquo;{currentQuote.quote}&rdquo;</p>
            <p className="text-sm font-medium">— {currentQuote.author}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="btn-hover" asChild>
            <Link to="/borrow">
              <Search className="mr-2 h-5 w-5" />
              Find Books
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="btn-hover" asChild>
            <Link to="/lend">
              <BookOpen className="mr-2 h-5 w-5" />
              Lend a Book
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Profile Summary */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-1">Adarsh Patel</h3>
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Mumbai, India</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">4.8</span>
                <span className="text-sm text-muted-foreground ml-1">(12 ratings)</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Books Lent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Active: 2</p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Package className="h-5 w-5 mr-2 text-primary" />
                    Books Borrowed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">Active: 1</p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    Total Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">₹340</p>
                  <p className="text-sm text-muted-foreground">This month: ₹120</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Access Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Link to="/lend">
            <Card className="h-full card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-bookarang-mint flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">Add Book</CardTitle>
                <CardDescription>Lend your books to others</CardDescription>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/borrow">
            <Card className="h-full card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-bookarang-sky flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">Search Books</CardTitle>
                <CardDescription>Find books to borrow nearby</CardDescription>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/alerts">
            <Card className="h-full card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-bookarang-beige flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">My Alerts</CardTitle>
                <CardDescription>Manage your book alerts</CardDescription>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/notifications">
            <Card className="h-full card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-bookarang-coral flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">Notifications</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  Recent updates 
                  <Badge className="ml-2 bg-primary h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
      
      {/* Recent Listings */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Listings Near You</h2>
          <Button variant="ghost" size="sm" className="flex items-center" asChild>
            <Link to="/borrow">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Link to="/borrow" key={i}>
              <Card className="overflow-hidden card-hover">
                <div className="aspect-[3/4] relative">
                  <img 
                    src={`https://source.unsplash.com/random/300x400?book,${i}`}
                    alt="Book Cover" 
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2 condition-excellent">
                    Excellent
                  </Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-1 line-clamp-1">The Psychology of Money</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">Morgan Housel</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">₹10/day</p>
                      <p className="text-xs text-muted-foreground">2.3 km away</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs font-medium">4.9</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-12 px-4 rounded-2xl bg-secondary/30">
        <h2 className="text-2xl font-bold text-center mb-10">How Bookarang Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-bookarang-mint flex items-center justify-center mb-4">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Join</h3>
            <p className="text-muted-foreground">Sign up, verify your profile, and join the Bookarang community in your area.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-bookarang-sky flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lend or Borrow</h3>
            <p className="text-muted-foreground">List your books for lending or browse to borrow books from people nearby.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-bookarang-beige flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn & Save</h3>
            <p className="text-muted-foreground">Earn from lending your books and save by borrowing instead of buying.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

const MapPin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Bell = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

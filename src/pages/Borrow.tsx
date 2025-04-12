
import React, { useState } from 'react';
import { Search, Filter, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock data for book listings
const MOCK_BOOKS = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://source.unsplash.com/random/300x400?book,1",
    condition: "Excellent",
    fee: 12,
    deposit: 250,
    distance: 1.5,
    rating: 4.9,
    lenderName: "Rahul Sharma",
    description: "An easy and proven way to build good habits and break bad ones. In this book, Clear reveals practical strategies that will teach you how to form good habits, break bad ones, and master small behaviors that lead to remarkable results."
  },
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://source.unsplash.com/random/300x400?book,2",
    condition: "Good",
    fee: 15,
    deposit: 300,
    distance: 0.8,
    rating: 4.7,
    lenderName: "Priya Patel",
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be "human.""
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://source.unsplash.com/random/300x400?book,3",
    condition: "Good",
    fee: 8,
    deposit: 180,
    distance: 2.2,
    rating: 4.8,
    lenderName: "Aman Gupta",
    description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined."
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: "https://source.unsplash.com/random/300x400?book,4",
    condition: "Excellent",
    fee: 10,
    deposit: 200,
    distance: 1.2,
    rating: 4.6,
    lenderName: "Neha Singh",
    description: "The #1 personal finance book of all time that tells the story of a young man and his two dads (his real father and the father of his best friend, his rich dad), and the ways in which both men shaped his thoughts about money and investing."
  },
  {
    id: 5,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "https://source.unsplash.com/random/300x400?book,5",
    condition: "Okay",
    fee: 12,
    deposit: 220,
    distance: 3.1,
    rating: 4.7,
    lenderName: "Vivek Kumar",
    description: "In this book, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical."
  },
  {
    id: 6,
    title: "Zero to One",
    author: "Peter Thiel",
    cover: "https://source.unsplash.com/random/300x400?book,6",
    condition: "Good",
    fee: 14,
    deposit: 250,
    distance: 1.7,
    rating: 4.8,
    lenderName: "Arjun Mehta",
    description: "If you want to build a better future, you must believe in secrets. The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. Learn how to build companies that create new things."
  },
  {
    id: 7,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://source.unsplash.com/random/300x400?book,7",
    condition: "Excellent",
    fee: 12,
    deposit: 240,
    distance: 2.5,
    rating: 4.9,
    lenderName: "Kavita Sharma",
    description: "An unforgettable memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. A universal coming-of-age story that gets to the heart of what an education is and what it offers."
  },
  {
    id: 8,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://source.unsplash.com/random/300x400?book,8",
    condition: "Excellent",
    fee: 10,
    deposit: 200,
    distance: 0.9,
    rating: 4.8,
    lenderName: "Rohan Kapoor",
    description: "Timeless lessons on wealth, greed, and happiness. Money—investing, personal finance, and business decisions—is typically taught as a math-based field. But in the real world, people don't make financial decisions on a spreadsheet."
  }
];

const Borrow = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState<string | undefined>();
  const [maxFee, setMaxFee] = useState<number>(20);
  const [dayRange, setDayRange] = useState<string>("7");
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedBook, setSelectedBook] = useState<typeof MOCK_BOOKS[0] | null>(null);
  const [borrowDuration, setBorrowDuration] = useState("7");
  
  const filteredBooks = MOCK_BOOKS.filter(book => {
    // Apply search filter
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !book.author.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply condition filter
    if (selectedCondition && book.condition !== selectedCondition) {
      return false;
    }
    
    // Apply max fee filter
    if (book.fee > maxFee) {
      return false;
    }
    
    return true;
  });
  
  const handleBorrowRequest = () => {
    toast({
      title: "Borrow request sent!",
      description: `You have requested to borrow ${selectedBook?.title} for ${borrowDuration} days.`,
    });
  };
  
  const calculateTotalFee = () => {
    if (!selectedBook) return 0;
    return selectedBook.fee * parseInt(borrowDuration);
  };
  
  return (
    <div className="container px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Borrow Books</h1>
        <p className="text-muted-foreground mb-6">Find books available for borrowing in your area</p>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              type="text"
              placeholder="Search by book title, author or ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Books</SheetTitle>
                <SheetDescription>
                  Refine your search with these filters
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Okay">Okay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Maximum Fee/Day</Label>
                    <span className="text-sm">₹{maxFee}</span>
                  </div>
                  <Slider
                    value={[maxFee]}
                    min={5}
                    max={50}
                    step={1}
                    onValueChange={(values) => setMaxFee(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Borrowing Period</Label>
                  <Select value={dayRange} onValueChange={setDayRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="14">2 weeks</SelectItem>
                      <SelectItem value="30">1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Andheri">Andheri</SelectItem>
                      <SelectItem value="Bandra">Bandra</SelectItem>
                      <SelectItem value="Juhu">Juhu</SelectItem>
                      <SelectItem value="Powai">Powai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => {
                    setSelectedCondition(undefined);
                    setMaxFee(20);
                    setDayRange("7");
                    setSelectedLocation(undefined);
                  }}>
                    Reset
                  </Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Active Filters */}
        {(selectedCondition || maxFee < 20 || selectedLocation) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCondition && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Condition: {selectedCondition}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 ml-1" 
                  onClick={() => setSelectedCondition(undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {maxFee < 20 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Max Fee: ₹{maxFee}/day
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 ml-1" 
                  onClick={() => setMaxFee(20)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedLocation && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Location: {selectedLocation}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 ml-1" 
                  onClick={() => setSelectedLocation(undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs" 
              onClick={() => {
                setSelectedCondition(undefined);
                setMaxFee(20);
                setSelectedLocation(undefined);
              }}
            >
              Clear All
            </Button>
          </div>
        )}
        
        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} available
          </p>
        </div>
        
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Dialog key={book.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer card-hover" onClick={() => setSelectedBook(book)}>
                    <div className="aspect-[3/4] relative">
                      <img 
                        src={book.cover}
                        alt={book.title} 
                        className="object-cover w-full h-full"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          book.condition === 'Excellent' 
                            ? 'condition-excellent' 
                            : book.condition === 'Good' 
                              ? 'condition-good' 
                              : 'condition-okay'
                        }`}
                      >
                        {book.condition}
                      </Badge>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{book.author}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">₹{book.fee}/day</p>
                          <p className="text-xs text-muted-foreground">{book.distance} km away</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs font-medium">{book.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Book Details</DialogTitle>
                    <DialogDescription>
                      Review book information and request to borrow
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    <div className="aspect-[3/4] relative">
                      <img 
                        src={book.cover}
                        alt={book.title} 
                        className="object-cover w-full h-full rounded-md"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          book.condition === 'Excellent' 
                            ? 'condition-excellent' 
                            : book.condition === 'Good' 
                              ? 'condition-good' 
                              : 'condition-okay'
                        }`}
                      >
                        {book.condition}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold">{book.title}</h3>
                        <p className="text-muted-foreground">{book.author}</p>
                      </div>
                      
                      <p className="text-sm">{book.description}</p>
                      
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground mb-1">Lender</p>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            {book.lenderName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{book.lenderName}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs">{book.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground mb-1">Location</p>
                        <p className="text-sm">{book.distance} km away in Mumbai</p>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground mb-1">Borrowing Duration</p>
                        <RadioGroup value={borrowDuration} onValueChange={setBorrowDuration}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="7" id="r1" />
                            <Label htmlFor="r1">7 days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="14" id="r2" />
                            <Label htmlFor="r2">14 days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30" id="r3" />
                            <Label htmlFor="r3">30 days</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="pt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Fee</span>
                          <span>₹{book.fee} × {borrowDuration} days = ₹{calculateTotalFee()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Refundable Deposit</span>
                          <span>₹{book.deposit}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{calculateTotalFee() + book.deposit}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          * Deposit will be refunded after returning the book in the same condition
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Create Book Alert
                    </Button>
                    <Button onClick={handleBorrowRequest} className="w-full sm:w-auto btn-hover">
                      Request to Borrow
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any books matching your criteria. Try adjusting your filters or search for something else.
            </p>
            <Button className="mt-4" onClick={() => {
              setSearchQuery("");
              setSelectedCondition(undefined);
              setMaxFee(20);
              setSelectedLocation(undefined);
            }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Borrow;

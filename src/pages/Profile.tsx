
import React, { useState } from 'react';
import { Edit, LogOut, Mail, MapPin, Package, Phone, Star, UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

// Mock user data
const USER = {
  name: "Adarsh Patel",
  email: "adarsh.patel@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  joinDate: "August 2023",
  avatar: "https://github.com/shadcn.png",
  rating: 4.8,
  totalRatings: 12
};

// Mock books data
const MY_BOOKS = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://source.unsplash.com/random/300x400?book,1",
    condition: "Excellent",
    fee: 12,
    deposit: 250,
    isAvailable: true,
    isLent: true,
    borrower: "Rahul Sharma",
    dueDate: "Apr 20, 2025"
  },
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://source.unsplash.com/random/300x400?book,2",
    condition: "Good",
    fee: 15,
    deposit: 300,
    isAvailable: true,
    isLent: false
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://source.unsplash.com/random/300x400?book,3",
    condition: "Good",
    fee: 8,
    deposit: 180,
    isAvailable: false,
    isLent: false
  }
];

// Mock borrowing history
const BORROWED_BOOKS = [
  {
    id: 1,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "https://source.unsplash.com/random/300x400?book,5",
    lender: "Vivek Kumar",
    borrowDate: "Mar 15, 2025",
    returnDate: "Mar 29, 2025",
    status: "active",
    fee: 12,
    totalPaid: 180
  },
  {
    id: 2,
    title: "Zero to One",
    author: "Peter Thiel",
    cover: "https://source.unsplash.com/random/300x400?book,6",
    lender: "Arjun Mehta",
    borrowDate: "Feb 10, 2025",
    returnDate: "Feb 24, 2025",
    status: "returned",
    fee: 14,
    totalPaid: 196
  },
  {
    id: 3,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://source.unsplash.com/random/300x400?book,7",
    lender: "Kavita Sharma",
    borrowDate: "Jan 05, 2025",
    returnDate: "Jan 19, 2025",
    status: "returned",
    fee: 12,
    totalPaid: 168
  }
];

// Mock reviews
const REVIEWS = [
  {
    id: 1,
    reviewer: "Rahul Sharma",
    avatar: "",
    initials: "RS",
    rating: 5,
    comment: "Great experience! The book was in excellent condition as described.",
    date: "Apr 5, 2025",
    bookTitle: "Atomic Habits"
  },
  {
    id: 2,
    reviewer: "Vivek Kumar",
    avatar: "",
    initials: "VK",
    rating: 4,
    comment: "Good transaction. Punctual and responsive.",
    date: "Mar 22, 2025",
    bookTitle: "The Alchemist"
  },
  {
    id: 3,
    reviewer: "Priya Patel",
    avatar: "https://source.unsplash.com/random/100x100?portrait,1",
    initials: "PP",
    rating: 5,
    comment: "Excellent lender! The book was even better than I expected.",
    date: "Feb 15, 2025",
    bookTitle: "Sapiens"
  }
];

const Profile = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState(MY_BOOKS);
  
  const handleToggleAvailability = (id: number) => {
    setBooks(prev => 
      prev.map(book => 
        book.id === id 
          ? { ...book, isAvailable: !book.isAvailable } 
          : book
      )
    );
    
    const book = books.find(b => b.id === id);
    toast({
      title: `Book ${book?.isAvailable ? 'unavailable' : 'available'}`,
      description: `"${book?.title}" is now ${book?.isAvailable ? 'unavailable' : 'available'} for borrowing.`,
    });
  };
  
  return (
    <div className="container px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={USER.avatar} alt={USER.name} />
                <AvatarFallback>{USER.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-1">{USER.name}</h2>
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{USER.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({USER.totalRatings} ratings)</span>
              </div>
              
              <div className="w-full space-y-3 mt-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{USER.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{USER.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{USER.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <UserRound className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Member since {USER.joinDate}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6 w-full">
                <Button variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="my-books" className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-6">
                <TabsTrigger value="my-books">My Books</TabsTrigger>
                <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              {/* My Books Tab */}
              <TabsContent value="my-books" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Books I'm Lending</h3>
                  <Button size="sm" asChild>
                    <a href="/lend">Add New Book</a>
                  </Button>
                </div>
                
                {books.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {books.map((book) => (
                      <Card key={book.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="h-32 w-24 flex-shrink-0">
                            <img 
                              src={book.cover}
                              alt={book.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4 flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-semibold line-clamp-1">{book.title}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                              </div>
                              <Badge 
                                className={
                                  book.condition === 'Excellent' 
                                    ? 'condition-excellent' 
                                    : book.condition === 'Good' 
                                      ? 'condition-good' 
                                      : 'condition-okay'
                                }
                              >
                                {book.condition}
                              </Badge>
                            </div>
                            
                            <div className="mt-2 text-sm">
                              <div className="flex justify-between mb-1">
                                <span>Fee:</span>
                                <span className="font-medium">₹{book.fee}/day</span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span>Deposit:</span>
                                <span className="font-medium">₹{book.deposit}</span>
                              </div>
                              
                              {book.isLent && (
                                <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                                  <p className="font-medium">Currently borrowed by {book.borrower}</p>
                                  <p>Due: {book.dueDate}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <Switch 
                                  id={`book-available-${book.id}`} 
                                  checked={book.isAvailable}
                                  onCheckedChange={() => handleToggleAvailability(book.id)}
                                  disabled={book.isLent}
                                />
                                <label 
                                  htmlFor={`book-available-${book.id}`}
                                  className="text-sm font-medium"
                                >
                                  {book.isAvailable ? 'Available' : 'Unavailable'}
                                </label>
                              </div>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No books listed</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      You haven't listed any books for lending yet. Share your books with others and earn!
                    </p>
                    <Button asChild>
                      <a href="/lend">Add Your First Book</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {/* Borrowed Books Tab */}
              <TabsContent value="borrowed" className="space-y-6">
                <h3 className="text-lg font-semibold">Books I've Borrowed</h3>
                
                {BORROWED_BOOKS.length > 0 ? (
                  <div className="space-y-4">
                    {BORROWED_BOOKS.map((book) => (
                      <Card key={book.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="h-32 w-24 flex-shrink-0">
                            <img 
                              src={book.cover}
                              alt={book.title} 
                              className="h-full w-full object-cover"
                            />
                            {book.status === 'active' && (
                              <div className="bg-green-500 text-white text-xs font-medium py-0.5 px-2 text-center">
                                Active
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4 flex-grow">
                            <div>
                              <h4 className="font-semibold line-clamp-1">{book.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                            </div>
                            
                            <div className="mt-2 grid grid-cols-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Borrowed From</p>
                                <p className="font-medium">{book.lender}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-medium">{book.borrowDate}</p>
                              </div>
                              <div className="mt-2">
                                <p className="text-muted-foreground">Return Date</p>
                                <p className="font-medium">{book.returnDate}</p>
                              </div>
                              <div className="mt-2">
                                <p className="text-muted-foreground">Fee</p>
                                <p className="font-medium">₹{book.fee}/day (₹{book.totalPaid} total)</p>
                              </div>
                            </div>
                            
                            {book.status === 'active' && (
                              <div className="mt-3">
                                <Button size="sm">Extend Borrowing</Button>
                              </div>
                            )}
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No borrowed books</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      You haven't borrowed any books yet. Find books to borrow nearby!
                    </p>
                    <Button asChild>
                      <a href="/borrow">Browse Books</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <h3 className="text-lg font-semibold">Reviews I've Received</h3>
                
                {REVIEWS.length > 0 ? (
                  <div className="space-y-4">
                    {REVIEWS.map((review) => (
                      <Card key={review.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.avatar} alt={review.reviewer} />
                              <AvatarFallback>{review.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold">{review.reviewer}</h4>
                                  <div className="flex items-center">
                                    {Array(5).fill(0).map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${
                                          i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                        }`} 
                                        fill={i < review.rating ? 'currentColor' : 'none'}
                                      />
                                    ))}
                                    <span className="text-xs text-muted-foreground ml-2">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                                <Badge variant="outline">
                                  For {review.bookTitle}
                                </Badge>
                              </div>
                              <p className="mt-2 text-sm">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      You haven't received any reviews yet. As you lend or borrow books, users will leave reviews about their experience with you.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

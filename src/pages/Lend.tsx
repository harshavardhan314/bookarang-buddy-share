
import React, { useState } from 'react';
import { BookPlus, Camera, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

const Lend = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState<number>(299);
  const [feePerDay, setFeePerDay] = useState<number>(15);
  const [deposit, setDeposit] = useState<number>(150);
  const [bookAvailable, setBookAvailable] = useState(true);
  
  // Calculated based on formula: max(₹5, 0.5% × Price)
  React.useEffect(() => {
    const calculatedFee = Math.max(5, originalPrice * 0.005);
    setFeePerDay(Math.round(calculatedFee));
    setDeposit(Math.round(originalPrice * 0.5));
  }, [originalPrice]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewImage(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    if (!title || !author || !condition || !originalPrice) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Submit the form
    toast({
      title: "Book listed successfully!",
      description: `Your book "${title}" has been listed for lending.`,
    });
    
    // Reset the form
    setTitle('');
    setAuthor('');
    setIsbn('');
    setCondition('');
    setDescription('');
    setOriginalPrice(299);
    setPreviewImage(null);
  };
  
  return (
    <div className="container px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Lend a Book</h1>
        <p className="text-muted-foreground mb-6">
          Share your books with others and earn while doing it
        </p>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Book Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="book-image">Book Cover Image</Label>
                <div className="flex items-center gap-4">
                  {previewImage ? (
                    <div className="relative h-36 w-28 rounded-md overflow-hidden">
                      <img 
                        src={previewImage} 
                        alt="Book cover preview" 
                        className="h-full w-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="h-36 w-28 rounded-md border-2 border-dashed border-muted flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                      onClick={() => document.getElementById('book-image')?.click()}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center justify-center">
                          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
                          <span className="text-xs text-muted-foreground">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">Upload Cover</span>
                        </>
                      )}
                      <input
                        type="file"
                        id="book-image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    <p>Upload a clear image of the book cover</p>
                    <p>Max size: 5MB</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Book Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="required">Book Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Atomic Habits" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author" className="required">Author</Label>
                  <Input 
                    id="author" 
                    placeholder="e.g. James Clear" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="isbn">ISBN (Optional)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                            <Info className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>ISBN is a unique identifier for books. You can usually find it on the back cover or copyright page.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="isbn" 
                    placeholder="e.g. 9781847941831" 
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condition" className="required">Condition</Label>
                  <Select value={condition} onValueChange={setCondition} required>
                    <SelectTrigger id="condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent - Like new</SelectItem>
                      <SelectItem value="Good">Good - Minor wear</SelectItem>
                      <SelectItem value="Okay">Okay - Noticeable wear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Add any additional details about the book" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <Separator />
              
              {/* Pricing Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Pricing Information</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="original-price" className="required">Book's Original Price (₹)</Label>
                    <span className="text-sm">₹{originalPrice}</span>
                  </div>
                  <Slider
                    id="original-price"
                    value={[originalPrice]}
                    min={100}
                    max={2000}
                    step={10}
                    onValueChange={(values) => setOriginalPrice(values[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps us calculate the recommended fee and deposit for your book.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="fee-per-day">Fee Per Day (₹)</Label>
                      <span className="text-sm">₹{feePerDay}</span>
                    </div>
                    <Slider
                      id="fee-per-day"
                      value={[feePerDay]}
                      min={5}
                      max={50}
                      step={1}
                      onValueChange={(values) => setFeePerDay(values[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended: ₹{Math.max(5, Math.round(originalPrice * 0.005))} (0.5% of original price)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="deposit">Refundable Deposit (₹)</Label>
                      <span className="text-sm">₹{deposit}</span>
                    </div>
                    <Slider
                      id="deposit"
                      value={[deposit]}
                      min={50}
                      max={Math.max(1000, originalPrice)}
                      step={10}
                      onValueChange={(values) => setDeposit(values[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended: ₹{Math.round(originalPrice * 0.5)} (50% of original price)
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-md">
                  <h4 className="font-medium mb-2">Estimated Earnings</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>For 7 days:</span>
                      <span className="font-medium">₹{feePerDay * 7}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>For 14 days:</span>
                      <span className="font-medium">₹{feePerDay * 14}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>For 30 days:</span>
                      <span className="font-medium">₹{feePerDay * 30}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Availability */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="book-availability">Book Availability</Label>
                  <p className="text-sm text-muted-foreground">
                    Turn off to temporarily hide your book from the listings
                  </p>
                </div>
                <Switch 
                  id="book-availability" 
                  checked={bookAvailable}
                  onCheckedChange={setBookAvailable}
                />
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full btn-hover" size="lg">
                  <BookPlus className="mr-2 h-5 w-5" />
                  List Book for Lending
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Lend;

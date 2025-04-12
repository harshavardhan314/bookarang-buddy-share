
import React, { useState } from 'react';
import { Bell, Book, BookOpen, Calendar, CheckCheck, Clock, Info, UserCheck, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'borrow_request',
    title: 'New Borrow Request',
    message: 'Sarah wants to borrow "Atomic Habits" for 7 days',
    user: {
      name: 'Sarah Patel',
      avatar: 'https://github.com/shadcn.png',
      initials: 'SP'
    },
    book: {
      title: 'Atomic Habits',
      image: 'https://source.unsplash.com/random/300x400?book,1'
    },
    timeAgo: '5 minutes ago',
    isRead: false,
    actionable: true
  },
  {
    id: 2,
    type: 'due_reminder',
    title: 'Book Due Tomorrow',
    message: 'Your borrowed book "Sapiens" is due for return tomorrow',
    book: {
      title: 'Sapiens: A Brief History of Humankind',
      image: 'https://source.unsplash.com/random/300x400?book,2'
    },
    timeAgo: '2 hours ago',
    isRead: false,
    actionable: false
  },
  {
    id: 3,
    type: 'return_confirmed',
    title: 'Return Confirmed',
    message: 'Your deposit of ₹200 for "The Alchemist" has been refunded',
    book: {
      title: 'The Alchemist',
      image: 'https://source.unsplash.com/random/300x400?book,3'
    },
    timeAgo: '1 day ago',
    isRead: true,
    actionable: false
  },
  {
    id: 4,
    type: 'book_alert',
    title: 'Book Alert Match',
    message: 'A book matching your alert "Rich Dad Poor Dad" is now available nearby',
    book: {
      title: 'Rich Dad Poor Dad',
      image: 'https://source.unsplash.com/random/300x400?book,4'
    },
    timeAgo: '2 days ago',
    isRead: true,
    actionable: true
  },
  {
    id: 5,
    type: 'borrow_approved',
    title: 'Borrow Request Approved',
    message: 'Your request to borrow "Thinking, Fast and Slow" has been approved',
    user: {
      name: 'Vivek Kumar',
      avatar: '',
      initials: 'VK'
    },
    book: {
      title: 'Thinking, Fast and Slow',
      image: 'https://source.unsplash.com/random/300x400?book,5'
    },
    timeAgo: '3 days ago',
    isRead: true,
    actionable: true
  }
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'borrow_request':
      return <UserCheck className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />;
    case 'due_reminder':
      return <Clock className="h-10 w-10 text-amber-500 p-2 bg-amber-100 rounded-full" />;
    case 'return_confirmed':
      return <CheckCheck className="h-10 w-10 text-green-500 p-2 bg-green-100 rounded-full" />;
    case 'book_alert':
      return <Bell className="h-10 w-10 text-blue-500 p-2 bg-blue-100 rounded-full" />;
    case 'borrow_approved':
      return <BookOpen className="h-10 w-10 text-purple-500 p-2 bg-purple-100 rounded-full" />;
    default:
      return <Info className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />;
  }
};

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('all');
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread' 
      ? notifications.filter(n => !n.isRead)
      : notifications.filter(n => n.actionable);
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: `${unreadCount} notifications marked as read.`,
    });
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };
  
  const handleAction = (notification: typeof MOCK_NOTIFICATIONS[0]) => {
    switch (notification.type) {
      case 'borrow_request':
        toast({
          title: "Borrow request approved",
          description: `You've approved the request for "${notification.book.title}".`,
        });
        break;
      case 'book_alert':
        toast({
          title: "Redirecting to book",
          description: `Viewing details for "${notification.book.title}".`,
        });
        break;
      case 'borrow_approved':
        toast({
          title: "Redirecting to meetup details",
          description: "View the meetup details for book pickup.",
        });
        break;
      default:
        break;
    }
    
    markAsRead(notification.id);
  };
  
  return (
    <div className="container px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your book lending and borrowing activities
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="all" className="relative">
              All
              {notifications.length > 0 && (
                <Badge className="ml-2 bg-primary">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-primary">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="actionable">
              Actionable
              {notifications.filter(n => n.actionable).length > 0 && (
                <Badge className="ml-2 bg-primary">
                  {notifications.filter(n => n.actionable).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all duration-300 ${
                  !notification.isRead ? 'bg-secondary/30 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex">
                    <div className="mr-4">
                      <NotificationIcon type={notification.type} />
                    </div>
                    
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">
                            {notification.timeAgo}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {(notification.book || notification.user) && (
                        <>
                          <Separator />
                          <div className="flex items-center gap-4">
                            {notification.book && (
                              <div className="flex items-center gap-2">
                                <div className="h-10 w-8 rounded overflow-hidden">
                                  <img 
                                    src={notification.book.image}
                                    alt={notification.book.title}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="text-sm">
                                  <p className="font-medium line-clamp-1 max-w-[150px]">
                                    {notification.book.title}
                                  </p>
                                  <span className="text-xs text-muted-foreground">Book</span>
                                </div>
                              </div>
                            )}
                            
                            {notification.user && (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                                  <AvatarFallback>{notification.user.initials}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <p className="font-medium">{notification.user.name}</p>
                                  <span className="text-xs text-muted-foreground">User</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      
                      {notification.actionable && (
                        <div className="pt-2">
                          <Button 
                            size="sm" 
                            className="btn-hover"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(notification);
                            }}
                          >
                            {notification.type === 'borrow_request' ? 'Approve Request' : 
                              notification.type === 'book_alert' ? 'View Book' :
                              notification.type === 'borrow_approved' ? 'View Details' : 'Take Action'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {activeTab === 'all' 
                ? "You don't have any notifications yet. We'll notify you about your lending and borrowing activities."
                : activeTab === 'unread'
                  ? "You don't have any unread notifications. Good job staying on top of things!"
                  : "You don't have any actionable notifications at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

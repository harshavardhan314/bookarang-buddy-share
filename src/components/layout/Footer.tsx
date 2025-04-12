
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-8 mt-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Bookarang</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              A peer-to-peer book lending and borrowing platform focused on hyperlocal sharing within your community.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/borrow" className="text-muted-foreground hover:text-primary transition-colors">
                  Borrow Books
                </Link>
              </li>
              <li>
                <Link to="/lend" className="text-muted-foreground hover:text-primary transition-colors">
                  Lend Books
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Contact Us</h4>
            <p className="text-sm text-muted-foreground">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <a 
              href="mailto:hello@bookarang.com" 
              className="mt-2 inline-block text-primary hover:underline"
            >
              hello@bookarang.com
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bookarang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

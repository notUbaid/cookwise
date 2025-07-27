import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChefHat, Search, BookOpen, Users, Heart, Compass, Utensils, Settings as SettingsIcon, Lightbulb } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: ChefHat },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Reverse Cook', href: '/reverse-cooking', icon: Utensils },
  { name: 'Leftovers', href: '/leftovers', icon: Lightbulb },
  { name: 'Meal Plan', href: '/meal-plan', icon: Utensils }, // Use a more appropriate icon
  { name: 'Quiz', href: '/quiz', icon: Users },
  { name: 'Saved', href: '/saved', icon: Heart },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
  // Removed Offline and any unused nav items
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/60 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/cookwise.jpeg" alt="CookWise Logo" className="h-8 w-8 rounded-full shadow-md border border-primary object-cover" />
          <span className="text-2xl font-serif font-bold gradient-text">CookWise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Removed LocationIndicator from top bar */}
          <ThemeToggle />
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
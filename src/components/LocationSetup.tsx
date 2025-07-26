import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Search, 
  Loader2, 
  CheckCircle, 
  Globe,
  X,
  ChevronDown
} from 'lucide-react';
import { 
  getUserCityState, 
  indianCities, 
  getLocationSuggestions,
  saveUserLocation,
  getUserLocation
} from '@/utils/location';

interface LocationSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSet: (city: string, state: string) => void;
}

export function LocationSetup({ isOpen, onClose, onLocationSet }: LocationSetupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof indianCities>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ city: string; state: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery) {
      const results = getLocationSuggestions(searchQuery);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleUseCurrentLocation = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Getting user location...');
      const location = await getUserCityState();
      console.log('Location result:', location);
      
      if (location && location.city && location.state) {
        // Check if the detected location is in our Indian cities list
        const foundLocation = indianCities.find(
          city => city.city.toLowerCase() === location.city.toLowerCase() ||
                  city.state.toLowerCase() === location.state.toLowerCase()
        );
        
        if (foundLocation) {
          setSelectedLocation({ city: foundLocation.city, state: foundLocation.state });
          saveUserLocation(foundLocation.city, foundLocation.state);
          onLocationSet(foundLocation.city, foundLocation.state);
          onClose();
        } else {
          setError(`Location detected (${location.city}, ${location.state}) but not in our supported cities. Please select manually.`);
        }
      } else {
        setError('Could not detect your location. Please select manually.');
      }
    } catch (err) {
      console.error('Location error:', err);
      if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Location access denied. Please select your city manually.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: { city: string; state: string }) => {
    setSelectedLocation(location);
    setSearchQuery(`${location.city}, ${location.state}`);
    setShowSuggestions(false);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      saveUserLocation(selectedLocation.city, selectedLocation.state);
      onLocationSet(selectedLocation.city, selectedLocation.state);
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Set Your Location
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Help us show you recipes from your region
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Current Location Button */}
          <Button 
            onClick={handleUseCurrentLocation} 
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Globe className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Detecting Location...' : 'Use My Current Location'}
          </Button>

          <div className="relative">
            <div className="text-sm text-muted-foreground mb-2">Or select your city:</div>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for your city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onFocus={() => setShowSuggestions(true)}
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                {suggestions.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left p-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                  >
                    <div className="font-medium">{location.city}</div>
                    <div className="text-sm text-muted-foreground">{location.state}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Location Display */}
          {selectedLocation && (
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Selected:</span>
              </div>
              <div className="mt-1">
                <Badge variant="secondary" className="mr-2">
                  {selectedLocation.city}
                </Badge>
                <Badge variant="outline">
                  {selectedLocation.state}
                </Badge>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSkip} 
              variant="ghost" 
              className="flex-1"
            >
              Skip for Now
            </Button>
            <Button 
              onClick={handleConfirmLocation} 
              disabled={!selectedLocation}
              className="flex-1"
            >
              Confirm Location
            </Button>
          </div>

          {/* Popular Cities Quick Select */}
          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-2">Popular Cities:</div>
            <div className="flex flex-wrap gap-2">
              {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'].map(city => {
                const location = indianCities.find(loc => loc.city === city);
                if (!location) return null;
                
                return (
                  <Button
                    key={city}
                    variant="outline"
                    size="sm"
                    onClick={() => handleLocationSelect(location)}
                    className="text-xs"
                  >
                    {city}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
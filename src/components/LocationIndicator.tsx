import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronDown, Settings } from 'lucide-react';
import { getUserLocation, saveUserLocation } from '@/utils/location';
import { LocationSetup } from './LocationSetup';

interface LocationIndicatorProps {
  onLocationChange: (city: string, state: string) => void;
}

export function LocationIndicator({ onLocationChange }: LocationIndicatorProps) {
  const [showLocationSetup, setShowLocationSetup] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(() => getUserLocation());

  const handleLocationSet = (city: string, state: string) => {
    setCurrentLocation({ city, state, timestamp: Date.now() });
    onLocationChange(city, state);
  };

  const handleChangeLocation = () => {
    setShowLocationSetup(true);
  };

  if (!currentLocation) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleChangeLocation}
          className="text-muted-foreground hover:text-foreground"
        >
          <MapPin className="mr-1 h-4 w-4" />
          Set Location
        </Button>
        
        <LocationSetup
          isOpen={showLocationSetup}
          onClose={() => setShowLocationSetup(false)}
          onLocationSet={handleLocationSet}
        />
      </>
    );
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleChangeLocation}
        className="text-muted-foreground hover:text-foreground"
      >
        <MapPin className="mr-1 h-4 w-4" />
        <span className="hidden sm:inline">{currentLocation.city}</span>
        <ChevronDown className="ml-1 h-3 w-3" />
      </Button>
      
      <LocationSetup
        isOpen={showLocationSetup}
        onClose={() => setShowLocationSetup(false)}
        onLocationSet={handleLocationSet}
      />
    </>
  );
} 
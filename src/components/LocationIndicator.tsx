import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { getUserLocation } from '@/utils/location';

interface LocationIndicatorProps {}

export function LocationIndicator({}: LocationIndicatorProps) {
  const [currentLocation] = useState(() => getUserLocation());

  if (!currentLocation) return null;

  return (
    <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 text-xs">
      <MapPin className="h-3 w-3 mr-1" />
      {currentLocation.city}, {currentLocation.state}
    </Badge>
  );
} 
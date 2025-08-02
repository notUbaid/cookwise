import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocationSetup } from '@/components/LocationSetup';
import { 
  getUserLocation, 
  saveUserLocation,
  indianCities 
} from '@/utils/location';
import { 
  Settings as SettingsIcon, 
  MapPin, 
  Globe, 
  ArrowLeft,
  Edit,
  CheckCircle,
  Trash2
} from 'lucide-react';

export default function Settings() {
  const [currentLocation, setCurrentLocation] = useState<{ city: string; state: string } | null>(null);
  const [showLocationSetup, setShowLocationSetup] = useState(false);

  useEffect(() => {
    const location = getUserLocation();
    setCurrentLocation(location);
  }, []);

  const handleLocationSet = (city: string, state: string) => {
    setCurrentLocation({ city, state });
    saveUserLocation(city, state);
    setShowLocationSetup(false);
  };

  const handleClearLocation = () => {
    localStorage.removeItem('user-location');
    setCurrentLocation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Location Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location Settings
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Set your location to get personalized recipe recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentLocation ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Current Location</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{currentLocation.city}</Badge>
                          <Badge variant="outline">{currentLocation.state}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowLocationSetup(true)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Change
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleClearLocation}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• You'll see recipes from {currentLocation.state} and nearby regions</p>
                    <p>• Location-based suggestions will appear on the home page</p>
                    <p>• You can change this anytime from the Settings page</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Location Set</h3>
                  <p className="text-muted-foreground mb-4">
                    Set your location to get personalized recipe recommendations
                  </p>
                  <Button onClick={() => setShowLocationSetup(true)}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Set Location
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* App Information */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto p-4 flex-col">
                  <Link to="/explore">
                    <Globe className="h-6 w-6 mb-2" />
                    <span>Explore Recipes</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex-col">
                  <Link to="/reverse-cooking">
                    <MapPin className="h-6 w-6 mb-2" />
                    <span>Reverse Cooking</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex-col">
                  <Link to="/quiz">
                    <CheckCircle className="h-6 w-6 mb-2" />
                    <span>Taste Quiz</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex-col">
                  <Link to="/saved">
                    <SettingsIcon className="h-6 w-6 mb-2" />
                    <span>Saved Recipes</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Location Setup Popup */}
      <LocationSetup
        isOpen={showLocationSetup}
        onClose={() => setShowLocationSetup(false)}
        onLocationSet={handleLocationSet}
      />
    </div>
  );
} 
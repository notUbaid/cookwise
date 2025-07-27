import { mockRecipes } from '../data/mockData';

// Add this function in your component or utility file
export async function getUserCityState() {
  console.log("Checking geolocation support...");
  
  if (!navigator.geolocation) {
    console.error("Geolocation not supported by your browser.");
    return null;
  }

  console.log("Geolocation is supported, requesting position...");

  return new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 60000 // 1 minute
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("Geolocation successful:", position);
        const { latitude, longitude } = position.coords;
        console.log(`Coordinates: ${latitude}, ${longitude}`);

        try {
          // Try Google Maps API first
          console.log("Calling Google Maps Geocoding API...");
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyArhwe3StQA6cWD6U3uz94sp58924BDYBc`
          );

          const data = await response.json();
          console.log("Google Maps API response:", data);

          if (data.status === "OK" && data.results.length > 0) {
            let city = "";
            let state = "";

            const components = data.results[0].address_components;
            for (let component of components) {
              if (component.types.includes("locality")) {
                city = component.long_name;
              }
              if (component.types.includes("administrative_area_level_1")) {
                state = component.long_name;
              }
            }

            if (city && state) {
              console.log(`Google Maps API found: ${city}, ${state}`);
              resolve({ city, state });
              return;
            }
          }

          // Fallback: Use coordinates to estimate location
          console.log("Google Maps API failed, using coordinate-based estimation");
          const estimatedLocation = estimateLocationFromCoordinates(latitude, longitude);
          if (estimatedLocation) {
            console.log(`Estimated location: ${estimatedLocation.city}, ${estimatedLocation.state}`);
            resolve(estimatedLocation);
            return;
          }

          console.error("Failed to get location data:", data.status, data.error_message);
          resolve(null);
        } catch (error) {
          console.error("Error fetching location data:", error);
          
          // Fallback: Use coordinates to estimate location
          console.log("API call failed, using coordinate-based estimation");
          const estimatedLocation = estimateLocationFromCoordinates(latitude, longitude);
          if (estimatedLocation) {
            console.log(`Estimated location: ${estimatedLocation.city}, ${estimatedLocation.state}`);
            resolve(estimatedLocation);
            return;
          }
          
          resolve(null);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        // Provide specific error messages based on error code
        let errorMessage = "Unknown geolocation error";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        console.error("Geolocation error details:", errorMessage);
        
        reject(errorMessage);
      },
      options
    );
  });
}

// Fallback function to estimate location from coordinates
function estimateLocationFromCoordinates(latitude: number, longitude: number): { city: string; state: string } | null {
  // Rough coordinate ranges for major Indian cities
  const cityCoordinates = [
    { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
    { city: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { city: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
    { city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
    { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
    { city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
    { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
    { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
    { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
    { city: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lng: 80.3319 },
    { city: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
    { city: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
    { city: 'Thane', state: 'Maharashtra', lat: 19.2183, lng: 72.9781 },
    { city: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
    { city: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
    { city: 'Vadodara', state: 'Gujarat', lat: 22.3072, lng: 73.1812 },
    { city: 'Ghaziabad', state: 'Uttar Pradesh', lat: 28.6692, lng: 77.4538 },
    { city: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573 },
    { city: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081 },
    { city: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
    { city: 'Faridabad', state: 'Haryana', lat: 28.4089, lng: 77.3178 },
    { city: 'Meerut', state: 'Uttar Pradesh', lat: 28.9845, lng: 77.7064 },
    { city: 'Rajkot', state: 'Gujarat', lat: 22.3039, lng: 70.8022 },
    { city: 'Kalyan-Dombivali', state: 'Maharashtra', lat: 19.2350, lng: 73.1295 },
    { city: 'Vasai-Virar', state: 'Maharashtra', lat: 19.4259, lng: 72.8225 },
    { city: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
    { city: 'Srinagar', state: 'Jammu and Kashmir', lat: 34.0837, lng: 74.7973 },
    { city: 'Aurangabad', state: 'Maharashtra', lat: 19.8762, lng: 75.3433 },
    { city: 'Dhanbad', state: 'Jharkhand', lat: 23.7957, lng: 86.4304 },
    { city: 'Amritsar', state: 'Punjab', lat: 31.6340, lng: 74.8723 },
    { city: 'Allahabad', state: 'Uttar Pradesh', lat: 25.4358, lng: 81.8463 },
    { city: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lng: 85.3096 },
    { city: 'Howrah', state: 'West Bengal', lat: 22.5958, lng: 88.2636 },
    { city: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558 },
    { city: 'Jabalpur', state: 'Madhya Pradesh', lat: 23.1815, lng: 79.9864 },
    { city: 'Gwalior', state: 'Madhya Pradesh', lat: 26.2183, lng: 78.1828 },
    { city: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.6480 },
    { city: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lng: 73.0243 },
    { city: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198 },
    { city: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lng: 81.6296 },
    { city: 'Kota', state: 'Rajasthan', lat: 25.2138, lng: 75.8648 },
    { city: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362 },
    { city: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { city: 'Solapur', state: 'Maharashtra', lat: 17.6599, lng: 75.9064 },
    { city: 'Hubli-Dharwad', state: 'Karnataka', lat: 15.3647, lng: 75.1240 },
    { city: 'Bareilly', state: 'Uttar Pradesh', lat: 28.3670, lng: 79.4304 },
    { city: 'Moradabad', state: 'Uttar Pradesh', lat: 28.8389, lng: 78.7738 },
    { city: 'Mysore', state: 'Karnataka', lat: 12.2958, lng: 76.6394 },
    { city: 'Gurgaon', state: 'Haryana', lat: 28.4595, lng: 77.0266 },
    { city: 'Aligarh', state: 'Uttar Pradesh', lat: 27.8974, lng: 78.0880 },
    { city: 'Jalandhar', state: 'Punjab', lat: 31.3260, lng: 75.5762 },
    { city: 'Tiruchirappalli', state: 'Tamil Nadu', lat: 10.7905, lng: 78.7047 },
    { city: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245 },
    { city: 'Salem', state: 'Tamil Nadu', lat: 11.6643, lng: 78.1460 },
    { city: 'Mira-Bhayandar', state: 'Maharashtra', lat: 19.2952, lng: 72.8544 },
    { city: 'Warangal', state: 'Telangana', lat: 17.9689, lng: 79.5941 },
    { city: 'Guntur', state: 'Andhra Pradesh', lat: 16.2991, lng: 80.4575 },
    { city: 'Bhiwandi', state: 'Maharashtra', lat: 19.2969, lng: 73.0629 },
    { city: 'Saharanpur', state: 'Uttar Pradesh', lat: 29.9675, lng: 77.5451 },
    { city: 'Gorakhpur', state: 'Uttar Pradesh', lat: 26.7606, lng: 83.3732 },
    { city: 'Bikaner', state: 'Rajasthan', lat: 28.0229, lng: 73.3119 },
    { city: 'Amravati', state: 'Maharashtra', lat: 20.9374, lng: 77.7796 },
    { city: 'Noida', state: 'Uttar Pradesh', lat: 28.5355, lng: 77.3910 },
    { city: 'Jamshedpur', state: 'Jharkhand', lat: 22.8046, lng: 86.2029 },
    { city: 'Bhilai', state: 'Chhattisgarh', lat: 21.2096, lng: 81.4285 },
    { city: 'Cuttack', state: 'Odisha', lat: 20.4625, lng: 85.8830 },
    { city: 'Firozabad', state: 'Uttar Pradesh', lat: 27.1591, lng: 78.3958 },
    { city: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
    { city: 'Nellore', state: 'Andhra Pradesh', lat: 14.4426, lng: 79.9865 },
    { city: 'Bhavnagar', state: 'Gujarat', lat: 21.7645, lng: 72.1519 },
    { city: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lng: 78.0322 },
    { city: 'Durgapur', state: 'West Bengal', lat: 23.5204, lng: 87.3119 },
    { city: 'Asansol', state: 'West Bengal', lat: 23.6889, lng: 86.9661 },
    { city: 'Rourkela', state: 'Odisha', lat: 22.2492, lng: 84.8828 },
    { city: 'Nanded', state: 'Maharashtra', lat: 19.1383, lng: 77.3210 },
    { city: 'Kolhapur', state: 'Maharashtra', lat: 16.7050, lng: 74.2433 },
    { city: 'Ajmer', state: 'Rajasthan', lat: 26.4499, lng: 74.6399 },
    { city: 'Akola', state: 'Maharashtra', lat: 20.7096, lng: 77.0022 },
    { city: 'Gulbarga', state: 'Karnataka', lat: 17.3297, lng: 76.8343 },
    { city: 'Jamnagar', state: 'Gujarat', lat: 22.4707, lng: 70.0577 },
    { city: 'Ujjain', state: 'Madhya Pradesh', lat: 23.1765, lng: 75.7885 },
    { city: 'Loni', state: 'Uttar Pradesh', lat: 28.7515, lng: 77.2889 },
    { city: 'Siliguri', state: 'West Bengal', lat: 26.7271, lng: 88.3953 },
    { city: 'Jhansi', state: 'Uttar Pradesh', lat: 25.4484, lng: 78.5685 },
    { city: 'Ulhasnagar', state: 'Maharashtra', lat: 19.2183, lng: 73.1635 },
    { city: 'Jammu', state: 'Jammu and Kashmir', lat: 32.7266, lng: 74.8570 },
    { city: 'Sangli-Miraj & Kupwad', state: 'Maharashtra', lat: 16.8524, lng: 74.5815 },
    { city: 'Mangalore', state: 'Karnataka', lat: 12.9141, lng: 74.8560 },
    { city: 'Erode', state: 'Tamil Nadu', lat: 11.3410, lng: 77.7172 },
    { city: 'Belgaum', state: 'Karnataka', lat: 15.8497, lng: 74.4977 },
    { city: 'Ambattur', state: 'Tamil Nadu', lat: 13.1149, lng: 80.0998 },
    { city: 'Tirunelveli', state: 'Tamil Nadu', lat: 8.7139, lng: 77.7567 },
    { city: 'Malegaon', state: 'Maharashtra', lat: 20.5609, lng: 74.5250 },
    { city: 'Gaya', state: 'Bihar', lat: 24.7914, lng: 85.0002 },
    { city: 'Jalgaon', state: 'Maharashtra', lat: 21.0077, lng: 75.5626 },
    { city: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lng: 73.7125 },
    { city: 'Maheshtala', state: 'West Bengal', lat: 22.5086, lng: 88.2532 },
    { city: 'Tirupur', state: 'Tamil Nadu', lat: 11.1085, lng: 77.3411 },
    { city: 'Davanagere', state: 'Karnataka', lat: 14.4644, lng: 75.9218 },
    { city: 'Kozhikode', state: 'Kerala', lat: 11.2588, lng: 75.7804 },
    { city: 'Akron', state: 'Ohio', lat: 41.0814, lng: -81.5190 }, // Example for testing
  ];

  // Find the closest city within a reasonable distance (50km)
  let closestCity = null;
  let minDistance = Infinity;

  for (const cityData of cityCoordinates) {
    const distance = calculateDistance(latitude, longitude, cityData.lat, cityData.lng);
    if (distance < minDistance && distance < 50) { // Within 50km
      minDistance = distance;
      closestCity = cityData;
    }
  }

  if (closestCity) {
    console.log(`Estimated location: ${closestCity.city}, ${closestCity.state} (${minDistance.toFixed(1)}km away)`);
    return { city: closestCity.city, state: closestCity.state };
  }

  return null;
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Indian cities and states mapping
export const indianCities = [
  { city: 'Mumbai', state: 'Maharashtra', region: 'West' },
  { city: 'Pune', state: 'Maharashtra', region: 'West' },
  { city: 'Nagpur', state: 'Maharashtra', region: 'West' },
  { city: 'Aurangabad', state: 'Maharashtra', region: 'West' },
  { city: 'Ahmedabad', state: 'Gujarat', region: 'West' },
  { city: 'Surat', state: 'Gujarat', region: 'West' },
  { city: 'Vadodara', state: 'Gujarat', region: 'West' },
  { city: 'Rajkot', state: 'Gujarat', region: 'West' },
  { city: 'Amritsar', state: 'Punjab', region: 'North' },
  { city: 'Chandigarh', state: 'Punjab', region: 'North' },
  { city: 'Ludhiana', state: 'Punjab', region: 'North' },
  { city: 'Jalandhar', state: 'Punjab', region: 'North' },
  { city: 'Bangalore', state: 'Karnataka', region: 'South' },
  { city: 'Mysore', state: 'Karnataka', region: 'South' },
  { city: 'Mangalore', state: 'Karnataka', region: 'South' },
  { city: 'Hubli', state: 'Karnataka', region: 'South' },
  { city: 'Kochi', state: 'Kerala', region: 'South' },
  { city: 'Thiruvananthapuram', state: 'Kerala', region: 'South' },
  { city: 'Kozhikode', state: 'Kerala', region: 'South' },
  { city: 'Thrissur', state: 'Kerala', region: 'South' },
  { city: 'Kolkata', state: 'West Bengal', region: 'East' },
  { city: 'Howrah', state: 'West Bengal', region: 'East' },
  { city: 'Durgapur', state: 'West Bengal', region: 'East' },
  { city: 'Siliguri', state: 'West Bengal', region: 'East' },
  { city: 'Hyderabad', state: 'Telangana', region: 'South' },
  { city: 'Warangal', state: 'Telangana', region: 'South' },
  { city: 'Karimnagar', state: 'Telangana', region: 'South' },
  { city: 'Nizamabad', state: 'Telangana', region: 'South' },
  { city: 'Jaipur', state: 'Rajasthan', region: 'North' },
  { city: 'Jodhpur', state: 'Rajasthan', region: 'North' },
  { city: 'Udaipur', state: 'Rajasthan', region: 'North' },
  { city: 'Jaisalmer', state: 'Rajasthan', region: 'North' },
  { city: 'Chennai', state: 'Tamil Nadu', region: 'South' },
  { city: 'Coimbatore', state: 'Tamil Nadu', region: 'South' },
  { city: 'Madurai', state: 'Tamil Nadu', region: 'South' },
  { city: 'Salem', state: 'Tamil Nadu', region: 'South' },
  { city: 'Delhi', state: 'Delhi', region: 'North' },
  { city: 'New Delhi', state: 'Delhi', region: 'North' },
  { city: 'Gurgaon', state: 'Haryana', region: 'North' },
  { city: 'Faridabad', state: 'Haryana', region: 'North' },
  { city: 'Panchkula', state: 'Haryana', region: 'North' },
  { city: 'Shimla', state: 'Himachal Pradesh', region: 'North' },
  { city: 'Manali', state: 'Himachal Pradesh', region: 'North' },
  { city: 'Dharamshala', state: 'Himachal Pradesh', region: 'North' },
  { city: 'Patna', state: 'Bihar', region: 'East' },
  { city: 'Gaya', state: 'Bihar', region: 'East' },
  { city: 'Bhagalpur', state: 'Bihar', region: 'East' },
  { city: 'Guwahati', state: 'Assam', region: 'Northeast' },
  { city: 'Dibrugarh', state: 'Assam', region: 'Northeast' },
  { city: 'Silchar', state: 'Assam', region: 'Northeast' },
  { city: 'Bhubaneswar', state: 'Odisha', region: 'East' },
  { city: 'Cuttack', state: 'Odisha', region: 'East' },
  { city: 'Rourkela', state: 'Odisha', region: 'East' },
  { city: 'Lucknow', state: 'Uttar Pradesh', region: 'North' },
  { city: 'Kanpur', state: 'Uttar Pradesh', region: 'North' },
  { city: 'Varanasi', state: 'Uttar Pradesh', region: 'North' },
  { city: 'Agra', state: 'Uttar Pradesh', region: 'North' },
  { city: 'Dehradun', state: 'Uttarakhand', region: 'North' },
  { city: 'Haridwar', state: 'Uttarakhand', region: 'North' },
  { city: 'Rishikesh', state: 'Uttarakhand', region: 'North' },
  { city: 'Bhopal', state: 'Madhya Pradesh', region: 'Central' },
  { city: 'Indore', state: 'Madhya Pradesh', region: 'Central' },
  { city: 'Jabalpur', state: 'Madhya Pradesh', region: 'Central' },
  { city: 'Raipur', state: 'Chhattisgarh', region: 'Central' },
  { city: 'Bilaspur', state: 'Chhattisgarh', region: 'Central' },
  { city: 'Panaji', state: 'Goa', region: 'West' },
  { city: 'Margao', state: 'Goa', region: 'West' },
  { city: 'Vasco da Gama', state: 'Goa', region: 'West' },
  { city: 'Imphal', state: 'Manipur', region: 'Northeast' },
  { city: 'Shillong', state: 'Meghalaya', region: 'Northeast' },
  { city: 'Aizawl', state: 'Mizoram', region: 'Northeast' },
  { city: 'Kohima', state: 'Nagaland', region: 'Northeast' },
  { city: 'Gangtok', state: 'Sikkim', region: 'Northeast' },
  { city: 'Agartala', state: 'Tripura', region: 'Northeast' },
  { city: 'Itanagar', state: 'Arunachal Pradesh', region: 'Northeast' },
  { city: 'Dispur', state: 'Assam', region: 'Northeast' },
  { city: 'Ranchi', state: 'Jharkhand', region: 'East' },
  { city: 'Jamshedpur', state: 'Jharkhand', region: 'East' },
  { city: 'Dhanbad', state: 'Jharkhand', region: 'East' },
  { city: 'Amaravati', state: 'Andhra Pradesh', region: 'South' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', region: 'South' },
  { city: 'Vijayawada', state: 'Andhra Pradesh', region: 'South' },
  { city: 'Guntur', state: 'Andhra Pradesh', region: 'South' }
];

// Get recipes by location
export function getRecipesByLocation(city: string, state: string) {
  const userLocation = indianCities.find(
    location => location.city.toLowerCase() === city.toLowerCase() || 
                location.state.toLowerCase() === state.toLowerCase()
  );
  
  if (!userLocation) return [];
  
  return mockRecipes.filter(recipe => 
    recipe.state === userLocation.state || 
    recipe.city === userLocation.city ||
    recipe.region === userLocation.region
  );
}

// Get location suggestions based on user input
export function getLocationSuggestions(query: string) {
  if (!query) return [];
  
  return indianCities.filter(location =>
    location.city.toLowerCase().includes(query.toLowerCase()) ||
    location.state.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10); // Limit to 10 suggestions
}

// Save user location to localStorage
export function saveUserLocation(city: string, state: string) {
  const location = { city, state, timestamp: Date.now() };
  localStorage.setItem('user-location', JSON.stringify(location));
}

// Get user location from localStorage
export function getUserLocation() {
  const saved = localStorage.getItem('user-location');
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// Check if location is set
export function isLocationSet() {
  return getUserLocation() !== null;
}

// Test geolocation availability
export function testGeolocation() {
  console.log("=== Geolocation Test ===");
  console.log("navigator.geolocation exists:", !!navigator.geolocation);
  
  if (navigator.geolocation) {
    console.log("Geolocation is supported");
    
    // Test if we can get a position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("✅ Geolocation test successful:", position.coords);
      },
      (error) => {
        console.log("❌ Geolocation test failed:", error.code, error.message);
      },
      { timeout: 5000 }
    );
  } else {
    console.log("❌ Geolocation not supported");
  }
} 
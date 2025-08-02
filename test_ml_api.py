import requests
import json

def test_ml_api():
    """Test the ML API endpoints"""
    
    # Test health endpoint
    try:
        print("Testing ML API health...")
        response = requests.get('http://localhost:5000/health')
        print(f"Health check status: {response.status_code}")
        if response.status_code == 200:
            print("✅ ML API is running")
        else:
            print("❌ ML API health check failed")
    except Exception as e:
        print(f"❌ Could not connect to ML API: {e}")
        return False
    
    # Test recommendation endpoint
    try:
        print("\nTesting recommendation endpoint...")
        test_data = {
            "ingredients": ["rice", "chicken", "spices"],
            "leftovers": [],
            "quiz_preferences": {
                "spiceLevel": "medium",
                "cuisine": "north",
                "experience": "medium",
                "time": "medium",
                "dietType": "non-veg"
            },
            "user_location": {
                "state": "Maharashtra",
                "region": "West"
            },
            "top_k": 5
        }
        
        response = requests.post(
            'http://localhost:5000/recommend',
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"Recommendation status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("✅ ML API recommendation working")
            print(f"Found {len(data.get('recommendations', []))} recommendations")
        else:
            print(f"❌ ML API recommendation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ ML API recommendation test failed: {e}")
        return False
    
    return True

if __name__ == "__main__":
    test_ml_api() 
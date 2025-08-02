import re

# Mapping of recipe keywords to local images
IMAGE_MAPPING = {
    # Biryani recipes
    'biryani': '/hackimage/hyderabadibiryani.jpg',
    'hyderabadi': '/hackimage/hyderabadibiryani.jpg',
    'awadhi': '/hackimage/awadhibiryani.jpg',
    'malabar': '/hackimage/Kerala Malabar Biryani.jpg',
    
    # Chicken recipes
    'chicken': '/hackimage/chetinad chicken.jpg',
    'butter chicken': '/hackimage/chetinad chicken.jpg',
    'tikka': '/hackimage/chetinad chicken.jpg',
    
    # Fish recipes
    'fish': '/hackimage/goanfishcurry.jpg',
    'fish curry': '/hackimage/goanfishcurry.jpg',
    'amritsari': '/hackimage/fish amritsari.jpg',
    'bengali': '/hackimage/Bengali Fish Curry.jpg',
    'assamese': '/hackimage/Assamese Fish Tenga.jpg',
    
    # Bread and flatbread recipes
    'roti': '/hackimage/thepla.jpg',
    'paratha': '/hackimage/thepla.jpg',
    'naan': '/hackimage/malabar parotha.jpg',
    'parotha': '/hackimage/malabar parotha.jpg',
    'chapati': '/hackimage/thepla.jpg',
    'poori': '/hackimage/thepla.jpg',
    'bhatura': '/hackimage/chole bhature.jpg',
    
    # South Indian recipes
    'dosa': '/hackimage/dosa.jpg',
    'idli': '/hackimage/idli sambar.jpg',
    'sambar': '/hackimage/idli sambar.jpg',
    'upma': '/hackimage/upma.jpg',
    'pongal': '/hackimage/pongal.jpg',
    'appam': '/hackimage/appam veg stew.jpg',
    'puttu': '/hackimage/Kerala Puttu Kadala.jpg',
    'khandvi': '/hackimage/khandvi.jpg',
    'khaman': '/hackimage/khaman.jpg',
    
    # Dal and lentil recipes
    'dal': '/hackimage/daal.jpg',
    'khichdi': '/hackimage/daal.jpg',
    'khichri': '/hackimage/daal.jpg',
    
    # Paneer recipes
    'paneer': '/hackimage/paneerpakoda.jpg',
    
    # Mutton recipes
    'mutton': '/hackimage/mutton.jpg',
    'rogan': '/hackimage/roganjosh.jpg',
    
    # Street food
    'vada': '/hackimage/vadapav.jpg',
    'pav': '/hackimage/vadapav.jpg',
    'misal': '/hackimage/misalpav.jpg',
    'dabeli': '/hackimage/dabeli.webp',
    
    # Regional specialties
    'sarson': '/hackimage/sarso saag.jpg',
    'saag': '/hackimage/sarso saag.jpg',
    'ragi': '/hackimage/ragi tatte.jpg',
    'puran': '/hackimage/puranpoli.jpg',
    'poli': '/hackimage/puranpoli.jpg',
    'pakhala': '/hackimage/Odisha Pakhala_.jpg',
    'siddu': '/hackimage/siddu.jpg',
    
    # Default images for different categories
    'curry': '/hackimage/chetinad chicken.jpg',
    'rice': '/hackimage/dosa.jpg',
    'bread': '/hackimage/thepla.jpg',
    'vegetable': '/hackimage/thepla.jpg',
    'soup': '/hackimage/daal.jpg',
    'snack': '/hackimage/vadapav.jpg',
    'breakfast': '/hackimage/upma.jpg',
    'lunch': '/hackimage/daal.jpg',
    'dinner': '/hackimage/chetinad chicken.jpg',
}

def get_image_for_recipe(title, ingredients, cuisine):
    """Determine the best image for a recipe based on its content"""
    text = f"{title} {' '.join(ingredients)} {cuisine}".lower()
    
    # Check for specific matches first
    for keyword, image in IMAGE_MAPPING.items():
        if keyword in text:
            return image
    
    # Default fallbacks based on cuisine
    if 'south' in text or 'tamil' in text or 'karnataka' in text or 'kerala' in text:
        return '/hackimage/dosa.jpg'
    elif 'north' in text or 'punjab' in text or 'delhi' in text:
        return '/hackimage/thepla.jpg'
    elif 'bengal' in text or 'bengali' in text:
        return '/hackimage/Bengali Fish Curry.jpg'
    elif 'gujarat' in text or 'gujarati' in text:
        return '/hackimage/thepla.jpg'
    elif 'maharashtra' in text or 'marathi' in text:
        return '/hackimage/vadapav.jpg'
    else:
        return '/hackimage/daal.jpg'  # Default fallback

def update_mock_data_images():
    """Update the mockData.ts file with local images"""
    with open('src/data/mockData.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all recipe objects and update their images
    recipe_pattern = r'{\s*id:\s*[\'"][^\'"]+[\'"],\s*title:\s*[\'"]([^\'"]+)[\'"],\s*cuisine:\s*[\'"]([^\'"]+)[\'"][^}]*ingredients:\s*\[([^\]]+)\][^}]*image:\s*[\'"][^\'"]+[\'"]'
    
    def replace_image(match):
        title = match.group(1)
        cuisine = match.group(2)
        ingredients_str = match.group(3)
        
        # Parse ingredients
        ingredients = []
        for ing in re.findall(r'[\'"]([^\'"]+)[\'"]', ingredients_str):
            ingredients.append(ing)
        
        # Get appropriate image
        new_image = get_image_for_recipe(title, ingredients, cuisine)
        
        # Replace the image line
        return match.group(0).replace(
            re.search(r'image:\s*[\'"][^\'"]+[\'"]', match.group(0)).group(0),
            f"image: '{new_image}'"
        )
    
    # Apply the replacement
    updated_content = re.sub(recipe_pattern, replace_image, content, flags=re.DOTALL)
    
    # Write back to file
    with open('src/data/mockData.ts', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("Updated mockData.ts with local images!")

if __name__ == "__main__":
    update_mock_data_images() 
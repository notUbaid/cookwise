# Zapier Chatbot Integration

## Overview

The CookWise app now includes a Zapier chatbot bubble positioned in the bottom right corner of the screen. This provides users with instant access to customer support and assistance.

## Features

- ✅ **Bottom Right Positioning**: Chatbot bubble appears in the bottom right corner
- ✅ **Responsive Design**: Adapts to mobile and desktop screens
- ✅ **Loading States**: Shows loading spinner while script loads
- ✅ **Error Handling**: Gracefully handles script loading failures
- ✅ **TypeScript Support**: Full TypeScript integration with custom element declarations
- ✅ **Global Availability**: Available on all pages of the app

## Implementation

### Component Structure

```
src/components/
├── ZapierChatbot.tsx    # Main chatbot component
└── ZapierChatbot.css    # Styling for positioning and loading states
```

### Usage

The chatbot is automatically included in the main App component:

```tsx
// In src/App.tsx
import ZapierChatbot from "@/components/ZapierChatbot";

// The chatbot is rendered at the bottom of the BrowserRouter
<ZapierChatbot chatbotId="cmdtvh3ct000vm7u4t5ae8ikn" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `chatbotId` | `string` | Required | Your Zapier chatbot ID |
| `isPopup` | `boolean` | `true` | Whether to show as popup |
| `className` | `string` | `''` | Additional CSS classes |
| `showLoadingState` | `boolean` | `false` | Show loading spinner while script loads |

### Customization

#### Changing Position

To change the chatbot position, modify the CSS in `src/components/ZapierChatbot.css`:

```css
.zapier-chatbot-container {
  position: fixed;
  bottom: 20px;  /* Change this */
  right: 20px;   /* Change this */
  z-index: 1000;
}
```

#### Styling the Loading State

Customize the loading spinner appearance:

```css
.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db; /* Change color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

#### Conditional Rendering

You can conditionally show the chatbot based on user preferences or other logic:

```tsx
const [showChatbot, setShowChatbot] = useState(true);

// In your component
{showChatbot && (
  <ZapierChatbot 
    chatbotId="cmdtvh3ct000vm7u4t5ae8ikn"
    showLoadingState={true}
  />
)}
```

## Technical Details

### Script Loading

The component automatically loads the Zapier chatbot script:
- Checks if script is already loaded to prevent duplicates
- Handles loading errors gracefully
- Cleans up script on component unmount

### TypeScript Support

Custom element declarations are included for TypeScript support:

```tsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zapier-interfaces-chatbot-embed': {
        'is-popup': string;
        'chatbot-id': string;
      };
    }
  }
}
```

### CSS Features

- **Fixed Positioning**: Ensures chatbot stays in bottom right
- **High Z-Index**: Prevents overlap with other UI elements
- **Pointer Events**: Allows clicks to pass through container but not chatbot
- **Responsive Design**: Adjusts size and position on mobile devices
- **Loading Animation**: Smooth spinning animation for loading state

## Troubleshooting

### Chatbot Not Appearing

1. Check browser console for script loading errors
2. Verify the `chatbotId` is correct
3. Ensure no ad blockers are blocking the Zapier script
4. Check if the script URL is accessible: `https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js`

### Styling Issues

1. Check if CSS is properly imported
2. Verify z-index doesn't conflict with other elements
3. Ensure pointer-events are set correctly

### Performance

- Script is loaded asynchronously to not block page rendering
- Component includes cleanup to prevent memory leaks
- Loading state prevents layout shifts

## Deployment

The chatbot will work automatically when you deploy to Vercel or any other hosting platform. No additional configuration is required.

## Future Enhancements

Potential improvements:
- [ ] Add user preference to hide/show chatbot
- [ ] Integrate with user authentication
- [ ] Add analytics tracking
- [ ] Customize chatbot appearance based on theme
- [ ] Add sound notifications for new messages 
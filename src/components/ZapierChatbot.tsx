import React, { useEffect, useState } from 'react';
import './ZapierChatbot.css';

// TypeScript declarations for the custom Zapier element
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

interface ZapierChatbotProps {
  chatbotId: string;
  isPopup?: boolean;
  className?: string;
  showLoadingState?: boolean;
}

const ZapierChatbot: React.FC<ZapierChatbotProps> = ({ 
  chatbotId, 
  isPopup = true, 
  className = '',
  showLoadingState = false
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="zapier-interfaces.esm.js"]');
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    // Load Zapier chatbot script
    const script = document.createElement('script');
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
    script.type = 'module';
    script.async = true;
    
    script.onload = () => {
      setScriptLoaded(true);
      setScriptError(null);
    };
    
    script.onerror = () => {
      setScriptError('Failed to load Zapier chatbot script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if no other components are using it
      const allScripts = document.querySelectorAll('script[src*="zapier-interfaces.esm.js"]');
      if (allScripts.length === 1) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Show loading state if requested and script is still loading
  if (showLoadingState && !scriptLoaded && !scriptError) {
    return (
      <div className={`zapier-chatbot-container ${className}`}>
        <div className="zapier-chatbot-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Show error state if script failed to load
  if (scriptError) {
    console.warn('Zapier chatbot failed to load:', scriptError);
    return null; // Don't render anything if script failed
  }

  return (
    <div className={`zapier-chatbot-container ${className}`}>
      <zapier-interfaces-chatbot-embed 
        is-popup={isPopup.toString()} 
        chatbot-id={chatbotId}
      />
    </div>
  );
};

export default ZapierChatbot; 
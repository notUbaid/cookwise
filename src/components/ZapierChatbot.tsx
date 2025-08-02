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
    // Still render the container even if script fails, so we can show a fallback
  }

  return (
    <div className={`zapier-chatbot-container ${className}`}>
      {scriptLoaded && !scriptError ? (
        <zapier-interfaces-chatbot-embed 
          is-popup={isPopup.toString()} 
          chatbot-id={chatbotId}
        />
      ) : (
        <div className="zapier-chatbot-fallback">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZapierChatbot; 
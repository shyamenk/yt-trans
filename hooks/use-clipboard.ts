// Custom hook for clipboard functionality
// This will be used for copy-to-clipboard features

import { useState } from 'react';

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
      
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopied(false);
      return false;
    }
  };

  return {
    copyToClipboard,
    copied,
  };
} 
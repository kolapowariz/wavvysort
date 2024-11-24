'use client';
function copyToClipboard() {
  const currentUrl = window.location.href; // Get the current URL
  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      console.log("URL copied to clipboard!");
      alert("URL copied to clipboard!");
      // Optionally, you can display a success message to the user
    })
    .catch(err => {
      console.error("Failed to copy URL: ", err);
      // Optionally, you can display an error message to the user
    });
}
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import React from 'react';

const CopyLinkButton: React.FC = () => {
  return (
    <button onClick={copyToClipboard}><ArrowUpTrayIcon className="w-5 h-5" /></button>
  );
}

export default CopyLinkButton;
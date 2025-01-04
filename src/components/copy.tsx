'use client';
function copyToClipboard() {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      console.log("URL copied to clipboard!");
      alert("URL copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy URL: ", err);
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
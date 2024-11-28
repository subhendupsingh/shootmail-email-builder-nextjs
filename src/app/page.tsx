'use client';

import { useEffect, useRef } from 'react';
import { ShootmailEditor } from '@shootmail/email-builder';
import '@shootmail/email-builder/dist/shootmail.css';

export default function Home() {
  const editorRef = useRef<ShootmailEditor | null>(null);
  const previewButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Initialize editor only on client side
    if (typeof window !== 'undefined' && !editorRef.current) {
      const editor = new ShootmailEditor({
        elementId: 'shootmail-editor',
        settingsControl: true,
        imageServiceUrl: {
          url: 'YOUR_UPLOAD_URL',
          token: 'YOUR_UPLOAD_TOKEN'
        },
        // Optional theme configuration
        theme: {
          borderRadius: '8',
          padding: true,
          light: {
            editorBackground: '#ffffff',
            editorBorder: '#e2e8f0',
            emailBackground: '#f8fafc'
          },
          dark: {
            editorBackground: '#1e293b',
            editorBorder: '#334155',
            emailBackground: '#0f172a'
          }
        }
      });

      editorRef.current = editor;
    }

    // Preview button click handler
    const handlePreviewClick = () => {
      if (editorRef.current) {
        const htmlContent = editorRef.current.getHTML();
        // You can implement your preview logic here
        console.log(htmlContent);
      }
    };

    // Set up preview button
    if (previewButtonRef.current) {
      previewButtonRef.current.addEventListener('click', handlePreviewClick);
    }

    // Cleanup
    return () => {
      if (previewButtonRef.current) {
        previewButtonRef.current.removeEventListener('click', handlePreviewClick);
      }
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shootmail Editor</h1>
          <button
            ref={previewButtonRef}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Preview Email
          </button>
        </div>
        
        {/* Editor container */}
        <div id="shootmail-editor" className="border rounded-lg shadow-sm" />
      </div>
    </main>
  );
}
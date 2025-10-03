import React, { useState, FormEvent } from 'react';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface Message {
  role: string;
  content: string;
}

interface DocumentSectionProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  document: File | null;
  documentContent: string;
  conversation: Array<Message>;
  loading: boolean;
  handleSendMessage: (message: string) => void;
}

export const DocumentSection: React.FC<DocumentSectionProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  document,
  documentContent,
  conversation,
  loading,
  handleSendMessage,
}) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      handleSendMessage(message);
      setMessage('');
    }
  };

  return (
    <section className="document-section bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">1. Upload Business Requirement Document</h2>
      
      {!document ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium">Drag & drop your document here, or click to select</p>
            <p className="text-sm text-gray-500 mt-2">Supports CSV, Excel, PDF, DOCX, and TXT files</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-medium">Document uploaded successfully</h3>
                <p className="text-sm text-gray-500">{document.name} ({Math.round(document.size / 1024)} KB)</p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg">
            <div className="bg-gray-50 p-3 border-b">
              <h3 className="font-medium">Conversation</h3>
              <p className="text-sm text-gray-500">Ask about specific rows or sections of your document</p>
            </div>
            
            <div className="chat-container p-4 space-y-4 h-64 overflow-y-auto">
              {conversation.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <p>Start a conversation by asking about specific rows or sections.</p>
                  <p className="text-sm mt-2">Example: "Extract information from rows 1-15"</p>
                </div>
              ) : (
                conversation.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-primary-100 ml-12' 
                        : 'bg-gray-100 mr-12'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{msg.role === 'user' ? 'You' : 'Assistant'}</p>
                    <p>{msg.content}</p>
                  </div>
                ))
              )}
              {loading && (
                <div className="bg-gray-100 p-3 rounded-lg mr-12 animate-pulse">
                  <p className="text-sm font-medium mb-1">Assistant</p>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="border-t p-3 flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message (e.g., 'Extract information from rows 1-15')"
                className="flex-1 bg-gray-50 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                disabled={!message.trim() || loading}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}; 
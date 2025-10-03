import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DocumentUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
  document: File | null;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDrop, document }) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <section className="document-upload-section bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">1. Upload Business Requirements Document</h2>
      
      {document ? (
        <div className="flex flex-col items-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Document Uploaded Successfully</h3>
                <p className="text-green-700 text-sm mt-1">
                  {document.name} ({(document.size / 1024).toFixed(2)} KB)
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What's Next?
            </h3>
            <ol className="list-decimal pl-6 space-y-2 text-blue-700">
              <li>Ask questions about the document to understand requirements</li>
              <li>Request specific details about features or user stories</li>
              <li>Generate Jira tickets with acceptance criteria</li>
              <li>View the automatically created flowchart for the feature</li>
            </ol>
          </div>
          
          <div className="flex justify-center mt-6">
            <div {...getRootProps({ className: 'cursor-pointer text-center' })}>
              <input {...getInputProps()} />
              <button className="text-primary-600 hover:text-primary-800 hover:underline flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload a different document
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `border-2 ${
              isDragActive ? 'border-primary-400 bg-primary-50' : 'border-dashed border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            } rounded-lg py-12 px-6 transition duration-150 ease-in-out cursor-pointer text-center`
          })}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-6">
            <div>
              {isDragActive ? (
                <svg className="mx-auto h-14 w-14 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ) : (
                <svg className="mx-auto h-14 w-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop your document here' : 'Drag & drop your document here'}
              </p>
              <p className="mt-1 text-sm text-gray-500">or</p>
              <button
                type="button"
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Browse for files
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 max-w-md mx-auto">
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                <svg className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>CSV, Excel files</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                <svg className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Word, PDF, Text files</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              <p>Max file size: 10MB</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 
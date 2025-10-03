import { useState, useRef, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useDropzone } from 'react-dropzone';
import { DocumentSection } from '../components/DocumentSection';
import { TicketSection } from '../components/TicketSection';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { parseDocument, extractRows } from '../utils/documentParser';
import { aiService } from '../services/aiService';

export default function Home() {
  const [document, setDocument] = useState<File | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [documentData, setDocumentData] = useState<any[]>([]);
  const [documentType, setDocumentType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<Array<{ role: string; content: string }>>([]);
  const [ticket, setTicket] = useState<any>(null);
  const [flowchart, setFlowchart] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      try {
        setError('');
        const file = acceptedFiles[0];
        setDocument(file);
        setDocumentType(file.type);
        
        // Read the file content
        const reader = new FileReader();
        reader.onload = async () => {
          const content = reader.result as string;
          setDocumentContent(content);
          
          try {
            // Parse document based on file type
            const parsedData = await parseDocument(file);
            setDocumentData(parsedData);
            
            // Add welcome message to conversation
            const welcomeMessage = {
              role: 'assistant',
              content: `I've loaded your document "${file.name}". You can now ask me to analyze specific rows, for example: "Extract information from rows 1-15" or "Analyze rows 5 through 10".`
            };
            setConversation([welcomeMessage]);
          } catch (err) {
            setError('Failed to parse document. Please check file format.');
            console.error('Document parsing error:', err);
          }
        };
        
        if (file.type.includes('csv') || file.type.includes('text/plain')) {
          reader.readAsText(file);
        } else if (file.type.includes('sheet') || file.type.includes('excel')) {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsText(file);
        }
      } catch (err) {
        setError('An error occurred while processing the file.');
        console.error('File upload error:', err);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    }
  });

  const handleSendMessage = async (message: string) => {
    if (!document || !documentContent) {
      setError('Please upload a document first.');
      return;
    }
    
    // Add user message to conversation
    const newConversation = [...conversation, { role: 'user', content: message }];
    setConversation(newConversation);
    
    setLoading(true);
    setError('');
    
    try {
      // Check if the message is asking for specific rows
      const rowPattern = /rows?\s+(\d+)(?:\s*-\s*|\s+through\s+|\s+to\s+)(\d+)/i;
      const match = message.match(rowPattern);
      
      let response = '';
      
      if (match && match.length >= 3) {
        // Extract row numbers (converting to 1-indexed)
        const startRow = parseInt(match[1], 10);
        const endRow = parseInt(match[2], 10);
        
        if (!isNaN(startRow) && !isNaN(endRow) && startRow > 0 && endRow >= startRow) {
          // Extract the specified rows
          const extractedRows = extractRows(documentData, startRow, endRow);
          
          // Format the response
          if (extractedRows.length > 0) {
            response = `I've analyzed rows ${startRow} through ${endRow}. Here's what I found:\n\n`;
            
            // Format the data in a readable way
            extractedRows.forEach((row, index) => {
              response += `Row ${startRow + index}:\n`;
              Object.entries(row).forEach(([key, value]) => {
                response += `  ${key}: ${value}\n`;
              });
              response += '\n';
            });
            
            response += 'Is there anything specific about these rows you would like to know?';
          } else {
            response = `I couldn't find any data in rows ${startRow} through ${endRow}. Please check if the row numbers are within the document's range.`;
          }
        } else {
          response = 'I couldn\'t understand the row numbers. Please specify valid row numbers, for example: "Extract information from rows 1-15".';
        }
      } else {
        // For other queries, use the AI service
        response = await aiService.analyzeDocument({
          documentContent: documentContent,
          query: message
        });
      }
      
      // Add AI response to conversation
      const aiResponseMessage = {
        role: 'assistant',
        content: response
      };
      
      setConversation([...newConversation, aiResponseMessage]);
    } catch (err) {
      setError('Failed to analyze the document. Please try again.');
      console.error('Document analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTicket = async () => {
    if (!document || conversation.length <= 1) {
      setError('Please upload a document and have a conversation to analyze the requirements first.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // In a real application, you'd send the document content and conversation
      // to the AI service for analysis and ticket generation
      const result = await aiService.generateTicket({
        documentContent: documentContent,
        documentAnalysis: conversation
      });
      
      setTicket({
        context: result.context,
        requirements: result.requirements
      });
      
      setFlowchart(result.flowchart);
    } catch (err) {
      setError('Failed to generate ticket. Please try again.');
      console.error('Ticket generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>PM Automation Tool</title>
        <meta name="description" content="Product Management Automation Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Product Management Automation</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8">
          {/* Document Section */}
          <DocumentSection 
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            document={document}
            documentContent={documentContent}
            conversation={conversation}
            loading={loading}
            handleSendMessage={handleSendMessage}
          />
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>
          
          {/* Ticket Section */}
          <TicketSection 
            document={document}
            loading={loading}
            ticket={ticket}
            flowchart={flowchart}
            handleGenerateTicket={handleGenerateTicket}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
} 
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface Requirement {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

interface Ticket {
  context: string;
  requirements: Requirement[];
}

interface TicketSectionProps {
  document: File | null;
  loading: boolean;
  ticket: Ticket | null;
  flowchart: string;
  handleGenerateTicket: () => void;
}

export const TicketSection: React.FC<TicketSectionProps> = ({
  document,
  loading,
  ticket,
  flowchart,
  handleGenerateTicket,
}) => {
  const flowchartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (flowchart && flowchartRef.current) {
      try {
        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        });
        
        // Render flowchart
        mermaid.contentLoaded();
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    }
  }, [flowchart]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  // Format Jira ticket for clipboard
  const formatJiraTicket = () => {
    if (!ticket) return '';
    
    let jiraText = `h2. Context/User Story\n${ticket.context}\n\n`;
    
    jiraText += `h2. Business Requirements\n`;
    ticket.requirements.forEach((req, index) => {
      jiraText += `h3. ${req.title}\n${req.description}\n\n`;
      jiraText += `h4. Acceptance Criteria:\n`;
      req.acceptanceCriteria.forEach((criteria, criteriaIndex) => {
        jiraText += `* ${criteria}\n`;
      });
      jiraText += '\n';
    });
    
    return jiraText;
  };

  return (
    <section className="ticket-section bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">2. Generate Jira Ticket</h2>
      
      {!document ? (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-2">Please upload a document first to generate a Jira ticket</p>
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      ) : ticket ? (
        <div className="space-y-8">
          {/* Context Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-blue-800">Context / User Story</h3>
              <button 
                onClick={() => copyToClipboard(ticket.context)}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Copy
              </button>
            </div>
            <p className="text-gray-800">{ticket.context}</p>
          </div>
          
          {/* Business Requirements Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Business Requirements</h3>
              <button 
                onClick={() => copyToClipboard(formatJiraTicket())}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Copy All as Jira Format
              </button>
            </div>
            
            <div className="space-y-6">
              {ticket.requirements.map((requirement, index) => (
                <div key={index} className="border rounded-lg shadow-sm">
                  <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                    <h4 className="font-medium text-gray-800">{requirement.title}</h4>
                    <span className="text-xs text-gray-500">Requirement {index + 1}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-4">{requirement.description}</p>
                    
                    <h5 className="font-medium text-sm text-gray-600 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Acceptance Criteria:
                    </h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      {requirement.acceptanceCriteria.map((criteria, criteriaIndex) => {
                        // Highlight the different parts of the Given/When/Then format
                        const givenMatch = criteria.match(/^Given (.*?)(?:, when|$)/i);
                        const whenMatch = criteria.match(/when (.*?)(?:, then|$)/i);
                        const thenMatch = criteria.match(/then (.*?)$/i);
                        
                        return (
                          <li key={criteriaIndex} className="text-gray-700">
                            {givenMatch && (
                              <span>
                                <span className="font-semibold text-blue-600">Given </span>
                                <span>{givenMatch[1]}, </span>
                              </span>
                            )}
                            {whenMatch && (
                              <span>
                                <span className="font-semibold text-purple-600">when </span>
                                <span>{whenMatch[1]}, </span>
                              </span>
                            )}
                            {thenMatch && (
                              <span>
                                <span className="font-semibold text-green-600">then </span>
                                <span>{thenMatch[1]}</span>
                              </span>
                            )}
                            {!givenMatch && !whenMatch && !thenMatch && (
                              <span>{criteria}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Flow Chart Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Flow Chart</h3>
            <div className="border rounded-lg p-4 overflow-auto bg-white">
              <div 
                ref={flowchartRef} 
                className="mermaid flowchart-container mx-auto"
              >
                {flowchart}
              </div>
            </div>
          </div>
          
          {/* Export Actions */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => copyToClipboard(formatJiraTicket())}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Copy to Clipboard
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export to Jira
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="mb-6">Ready to generate a comprehensive Jira ticket with acceptance criteria and flow chart</p>
          <button
            onClick={handleGenerateTicket}
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 flex items-center justify-center mx-auto"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Comprehensive Ticket...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Generate Jira Ticket & Flowchart
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}; 
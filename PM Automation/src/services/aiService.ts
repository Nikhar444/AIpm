// This file would contain the actual implementation to call OpenAI or another AI service
// For now, it's a placeholder with mock implementation

interface AnalyzeDocumentRequest {
  documentContent: string;
  query: string;
}

interface GenerateTicketRequest {
  documentContent: string;
  documentAnalysis: Array<{role: string, content: string}>;
}

interface Requirement {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

interface GenerateTicketResponse {
  context: string;
  requirements: Requirement[];
  flowchart: string;
}

export const aiService = {
  // Analyze specific parts of the document
  analyzeDocument: async (request: AnalyzeDocumentRequest): Promise<string> => {
    console.log('Analyzing document with query:', request.query);
    
    // In a real implementation, this would call an API
    // For demo purposes, returning a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        if (request.query.toLowerCase().includes('feature') && request.query.toLowerCase().includes('high')) {
          resolve(`I've analyzed the document based on your query about high priority features. 
          
I found 4 high priority features:
1. FR-001: User Authentication - Implementing secure login/logout functionality with password recovery
2. FR-003: File Upload - Allowing users to upload and manage documents in various formats
3. FR-006: User Management - Admin functionality to manage users and permissions
4. FR-011: Payment Processing - Implementing secure payment gateway integration

These features are critical to the application's functionality and have been prioritized for early implementation. Two of them (User Authentication and User Management) are already in progress. Would you like more specific information about any of these features?`);
        } else if (request.query.toLowerCase().includes('status') && request.query.toLowerCase().includes('in progress')) {
          resolve(`I've analyzed the document for features with "In Progress" status.

I found 2 features currently in progress:
1. FR-001: User Authentication - Assigned to John Smith, due on 2023-06-15
2. FR-006: User Management - Assigned to Lisa Anderson, due on 2023-06-30

Both of these are high priority features and are scheduled to be completed by the end of June. Would you like more information about the implementation details for these features?`);
        } else {
          resolve(`I've analyzed the document based on your query: "${request.query}". 

Based on my analysis, the document appears to be a feature tracking list with details on 15 planned features for development. Each feature has a unique ID, name, description, priority level, current status, assignee, and due date.

The features range from core functionality like User Authentication and Dashboard creation to more specialized features like Payment Processing and Multilingual Support.

Is there something specific about these features you'd like to know more about?`);
        }
      }, 1000);
    });
  },
  
  // Generate a Jira ticket with acceptance criteria and flowchart
  generateTicket: async (request: GenerateTicketRequest): Promise<GenerateTicketResponse> => {
    console.log('Generating Jira ticket from document and conversation');
    
    // In a real implementation, this would call an OpenAI API
    // For demo purposes, returning a comprehensive mock response
    
    // Check conversation for specific features mentioned
    const conversationText = request.documentAnalysis.map(msg => msg.content).join(' ');
    const hasMentionedAuthentication = conversationText.toLowerCase().includes('authentication');
    const hasMentionedFileUpload = conversationText.toLowerCase().includes('file upload');
    const hasMentionedPayment = conversationText.toLowerCase().includes('payment');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (hasMentionedAuthentication) {
          resolve({
            context: "As a user, I want a secure authentication system that allows me to create an account, log in, and recover my password if needed, so that I can securely access the application and manage my data.",
            requirements: [
              {
                title: "User Registration",
                description: "The system should provide a registration page where new users can create an account by providing their details.",
                acceptanceCriteria: [
                  "Given I am a new user, when I navigate to the registration page, then I should see a form to enter my details (name, email, password).",
                  "Given I am on the registration page, when I enter valid information and submit the form, then a new account should be created and I should be redirected to the login page.",
                  "Given I am on the registration page, when I enter an email that already exists in the system, then I should see an error message indicating the email is already in use.",
                  "Given I am entering my password, when the password doesn't meet security requirements, then I should see real-time validation feedback about password strength.",
                  "Given I have filled the registration form, when I submit it without completing a required field, then the form should not submit and I should see which fields need attention.",
                  "Given I've just registered, when I check my email, then I should receive a verification email to confirm my account."
                ]
              },
              {
                title: "User Login",
                description: "The system should provide a secure login mechanism using email and password.",
                acceptanceCriteria: [
                  "Given I have a registered account, when I enter my correct email and password on the login page, then I should be authenticated and directed to the dashboard.",
                  "Given I am on the login page, when I enter incorrect credentials, then I should see an error message without specific details on which field is wrong (for security).",
                  "Given I fail to login multiple times, when I attempt again, then the system should implement rate limiting or temporary lockout to prevent brute force attacks.",
                  "Given I check the 'Remember Me' option, when I log in successfully, then my session should persist across browser restarts until I explicitly log out.",
                  "Given I am logged in on multiple devices, when I log out from one device, then I should remain logged in on other devices unless I choose 'Log out from all devices'."
                ]
              },
              {
                title: "Password Recovery",
                description: "The system should allow users to securely reset their password when forgotten.",
                acceptanceCriteria: [
                  "Given I am on the login page, when I click 'Forgot Password', then I should be directed to a password recovery page.",
                  "Given I am on the password recovery page, when I enter my registered email and submit, then a password reset link should be sent to that email.",
                  "Given I have received a password reset email, when I click the link, then I should be directed to a page where I can set a new password.",
                  "Given I am on the reset password page, when I enter and confirm a new password that meets security requirements, then my password should be updated and I should be redirected to the login page.",
                  "Given I try to use a password reset link, when the link has expired (after 24 hours), then I should see an error message and be prompted to request a new link.",
                  "Given I try to reuse a password reset link, when the link has already been used once, then the link should be invalidated and I should see an appropriate message."
                ]
              },
              {
                title: "Session Management",
                description: "The system should securely manage user sessions and provide logout functionality.",
                acceptanceCriteria: [
                  "Given I am logged in, when I click the logout button, then my session should be invalidated and I should be redirected to the login page.",
                  "Given I am logged in, when my session is inactive for 30 minutes, then I should be automatically logged out for security reasons.",
                  "Given I am logged in, when I close the browser without logging out, then my session should be handled according to my 'Remember Me' choice.",
                  "Given I have logged in from multiple devices, when I select 'Log out from all devices', then all my active sessions should be invalidated."
                ]
              }
            ],
            flowchart: `
              graph TD
                A[User] -->|Visits Site| B{Has Account?}
                B -->|No| C[Register]
                B -->|Yes| D[Login Page]
                C -->|Fill Registration Form| E{Validation}
                E -->|Valid| F[Create Account]
                E -->|Invalid| C
                F -->|Send Email| G[Verification Email]
                G -->|Verify Email| D
                D -->|Enter Credentials| H{Authentication}
                H -->|Success| I[Dashboard]
                H -->|Failure| J{Max Attempts?}
                J -->|No| D
                J -->|Yes| K[Temporary Lockout]
                K --> D
                D -->|Forgot Password| L[Password Recovery]
                L -->|Enter Email| M[Send Reset Link]
                M -->|Click Link in Email| N[Reset Password Page]
                N -->|Set New Password| O{Validation}
                O -->|Valid| P[Update Password]
                O -->|Invalid| N
                P --> D
                I -->|Logout| D
                I -->|Inactivity| Q[Auto Logout]
                Q --> D
            `
          });
        } else if (hasMentionedFileUpload) {
          resolve({
            context: "As a user, I want to be able to upload, manage, and organize various types of documents within the application so that I can store important files securely and access them when needed.",
            requirements: [
              {
                title: "Document Upload",
                description: "The system should allow users to upload documents in various formats with proper validation and feedback.",
                acceptanceCriteria: [
                  "Given I am on the documents page, when I click the upload button, then I should be presented with a file selector dialog.",
                  "Given I am uploading a file, when the file type is supported (PDF, DOCX, XLSX, CSV, TXT, etc.), then the upload should proceed.",
                  "Given I am uploading a file, when the file type is not supported, then I should see an error message explaining the supported formats.",
                  "Given I am uploading a file, when the file exceeds the maximum size limit (50MB), then I should see an error message about the size restriction.",
                  "Given I am uploading a file, when the upload is in progress, then I should see a progress indicator.",
                  "Given I try to upload a file with a virus or malicious content, when the system scans it, then the upload should be blocked and I should be notified.",
                  "Given I am uploading multiple files at once, when one file fails validation, then the other valid files should still be processed."
                ]
              },
              {
                title: "Document Management",
                description: "The system should provide functionality to view, organize, and manage uploaded documents.",
                acceptanceCriteria: [
                  "Given I have uploaded documents, when I navigate to the documents page, then I should see a list of all my uploaded files.",
                  "Given I am viewing my documents, when I select a document, then I should be able to see its details (name, type, size, upload date).",
                  "Given I am viewing a document, when the document is a PDF or image, then I should be able to preview it directly in the browser.",
                  "Given I am viewing my documents, when I select a document, then I should have options to download, rename, or delete it.",
                  "Given I choose to delete a document, when I confirm the deletion, then the document should be permanently removed and I should see a confirmation message.",
                  "Given I have a large number of documents, when I view the documents page, then I should see pagination or infinite scrolling for better performance."
                ]
              },
              {
                title: "Document Organization",
                description: "The system should allow users to organize documents into folders and use metadata for easy retrieval.",
                acceptanceCriteria: [
                  "Given I am on the documents page, when I click 'Create Folder', then I should be able to create a new folder with a custom name.",
                  "Given I have created folders, when I upload a new document, then I should be able to select which folder to save it in.",
                  "Given I am viewing my documents, when I drag a document onto a folder, then the document should be moved to that folder.",
                  "Given I am viewing a document, when I add tags or metadata to it, then this information should be saved and visible in the document details.",
                  "Given I am on the documents page, when I use the search function, then the system should search through document names, content, and metadata.",
                  "Given I have documents with similar names in different folders, when I search for them, then the results should show the folder path to distinguish them."
                ]
              },
              {
                title: "Document Sharing",
                description: "The system should allow users to share documents with other users with appropriate permission controls.",
                acceptanceCriteria: [
                  "Given I am viewing a document, when I click 'Share', then I should see options to share with specific users or generate a shareable link.",
                  "Given I am sharing a document with specific users, when I select users, then I should be able to set permissions (view only, edit, full access).",
                  "Given I am sharing a document via link, when I create the link, then I should be able to set an expiration date and password protection.",
                  "Given I have shared a document, when I revoke access, then the user(s) should immediately lose access to the document.",
                  "Given I am viewing a document shared with me, when I don't have edit permissions, then I should not see edit options.",
                  "Given I am viewing a shared document, when another user with access is also viewing it, then I should see a notification indicating simultaneous viewing."
                ]
              }
            ],
            flowchart: `
              graph TD
                A[User] -->|Navigates To| B[Documents Page]
                B -->|Clicks Upload| C[File Selector]
                C -->|Selects File| D{File Validation}
                D -->|Valid| E[Upload Process]
                D -->|Invalid Type| F[Error: Unsupported Format]
                D -->|Too Large| G[Error: Size Limit]
                E -->|Scanning| H{Malware Scan}
                H -->|Clean| I[Processing Upload]
                H -->|Threat Detected| J[Block Upload]
                I -->|Complete| K[Upload Success]
                K --> L[Document List]
                L -->|Select Document| M[Document Actions]
                M -->|View/Preview| N[Document Viewer]
                M -->|Download| O[Download File]
                M -->|Rename| P[Rename Dialog]
                M -->|Delete| Q{Confirm Delete}
                Q -->|Yes| R[Delete Document]
                Q -->|No| M
                B -->|Create Folder| S[New Folder Dialog]
                S -->|Name Folder| T[Create Folder]
                L -->|Drag to Folder| U[Move Document]
                M -->|Share| V[Sharing Options]
                V -->|Share with Users| W[Set Permissions]
                V -->|Create Link| X[Set Link Options]
                X -->|Configure| Y[Generate Link]
                W --> Z[Send Invitations]
            `
          });
        } else if (hasMentionedPayment) {
          resolve({
            context: "As a user, I want a secure and convenient payment processing system that allows me to make payments for products or services using different payment methods and ensures my financial information is protected.",
            requirements: [
              {
                title: "Payment Methods Integration",
                description: "The system should support multiple payment methods including credit/debit cards, digital wallets, and bank transfers.",
                acceptanceCriteria: [
                  "Given I am on the checkout page, when I select a payment method, then I should see the appropriate payment form for that method.",
                  "Given I am making a payment, when I select credit/debit card, then I should see a PCI-compliant form to enter my card details.",
                  "Given I am making a payment, when I select a digital wallet (PayPal, Apple Pay, Google Pay), then I should be redirected to authenticate with that service.",
                  "Given I have previously used a payment method, when I return to make another payment, then I should see my saved payment methods (with masked details).",
                  "Given I am entering payment details, when I choose to save my payment method for future transactions, then it should be securely stored in compliance with regulations.",
                  "Given a specific payment method is temporarily unavailable, when I view the checkout page, then that method should be marked as unavailable with an explanation."
                ]
              },
              {
                title: "Payment Processing",
                description: "The system should securely process payments with proper validation, confirmation, and error handling.",
                acceptanceCriteria: [
                  "Given I have entered valid payment details, when I submit the payment, then the transaction should be processed securely.",
                  "Given I submit a payment, when the transaction is processing, then I should see a loading indicator and be prevented from submitting multiple times.",
                  "Given I have submitted a payment, when the payment is successful, then I should receive a confirmation message and receipt number.",
                  "Given I have submitted a payment, when the payment fails due to insufficient funds, then I should see a clear error message explaining the issue.",
                  "Given I have submitted a payment, when the payment fails due to technical issues, then I should see an appropriate error message and alternative payment options.",
                  "Given a payment is in progress, when I attempt to close the browser or navigate away, then I should see a warning about the unfinished transaction.",
                  "Given my card requires 3D Secure verification, when I submit payment, then I should be redirected to complete the additional authentication step."
                ]
              },
              {
                title: "Payment Security",
                description: "The system should implement robust security measures to protect payment information and prevent fraud.",
                acceptanceCriteria: [
                  "Given I am entering payment information, when the form is rendered, then all communication should be over HTTPS with proper encryption.",
                  "Given I am making a payment from an unusual location or device, when the system detects this, then additional verification should be required.",
                  "Given I enter incorrect payment details multiple times, when I attempt again, then the system should implement rate limiting to prevent brute force attacks.",
                  "Given I enter a card number, when displayed on screen or in emails, then it should be partially masked (e.g., **** **** **** 1234).",
                  "Given I make a payment, when the transaction is complete, then my full payment details should not be stored in the system.",
                  "Given a suspicious payment pattern is detected, when the transaction is initiated, then it should be flagged for review and potentially require additional verification."
                ]
              },
              {
                title: "Payment History and Receipts",
                description: "The system should provide a comprehensive payment history with receipts and invoices.",
                acceptanceCriteria: [
                  "Given I have made payments, when I navigate to my payment history, then I should see a list of all transactions with key details.",
                  "Given I am viewing my payment history, when I select a specific transaction, then I should see the complete details of that payment.",
                  "Given I have completed a payment, when I view the confirmation page, then I should have options to download a receipt or have it emailed to me.",
                  "Given I request a receipt, when it is generated, then it should include all legally required information including tax details.",
                  "Given I need documentation for my records, when I request it, then I should be able to generate statements for a selected time period.",
                  "Given I dispute a charge, when I initiate the dispute from my payment history, then the system should log the dispute and provide a reference number."
                ]
              },
              {
                title: "Recurring Payments and Subscriptions",
                description: "The system should support setting up and managing recurring payments and subscriptions.",
                acceptanceCriteria: [
                  "Given I want to set up a subscription, when I provide payment details, then I should receive clear information about the recurring billing schedule.",
                  "Given I have an active subscription, when the renewal date approaches, then I should receive a notification before being charged.",
                  "Given I want to cancel a subscription, when I navigate to my subscription settings, then I should be able to cancel with a clear explanation of what happens next.",
                  "Given I want to update my payment method for a subscription, when I change it, then all future recurring charges should use the new method.",
                  "Given a recurring payment fails, when the system attempts to charge me, then I should receive a notification with options to update my payment details.",
                  "Given I pause a subscription, when the paused period ends, then billing should resume automatically as originally scheduled."
                ]
              }
            ],
            flowchart: `
              graph TD
                A[User] -->|Checkout| B[Payment Method Selection]
                B -->|Credit Card| C[Card Entry Form]
                B -->|Digital Wallet| D[Wallet Auth]
                B -->|Bank Transfer| E[Bank Details]
                C -->|Enter Details| F{Validate Card}
                F -->|Valid| G[Process Payment]
                F -->|Invalid| H[Show Errors]
                H --> C
                D -->|Authenticate| G
                E -->|Enter Details| G
                G -->|Processing| I{Transaction Status}
                I -->|Success| J[Confirmation]
                I -->|3D Secure Needed| K[3D Secure Auth]
                K -->|Complete| I
                K -->|Fail/Cancel| L[Payment Failed]
                I -->|Declined| M{Reason}
                M -->|Insufficient Funds| N[Fund Error]
                M -->|Fraud Detection| O[Security Error]
                M -->|Technical Issue| P[System Error]
                J -->|Generate| Q[Receipt]
                J --> R[Record in History]
                R -->|View History| S[Transaction List]
                S -->|Select Transaction| T[Transaction Details]
                T -->|Download| U[Receipt PDF]
                T -->|Issue| V[Dispute Process]
                B -->|Subscription| W[Subscription Setup]
                W -->|Configure| X[Set Schedule]
                X -->|Confirm| Y[Active Subscription]
                Y -->|Renewal Time| Z[Automatic Payment]
                Z --> I
                Y -->|Update| AA[Edit Subscription]
                Y -->|Cancel| AB[End Subscription]
            `
          });
        } else {
          // Default comprehensive ticket
          resolve({
            context: "As a product manager, I want to manage the entire product development lifecycle from requirements to release through a comprehensive automation system that streamlines documentation, analysis, and task tracking.",
            requirements: [
              {
                title: "Business Requirements Document (BRD) Upload",
                description: "The system should allow product managers to upload and process BRDs in various formats to extract key information for planning and development.",
                acceptanceCriteria: [
                  "Given I am on the PM Automation dashboard, when I click on the document upload area, then I should be able to select and upload BRD files in various formats (PDF, DOCX, Excel, CSV).",
                  "Given I am uploading a BRD, when the file is uploading, then I should see a progress indicator showing the upload status.",
                  "Given I have uploaded a BRD, when the upload completes, then I should see a confirmation message with basic file details (name, size, type).",
                  "Given I upload an unsupported file type, when the system processes it, then I should see an error message clearly explaining the supported formats.",
                  "Given I have uploaded a large document, when the system is processing it, then I should see a loading indicator to show that analysis is in progress.",
                  "Given my connection is interrupted, when uploading a document, then the system should handle the error gracefully and allow me to retry the upload."
                ]
              },
              {
                title: "Document Parsing and Analysis",
                description: "The system should intelligently parse uploaded BRDs and allow interactive analysis through a conversation interface.",
                acceptanceCriteria: [
                  "Given I have uploaded a document, when I want to analyze specific sections, then I should be able to use a conversation interface to specify which rows or sections to extract.",
                  "Given I ask the system to 'Extract information from rows 1-15', when the system processes my request, then it should display the content from those specific rows in a readable format.",
                  "Given I ask follow-up questions about the extracted content, when I send my questions, then the system should maintain context and provide relevant answers based on the document content.",
                  "Given I ask about specific requirements in the document, when the system analyzes them, then it should be able to identify key elements like features, priorities, and deadlines.",
                  "Given I ask about relationships between different requirements, when the system responds, then it should identify dependencies and connections not explicitly stated.",
                  "Given the document contains ambiguous requirements, when I ask for clarification, then the system should highlight the ambiguity and suggest possible interpretations."
                ]
              },
              {
                title: "Jira Ticket Generation",
                description: "The system should automatically create comprehensive Jira tickets based on the analyzed BRD with proper structure and edge case consideration.",
                acceptanceCriteria: [
                  "Given I have uploaded and analyzed a BRD, when I click 'Generate Jira Ticket', then the system should create a ticket with context/user story, business requirements, and acceptance criteria.",
                  "Given the system generates a ticket, when I review it, then the context section should clearly articulate the user need in story format ('As a [user], I want to [action] so that [benefit]').",
                  "Given the system generates a ticket, when I review it, then the business requirements should be organized into logical sections with clear descriptions.",
                  "Given the system generates acceptance criteria, when I review them, then they should follow the Given/When/Then format for clarity and testability.",
                  "Given the system analyzes a requirement, when generating acceptance criteria, then it should include edge cases and exception scenarios not explicitly mentioned in the original BRD.",
                  "Given the system generates a ticket, when I review it, then it should include both happy path and unhappy path scenarios to ensure comprehensive test coverage.",
                  "Given the system generates multiple tickets, when they have dependencies, then the relationships should be identified and noted in the tickets."
                ]
              },
              {
                title: "Flow Chart Visualization",
                description: "The system should automatically generate visual flowcharts to represent the business processes and user journeys described in the requirements.",
                acceptanceCriteria: [
                  "Given a Jira ticket has been generated, when I view it, then I should see a visual flowchart representing the business process or user journey.",
                  "Given a flowchart is generated, when I view it, then it should use standard flowchart notation for clarity (decision points, processes, start/end points).",
                  "Given a flowchart represents a complex process, when I view it, then the visualization should be clear and not overly cluttered.",
                  "Given a process has multiple decision points, when a flowchart is generated, then all possible paths should be clearly represented including edge cases.",
                  "Given a flowchart is generated, when I need to share it, then I should be able to export it in common formats (PNG, SVG, PDF).",
                  "Given a flowchart is generated, when I want to modify it, then I should have options to customize or edit the visualization as needed."
                ]
              },
              {
                title: "Ticket Export and Integration",
                description: "The system should allow users to export generated tickets and integrate with existing project management systems.",
                acceptanceCriteria: [
                  "Given I have generated a Jira ticket, when I click 'Export', then I should have options to export in various formats (JIRA JSON, CSV, PDF).",
                  "Given I choose to export to Jira, when I provide my Jira credentials, then the ticket should be created directly in my Jira instance with all fields properly mapped.",
                  "Given I export multiple tickets, when they are created in Jira, then any dependencies should be maintained as links between tickets.",
                  "Given I have configured API integration with my project management system, when I generate tickets, then I should be able to push them automatically without manual export.",
                  "Given I want to track the origin of a ticket, when it's exported, then metadata about the source BRD should be included for reference.",
                  "Given I export a ticket with a flowchart, when it's created in Jira, then the flowchart should be attached or included in the ticket description."
                ]
              }
            ],
            flowchart: `
              graph TD
                A[PM] -->|Uploads| B[BRD Document]
                B -->|Processing| C{Valid Format?}
                C -->|Yes| D[Parse Document]
                C -->|No| E[Error Message]
                E --> A
                D -->|Enable| F[Conversation Interface]
                F -->|User Query| G[Extract Specific Rows]
                G -->|AI Analysis| H[Generate Insights]
                H -->|Display| I[Query Results]
                I --> F
                F -->|Further Analysis| J[Requirement Identification]
                J -->|AI Processing| K[Identify Dependencies]
                K -->|Request Ticket| L[Ticket Generation Process]
                L -->|Create| M[Context/User Story]
                L -->|Create| N[Business Requirements]
                L -->|Create| O[Acceptance Criteria]
                N -->|Include| P[Clearly Defined Sections]
                O -->|Format as| Q[Given/When/Then]
                Q -->|Include| R[Happy Path Scenarios]
                Q -->|Include| S[Unhappy Path Scenarios]
                Q -->|Include| T[Edge Cases]
                L -->|Generate| U[Flowchart Visualization]
                U -->|Show| V[Process Flows]
                U -->|Show| W[Decision Points]
                U -->|Show| X[Alternative Paths]
                M -->|Combine| Y[Complete Jira Ticket]
                N -->|Combine| Y
                O -->|Combine| Y
                U -->|Attach to| Y
                Y -->|Export Options| Z{Export Destination}
                Z -->|Jira| AA[Create in Jira]
                Z -->|CSV| AB[Download CSV]
                Z -->|PDF| AC[Download PDF]
                Z -->|JSON| AD[Download JSON]
                AA -->|Success| AE[Ticket Created]
            `
          });
        }
      }, 2000);
    });
  }
}; 
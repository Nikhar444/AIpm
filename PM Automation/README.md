# PM Automation Tool

A comprehensive product management automation tool that helps product managers create detailed Jira tickets and flowcharts from business requirement documents.

## Features

- **Document Upload**: Upload and analyze business requirement documents (PDF, DOCX, Excel, CSV)
- **Interactive Document Parsing**: Converse with the system to extract and analyze specific sections of documents
- **Jira Ticket Generation**: Automatically create well-structured Jira tickets with:
  - Context/User Story
  - Business Requirements
  - Acceptance Criteria in Given/When/Then format
  - Edge Case Analysis
- **Flow Chart Generation**: Create visual flowcharts to enhance ticket understanding

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Upload your business requirement document in the document section
2. Use the conversation interface to explore and analyze the document
3. Navigate to the Jira ticket section and let the system generate comprehensive tickets
4. View and export the automatically generated flowcharts

## Technologies Used

- Next.js
- React
- OpenAI API
- React Flow for flowcharts
- Document parsing libraries 
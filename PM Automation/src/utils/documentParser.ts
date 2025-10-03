import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// Parse CSV files
export const parseCSV = (content: string) => {
  try {
    const result = Papa.parse(content, {
      header: true,
      skipEmptyLines: true
    });
    return result.data;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw new Error('Failed to parse CSV file');
  }
};

// Parse Excel files
export const parseExcel = (arrayBuffer: ArrayBuffer) => {
  try {
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  } catch (error) {
    console.error('Error parsing Excel:', error);
    throw new Error('Failed to parse Excel file');
  }
};

// Extract specific rows from parsed data
export const extractRows = (data: any[], startRow: number, endRow: number) => {
  try {
    // Ensure row numbers are within bounds and convert from 1-indexed to 0-indexed
    const start = Math.max(0, startRow - 1);
    const end = Math.min(data.length, endRow);
    
    return data.slice(start, end);
  } catch (error) {
    console.error('Error extracting rows:', error);
    throw new Error('Failed to extract rows from document');
  }
};

// Format extracted data for display
export const formatExtractedData = (data: any[]) => {
  if (!data || data.length === 0) {
    return 'No data found in the specified rows.';
  }
  
  try {
    // For simple display, convert to JSON string with indentation
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error formatting data:', error);
    throw new Error('Failed to format extracted data');
  }
};

// Parse plain text files by splitting into lines
export const parsePlainText = (content: string) => {
  try {
    return content.split('\n').map((line, index) => ({
      lineNumber: index + 1,
      content: line
    }));
  } catch (error) {
    console.error('Error parsing text:', error);
    throw new Error('Failed to parse text file');
  }
};

// Main function to parse document based on type
export const parseDocument = async (file: File): Promise<any[]> => {
  try {
    const fileType = file.type;
    
    if (fileType.includes('csv') || file.name.endsWith('.csv')) {
      const text = await file.text();
      return parseCSV(text);
    } else if (fileType.includes('sheet') || fileType.includes('excel') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const arrayBuffer = await file.arrayBuffer();
      return parseExcel(arrayBuffer);
    } else if (fileType.includes('text/plain') || file.name.endsWith('.txt')) {
      const text = await file.text();
      return parsePlainText(text);
    } else {
      // For other file types, return simple content
      const text = await file.text();
      return [{ content: text }];
    }
  } catch (error) {
    console.error('Error parsing document:', error);
    throw new Error('Failed to parse document. Please check the file format.');
  }
}; 
# Ayurveda Beauty Website

A modern, responsive website for an Ayurvedic beauty product brand, featuring natural skincare products based on traditional Ayurvedic principles.

![Ayurveda Beauty Website Screenshot](images/website-screenshot.jpg)

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Multi-page Layout**: Home, Products, Dosha Quiz, About, and Contact pages
- **Interactive Dosha Quiz**: Helps users discover their Ayurvedic body type (dosha) and get personalized product recommendations
- **Product Filtering**: Filter products by dosha type and category
- **Modern UI**: Clean, earthy aesthetic with professional styling

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.x (for running a local server)
- Internet connection (for loading external resources like Font Awesome and Google Fonts)

## Dependencies

The website uses the following external resources:

- **Google Fonts**: 
  - Cormorant Garamond (for headings)
  - Nunito Sans (for body text)

- **Font Awesome 6.0.0-beta3**: For icons throughout the site

All dependencies are loaded via CDN links, so no package installation is required.

## File Structure

```
Ayurvedic Products/
├── index.html          # Home page
├── products.html       # Products catalog page
├── dosha-quiz.html     # Interactive Ayurvedic dosha quiz
├── about.html          # About the company page
├── contact.html        # Contact information page
├── css/                # CSS stylesheets
│   └── styles.css      # Main stylesheet 
├── js/                 # JavaScript files
│   ├── script.js       # Main JS functionality
│   └── quiz.js         # Quiz-specific functionality 
└── images/             # Website images
```

## Running Locally

Follow these steps to run the Ayurveda Beauty website on your local machine:

1. **Clone or download the repository**
   - Download the ZIP file and extract it, or use Git:
   ```
   git clone [repository URL]
   ```

2. **Navigate to the project directory**
   ```
   cd path/to/Ayurvedic\ Products
   ```

3. **Start a local server**
   
   Using Python 3:
   ```
   python -m http.server
   ```
   
   Or using Python 2:
   ```
   python -m SimpleHTTPServer
   ```

4. **Access the website**
   - Open your web browser and go to:
   ```
   http://localhost:8000
   ```

5. **Navigate the website**
   - You should see the home page loaded
   - Use the navigation menu to explore different sections of the website

## Troubleshooting

- **Missing styles or JavaScript functionality**: Make sure the server is running from the correct directory (`Ayurvedic Products`).
  
- **Images not loading**: Ensure all image files are placed in the `images` directory with the correct filenames referenced in HTML.

- **External resources not loading**: Check your internet connection, as Font Awesome icons and Google Fonts require an active connection.

## Browser Compatibility

This website is designed to work on all modern browsers. For the best experience, use the latest version of:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## Customization

To customize the content:
1. Edit the HTML files to change text and structure
2. Modify `css/styles.css` to alter the appearance
3. Update `js/script.js` and `js/quiz.js` to change functionality

## Deployment

When you're ready to deploy the website to production:
1. Upload all files to your web hosting service
2. Ensure you maintain the same directory structure
3. No build step is required as this is a static website

## License

[Include your license information here] 
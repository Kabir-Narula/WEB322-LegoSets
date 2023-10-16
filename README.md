# Lego Collection Web App

## Project Overview

The Lego Collection Web App is a dynamic web application built using Node.js, Express.js, HTML, CSS, and Tailwind CSS. It allows users to explore Lego sets, learn about different themes, and view detailed information about specific sets.

## Key Features and Contributions

### 1. Tailwind CSS Integration
- Installed and configured Tailwind CSS for consistent styling.
- Implemented responsive design elements for seamless user experience.

### 2. Custom HTML Pages
- Created custom HTML pages for different views:
  - **`home.html`**:
    - Implemented a responsive navbar with links to the landing page, about page, and theme dropdown.
    - Designed a hero section inviting users to explore the Lego collection with links to individual Lego sets.
  - **`about.html`**:
    - Followed the same layout as the home page.
    - Featured a hero section with information about me, including an image and a short blurb about my hobbies and interests.
  - **`404.html`**:
    - Designed a custom 404 error page with a relevant message or image to guide users back to the main content.

### 3. Dynamic Routes and Data Handling
- Updated the `server.js` file to handle dynamic routes and status codes.
- Configured routes for the home page ("/"), about page ("/about"), and individual Lego sets ("/lego/sets/:set_num").
- Implemented query parameter handling to filter Lego sets based on themes.
- Utilized the Lego dataset to dynamically generate content for different views.

## How to Run the Application

To run the Lego Collection Web App locally, follow these steps:
1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Start the server by running `node server.js`.
4. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to explore the Lego Collection Web App.

Feel free to reach out if you have any questions or suggestions. Happy exploring the Lego world!

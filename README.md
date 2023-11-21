# Lego Collection Web App

## Project Overview

The Lego Collection Web App is a dynamic web application built using Node.js, Express.js, HTML, CSS, Tailwind CSS, and Sequelize with PostgreSQL. It allows users to explore, manage, and interact with a collection of Lego sets. The application now includes database integration for better data management, creation, modification, and deletion of Lego sets.

## Key Features and Contributions

### 1. Tailwind CSS Integration
- Integrated and configured Tailwind CSS for consistent and visually appealing styling.
- Ensured responsive design elements for a seamless user experience across various devices.

### 2. Custom HTML Pages
- Developed custom HTML pages for different views:
  - **`home.html`**:
    - Responsive navbar with links to the landing page, about page, and theme dropdown.
    - Hero section encouraging users to explore the Lego collection with direct links to individual Lego sets.
  - **`about.html`**:
    - Maintained a consistent layout with the home page.
    - Featured a hero section with information about the creator, including an image and a brief description of hobbies and interests.
  - **`404.html`**:
    - Crafted a custom 404 error page with relevant messaging or imagery to guide users back to the main content seamlessly.

### 3. Dynamic Routes and Data Handling with Sequelize
- Refactored code to use Sequelize with PostgreSQL for efficient data management.
- Configured dynamic routes and HTTP status codes in the `server.js` file.
- Implemented query parameter handling to filter Lego sets based on themes.
- Utilized Sequelize to handle database operations, enabling the creation, modification, and deletion of Lego sets.

### 4. Database Integration
- Set up a PostgreSQL database on Neon.tech.
- Stored database connection information securely using the `.env` file.
- Configured Sequelize models for `Theme` and `Set` with appropriate column names and data types.
- Established associations between the `Set` and `Theme` models.

### 5. Adding Existing Sets and Bulk Insert
- Implemented logic to add existing Lego sets to the database using Sequelize's `bulkCreate` method.
- Executed bulk insertion of data from a provided code snippet, ensuring a seamless transition of existing data to the new database.

### 6. Editing and Deleting Sets
- Enabled users to edit existing Lego sets with a new view (`editSet.ejs`).
- Provided a form to update set details, populated with data from the database.
- Implemented functionality to delete existing sets, including UI integration.

### 7. Creating New Sets
- Implemented a new view (`addSet.ejs`) for users to add new Lego sets to the collection.
- Created a form with validation for set details, including theme selection.
- Ensured seamless integration with the database to add new sets.

## How to Run the Application

To run the Lego Collection Web App locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set up the PostgreSQL database on Neon.tech and record the connection information in the `.env` file.
4. Install Sequelize, pg, pg-hstore, and dotenv modules using `npm install sequelize pg pg-hstore dotenv`.
5. Start the server by running `node server.js`.
6. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to explore and manage the Lego Collection Web App.

Feel free to reach out if you have any questions or suggestions. Happy exploring the Lego world!

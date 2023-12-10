

# Lego Collection Web App

## Project Overview

The Lego Collection Web App is a dynamic web application built using Node.js, Express.js, HTML, CSS, Tailwind CSS, Sequelize with PostgreSQL, and user authentication functionalities. It allows users to explore, manage, and interact with a collection of Lego sets. The application now includes robust user authentication, allowing users to create accounts, log in, and manage their Lego collections securely.

## Key Features and Contributions

### 1. Tailwind CSS Integration
- Integrated and configured Tailwind CSS for consistent and visually appealing styling.
- Ensured responsive design elements for a seamless user experience across various devices.

### 2. Custom HTML Pages
- Developed custom HTML pages for different views, including the home page, about page, and theme-based Lego sets pages.
- Maintained a consistent layout and user-friendly interface.

### 3. Dynamic Routes and Data Handling with Sequelize
- Refactored code to use Sequelize with PostgreSQL for efficient data management.
- Configured dynamic routes and HTTP status codes.
- Implemented query parameter handling to filter Lego sets based on themes.
- Utilized Sequelize to handle database operations, enabling the creation, modification, and deletion of Lego sets.

### 4. Database Integration
- Set up a PostgreSQL database on Neon.tech.
- Stored database connection information securely using the `.env` file.
- Configured Sequelize models for `Theme` and `Set` with appropriate column names and data types.
- Established associations between the `Set` and `Theme` models.

### 5. User Authentication (New)
- Implemented user authentication features for secure access to the Lego Collection Web App.
- Users can now create accounts, log in, and log out for personalized interactions.
- Added user-specific views and permissions for editing and deleting sets.
- Ensured secure password storage and user login history tracking.

### 6. Adding, Editing, and Deleting Sets
- Enabled users to add new Lego sets to the collection.
- Implemented functionality to edit existing Lego sets, including UI integration.
- Provided users with the ability to delete existing sets.

## How to Run the Application

To run the Lego Collection Web App locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set up the PostgreSQL database on Neon.tech and record the connection information in the `.env` file.
4. Install Sequelize, pg, pg-hstore, and dotenv modules using `npm install sequelize pg pg-hstore dotenv`.
5. Start the server by running `node server.js`.
6. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to explore and manage the Lego Collection Web App.

Feel free to reach out if you have any questions or suggestions. Happy exploring the Lego world!

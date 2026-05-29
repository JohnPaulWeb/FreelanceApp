# Work Breakdown Structure

## Milestones

### Milestone 1: Project setup and configuration. 
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

Folder setup: 
Now, firstly create the folders for frontend and backend to write the respective code and install the essential libraries.
Client folders.
Server folders

Installation of required tools: 
1. Open the frontend folder to install necessary tools 
For frontend, we use: 
React
Bootstrap
Material UI 
Axios 
react-bootstrap

2. Open the backend folder to install necessary tools 
For backend, we use: 
Express Js
Node JS
MongoDB
Mongoose
Cors
Bcrypt

After the installation of all the libraries, the package.json files for the frontend looks like the one mentioned below.
After the installation of all the libraries, the package.json files for the backend looks like the one mentioned below.

### Milestone 2: Backend Development 
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

1. Project Setup:
Create a project directory and initialize it using npm init.
Install required dependencies like Express.js, Mongoose, body-parser, and cors.

2. Database Configuration:
Set up a MongoDB database (locally or using a cloud service like MongoDB Atlas).
Create collections for:
Users (storing user information, account type)
Projects (project details, budget, skills required)
Applications (freelancer proposals, rate, portfolio link)
Chat (communication history for each project)
Freelancer (extended user details with skills, experience, ratings)

3. Express.js Server:
Create an Express.js server to handle HTTP requests and API endpoints.
Configure body-parser to parse request bodies and cors for cross-origin requests.

4. API Routes:
Define separate route files for user management, project listing, application handling, chat functionality, and freelancer profiles.
Implement route handlers using Express.js to interact with the database:
User routes: registration, login, profile management.
Project routes: project creation, listing, details retrieval.
Application routes: submit proposals, view applications.
Chat routes: send and receive messages within projects.
Freelancer routes: view and update profiles, showcase skills.

5. Data Models:
Define Mongoose schemas for each data entity:
User schema
Project schema
Application schema
Chat schema
Freelancer schema (extends User schema with skills, experience)
Create Mongoose models to interact with the MongoDB database.
Implement CRUD operations for each model to manage data.

6. User Authentication:
Implement user authentication using JWT or session-based methods.
Create routes and middleware for user registration, login, and logout.
Use authentication middleware to protect routes requiring user authorization (e.g., applying for projects).

7. Project Management:
Allow clients to post projects with details and budget.
Enable freelancers to browse projects, search by skills, and submit proposals.
Implement a system for clients to review applications and choose freelancers.

8. Secure Communication & Collaboration:
Integrate a secure chat system within projects for communication between clients and freelancers.
Allow file attachments and feedback exchange to facilitate collaboration.

9. Admin Panel (Optional):
Implement an admin panel with functionalities like:
Managing users 
Monitoring project updates and applications
Accessing transaction history 

### Milestone 3: Database development
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

Set up a MongoDB database either locally or using a cloud-based MongoDB service like MongoDB Atlas.
Create a database and define the necessary collections for users, freelancer, projects, chats, and applications.
Connect the database to the server with the code provided below.

### Milestone 4: Frontend development 
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

1. Setting the Stage:
The SB Works frontend thrives on React.js. To get started, we'll:
Create the initial React application structure.
Install essential libraries for enhanced functionality.
Organize project files for a smooth development experience.
This solid foundation ensures an efficient workflow as we bring the SB Works interface to life.

2. Crafting the User Experience:
Next, we'll focus on the user interface (UI). This involves:
Designing reusable UI components like buttons, forms, and project cards.
Defining the layout and styling for a visually appealing and consistent interface.
Implementing navigation elements for intuitive movement between features.
These steps will create a user-friendly experience for both freelancers and clients.

3. Bridging the Gap:
The final stage connects the visual interface with the backend data. We'll:
Integrate the frontend with SB Works' API endpoints.
Implement data binding to ensure dynamic updates between user interactions and the displayed information.
This completes the frontend development, bringing the SB Works platform to life for users.

### Milestone 5: Project Implementation
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

Run the Complete Application and start backend and frontend servers:

Backend
cd Backend
npm start

Frontend
cd Frontend
npm run dev

Project Screenshots:
Finally, after finishing coding the projects we run the whole project to test it’s working process and look for bugs. Now, let’s have a final look at the working of our  Freelancing Application.


**FullStack To-Do List Web Application**



## Objective
Build a basic to-do list web application using React for the front-end and Node.js for a minimal back-end.



## Front-End Technologies Used
- React.js
- CSS Flexbox
- CSS Media Queries



## Back-End Technologies Used
- Node.js using Express.js Framework
- SQLite Database



**Front-End**
The front-end of the application is built using React.js. The main functionality of the to-do list is implemented in the `App.js` component, which includes the following features:
- Adding new tasks to the to-do list.
- Marking tasks as completed with checkboxes.
- Deleting tasks.
- Fetching tasks from the back-end.



**Back-End**
The back-end of the application is built using Node.js with the Express.js framework and uses an SQLite database to store task data. The server is initialized in the `server.js` file, and it includes the following CRUD operations for tasks:
- **CREATE**: Add a new task to the database.
- **RETRIEVE**: Fetch all tasks from the database.
- **UPDATE**: Update the completion status of a task.
- **DELETE**: Delete a task from the database.



**Database Setup**

**tasks Table Information**
| Column    | Type    | 
| --------- | ------- | 
| id        | TEXT    | 
| task      | TEXT    | 
| completed | INTEGER | 

- **id**: A unique identifier for each task, stored as text.
- **task**: The description of the task, stored as text.
- **completed**: A flag indicating whether the task is completed (1) or not completed (0), stored as an integer.

## Database Interaction
To manage the SQLite database used in this project, you can use the SQLite command-line tool. In the `server` directory, you'll find a prepopulated database file named `todos.db`. Below are some useful commands to interact with the database:

### Open SQLite Command-Line Tool
To open the SQLite command-line tool, navigate to the `server` directory and run the following command:
```bash
sqlite3 todos.db
```

**View Tables in the Database**
To view the list of tables in the database, use the following command within the SQLite command-line tool:
```sql
.tables
```

**Retrieve All Data in the "tasks" Table**
To retrieve all data from the tasks table, execute the following SQL query:
```sql
SELECT * FROM tasks;
```

**View Table Schema**
To view the schema of the tasks table, including the column details, use the following command:
```sql
PRAGMA table_info(tasks);
```

**Exit SQLite Command-Line Tool**
To exit from the SQLite command-line tool, simply enter the following command:
```sql
.exit
```



## How to Run the Application

Follow these steps to run the to-do list web application on your local machine:

### Step 1: Clone the Repository
First, clone the repository to your local machine in VS Code using Git:
```bash
git clone <repository_url>
```

**Step 2: Set Up the Back-End**
Open your terminal and navigate to the server directory using the following commands:
```bash
cd server
```
Next, install the back-end dependencies and start the application:
```bash
npm install
```
```bash
npm run dev
```

**Step 3: Set Up the Front-End**
In a new terminal window (you can split the terminal with Ctrl+Shift+5), navigate to the client directory:
```bash
cd client
```

Install the front-end dependencies:
```bash
npm install
```

Start the front-end server:
```bash
npm start
```



**Step 4: Access the Application**
Now, you can access the to-do list web application by opening a web browser and going to
http://localhost:3000/

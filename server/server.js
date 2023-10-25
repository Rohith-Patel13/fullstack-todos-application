const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require('cors');
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
const dbPath = path.join(__dirname, "todos.db");

let dbConnectionObject = null;
const initializeDBAndServer = async () => {
  try {
    dbConnectionObject = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(8383, () => {
      console.log("Server Running at http://localhost:8383/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();



// CRUD Operations

// CREATE 
app.post('/api/tasks', async (request, response) => {
  const { id,todo,completed } = request.body;

  const insertTaskQuery = `
    INSERT INTO tasks (id, task, completed)
    VALUES ('${id}', '${todo}', ${completed});
  `;

  await dbConnectionObject.run(insertTaskQuery);
  response.setHeader('Content-Type', 'application/json');
  /*
  The data array is converted to a JSON string 
  and sent as the response body. The response 
  will have a Content-Type header with a value 
  of application/json, indicating that the 
  response body contains JSON data.
  */


  response.send({id,todo,completed});
});


// Retrieve
app.get('/api/Alltasks', async (request, response) => {
  const getTasksQuery = 'SELECT * FROM tasks';
  const tasks = await dbConnectionObject.all(getTasksQuery);
  response.setHeader('Content-Type', 'application/json');
  const finalArray=tasks.map((eachObject)=>{
    return {
      id:eachObject.id,
      todo:eachObject.task,
      completed:eachObject.completed
    }
  })
  response.send(finalArray);
});


// UPDATE
app.put('/api/tasks/update/:id', async (request, response) => {
  const { id } = request.params;
  const { completed } = request.body;

  const updateTaskQuery = `UPDATE tasks SET completed = ${completed} WHERE id = '${id}';`;

  await dbConnectionObject.run(updateTaskQuery);
  response.setHeader('Content-Type', 'application/json'); // Ensure content type header is set
  
  response.send('Task updated successfully.');
});


// DELETE
app.delete('/api/tasks/delete/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTaskQuery = `
    DELETE FROM tasks
    WHERE id = '${id}';
  `;

  await dbConnectionObject.run(deleteTaskQuery);
  response.setHeader('Content-Type', 'application/json'); 
  
  response.send('Task deleted successfully.');
});
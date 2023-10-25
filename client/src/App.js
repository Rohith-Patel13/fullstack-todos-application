import  { Component } from 'react';
import {v4 as uuIdV4} from "uuid"

import "./App.css"
import MyTasks from './components/MyTasks';

class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputTaskValue:"",
      initialTasks:[]
    };
  }

  componentDidMount() {
    fetch('/api/Alltasks')
      .then((response) => response.json())
      .then((parsedData) => {
        // console.log(parsedData)
        this.setState({ initialTasks: parsedData });
      })
      .catch((error) => {
        console.error('Error while fetching data:', error);
      });
  }

  typingInputTriggered = (event)=>{
    this.setState({inputTaskValue: event.target.value})
  }

  AddBtnClicked = ()=>{
    const {inputTaskValue}=this.state
    if(inputTaskValue===""){
      alert("Add Some Tasks...")
    }
    else{
      const newTodoObject ={
        id:uuIdV4(),
        todo:inputTaskValue,
        completed: 0, // Initialize as task is not completed yet
      }
      this.setState((previousState)=>({
        initialTasks:[...previousState.initialTasks, newTodoObject],
        inputTaskValue:""
      }));

      console.log(newTodoObject)
      const options={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodoObject),
      }

      fetch('/api/tasks',options)
        .then((response) => response.json())
        .then((parsedData) => {
          return parsedData
        })
        .catch((error) => {
          console.error('Error while posting data:', error);
        });
    }
  }

  checkBoxAction =(idNum)=>{
    const {initialTasks}=this.state

    const updatedTasks=initialTasks.map((eachObject)=>{
      if(idNum===eachObject.id){
        let value=null
        if(eachObject.completed===0){
          value=1
        }
        else{
          value=0
        }
        return {...eachObject,completed: value}
      }
      return eachObject
    })

    this.setState({initialTasks:updatedTasks})
    const updatedTask = updatedTasks.find((task) => task.id === idNum);
    console.log(updatedTask)
    fetch(`/api/tasks/update/${idNum}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: updatedTask.completed }),
    })
      .then((response) => response)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error('Error while updating task:', error);
      });
  }

  deleteButtonTriggered =(idNumber)=>{
    const {initialTasks}=this.state
    const updatedTasksAfterDeleting=initialTasks.filter((eachObject)=>(
      eachObject.id!==idNumber
    ))

    this.setState({initialTasks:updatedTasksAfterDeleting})
    // Send a request to delete the task on the server
    fetch(`/api/tasks/delete/${idNumber}`, {
      method: 'DELETE',
    })
      .then((response) => response)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error('Error while deleting task:', error);
      });
  }

  render() {

    const {initialTasks,inputTaskValue}=this.state

    return (
      <div className='bg'>
        <h1 className='mainHeading'>Todo List</h1>
        <div className='tasksContainer'>
          <h1 className="create-task-heading">Create <span className="create-task-heading-subpart">Task</span></h1>
          <input type="text" placeholder='Enter tasks...' className='inputEnterStyle' value={inputTaskValue} onChange={this.typingInputTriggered} />
          <button className="add-todo-button" id="addbuttonId" onClick={this.AddBtnClicked}>Add</button>
          <h1 className="todo-items-heading">
            My <span className="todo-items-heading-subpart">Tasks</span>
          </h1>
          <ul className="todo-items-container">
            {
              initialTasks.map((eachObject)=>(
                <MyTasks eachObject={eachObject} checkBoxProp={this.checkBoxAction} deleteButtonClickedProp={this.deleteButtonTriggered} key={eachObject.id} />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
export default HomeComponent;

/*
// json() => parses the response as JSON


Below is the Example For fetch() method:

let data = {
  name: "Rahul",
  gender: "Male",
  email: "rahul@gmail.com",
  status: "Active"
};

let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer ACCESS-TOKEN"
  },
  body: JSON.stringify(data)
};

fetch("https://gorest.co.in/public-api/users", options)
  .then(function(response) {
    return response.json();
  })
  .then(function(parsedData) {
    console.log(parsedData);
  });

*/
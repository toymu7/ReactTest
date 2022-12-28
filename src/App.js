import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck, faPen, faTasksAlt, faTrashCan} from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  
  const [toDo, setToDo] = useState([
    {"id": 1, "title":"Task 1", "status": true},
    {"id": 2, "title":"Task 2", "status": false}
  ])

  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const addTask = () => {
    if(newTask){
      let num = toDo.length + 1;
      let newEntry = {id: num, title:newTask,status:false }
      setToDo([...toDo, newEntry])
      setNewTask("");
    }
  }

  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id);
    setToDo(newTasks);
  }

  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if( task.id === id){
        return ({...task, status: !task.status})
      }
      return task;
    })

    setToDo(newTask);
  }


  const cancelUpdate = () => {
    setUpdateData("");
  }

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id, 
      title: e.target.value,
      status: updateData.status ? true : false
    }

    setUpdateData(newEntry);
  }

  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData];
    
    setToDo(updateObject);
    setUpdateData("");
  }

  return (
    <div className="container App">
      <br /> <br />
      <h2>To Do list App</h2>
      <br /> <br />


      {
        // タスクの更新
      }

      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input className="form-control form-control-lg" 
                    value={updateData && updateData.title}
                    onChange={ (e) => changeTask(e)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success mr-20"
                      onClick={updateTask}>
                Update
              </button>
              <button className="btn btn-lg btn-warning"
                      onClick={cancelUpdate}>Cancel</button>
            </div>          
          </div>    
          <br />  
        </>
      ) : (
        <> 
        {/* タスクの追加 */}
          <div className="row">
            <div className="col">
              <input className="form-control form-control-lg" 
                    onChange={(e) => setNewTask(e.target.value) }
                    value={newTask}/>

            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success"
                      onClick={addTask}>
                Add Task
              </button>
            </div>          
          </div>    
          <br />  
        </>
         
      )}


      {
        // todoを表示する
      }

      {toDo && toDo.length ? "" : "No Tasks…"}

      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return(

            <React.Fragment key={task.id}>

              <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                      <span className="taskNumber">{index + 1}</span>
                      <span className="taskText">{task.title}</span>
                  </div>

                  <div className="iconsWrap">
                    <span className="Completed/NotCompleted"
                          onClick={(e) => markDone(task.id)}>
                      <FontAwesomeIcon icon={faCircleCheck}/>
                    </span>

                    {task.status ? null : (
                      <span className="Edit"
                            onClick={() => setUpdateData({
                              id: task.id, 
                              title:task.title, 
                              status: task.status ? true : false
                          })}>
                        <FontAwesomeIcon icon={faPen}/>
                      </span>
                    )}
                    <span className="Delete" 
                          onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan}/>
                    </span>
                  </div>
              </div>


            </React.Fragment>
          )
        })
      }


    </div>
  );
}

export default App;

const AddTaskForm = ({newTask, setNewTask, addTask}) => {
  return (
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
  )
}



export default AddTaskForm;
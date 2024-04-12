import React,{useState} from 'react'
import './TaskForm.css';
import Tag from "./Tag.jsx";

const TaskForm = ({setTasks}) => {
    const [taskData,setTaskData] = useState({
        task:"",
        status:"todo",
        tags:[]
    })

    const handleChange = (e) =>{
       const name = e.target.name;
       const value = e.target.value;
       setTaskData(prev => {
        return {...prev,[name]:value}
       })
    }
const selectTag = (tag) =>{
if(taskData.tags.some(item => item===tag)){
    const filterTags = taskData.tags.filter(item=>item!==tag)
    setTaskData(prev=>{
        return {...prev,tags:filterTags}
    })
}
else{
    setTaskData(prev=>{
        return {...prev,tags:[...prev.tags,tag]}
    })
}
}

const checkTag = (tag) =>{
    return taskData.tags.some(item => item===tag)
   }


    const handleSubmit = (e) =>{
        e.preventDefault();
           setTasks(prev=>{
            return[...prev,taskData]
           });
           setTaskData({
            task:"",
            status:"todo",
            tags:[]
           })
    }
 
  return (
    <header className="app_header" >
    <form onSubmit={handleSubmit}>
        <input value={taskData.task}  name="task" type="text" className="task_input" placeholder="Enter your task" onChange={handleChange}/>
        <div className='task-form-bottom-line'>
            <Tag tagName="HTML" selectTag={selectTag} selected={checkTag('HTML')}/>
             <Tag tagName="CSS3" selectTag={selectTag} selected={checkTag('CSS3')}/>
             <Tag tagName="Javascript"selectTag={selectTag} selected={checkTag('Javascript')}/>
             <Tag tagName="React"selectTag={selectTag} selected={checkTag('React')}/>
<div>
   <select value={taskData.status} name="status" className="task_status" onChange={handleChange}>
    <option value="todo">To Do</option>
    <option value="doing">Doing</option>
    <option value="done">Done</option>
   </select>
   <button type="submit" className="task_submit">+ Add Task</button>
   </div>
        </div>
    </form>
    </header>
  )
}

export default TaskForm;


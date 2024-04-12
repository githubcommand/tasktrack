import React from "react";
import Todo from "../assets/direct-hit.png";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
const TaskColumn = ({ icon, title, tasks, status, handleDelete }) => {
  return (
    <div>
      <section className="task_column">
        <h2 className="task_column_heading">
          <img className="task_column_icon" src={icon} />
          {title}
        </h2>
      </section>
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <TaskCard key={index} title={task.task} tags={task.tags} handleDelete={handleDelete} index={index}/>
          )
      )}
    </div>
  );
};

export default TaskColumn;

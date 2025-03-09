import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import "./style.css";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="task-tracker-container">
      <h1 className="title">Task Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
          placeholder="Enter a task..."
        />
        <button onClick={addTask} className="add-button">Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="task-item"
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={task.completed ? "completed-task" : ""}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-button">
              <FaTrash />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;

import React, { useState } from "react";
import "./App.css";
import { Trash2, Pencil, CheckCircle } from "lucide-react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Build API", completed: false },
    { id: 2, text: "Create Home Page Design", completed: false },
    { id: 3, text: "Dashboard Menu", completed: true },
    { id: 4, text: "Usability Testing With Marketing", completed: false },
  ]);
  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const editTask = (id) => {
    const currentTask = tasks.find((item) => item.id === id);
    const updatedText = prompt("Edit your task", currentTask.text);

    if (!updatedText || !updatedText.trim()) return;

    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, text: updatedText } : item
      )
    );
  };

  const doneCount = tasks.filter((item) => item.completed).length;
  const progressCount = tasks.length - doneCount;

  return (
    <div className="app">
      <div className="todo-container">
        <h1>
          MY TO DO <span>LIST</span>
        </h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your to do list"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <button onClick={addTask}>Save</button>
        </div>

        <div className="stats">
          <div className="stat-box">
            Todo Done : <span>{doneCount}</span>
          </div>

          <div className="stat-box">
            Todo On Progress : <span>{progressCount}</span>
          </div>
        </div>

        <div className="task-list">
          {tasks.map((item) => (
            <div
              key={item.id}
              className={`task-card ${item.completed ? "completed" : ""}`}
            >
              <p>{item.text}</p>

              <div className="actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  <Trash2 size={18} />
                </button>

                <button
                  className="edit-btn"
                  onClick={() => editTask(item.id)}
                >
                  <Pencil size={18} />
                </button>

                <button
                  className="done-btn"
                  onClick={() => toggleTask(item.id)}
                >
                  <CheckCircle size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
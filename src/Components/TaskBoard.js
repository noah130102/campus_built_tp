import React, { useState, useEffect } from "react";
import Head from "./Head";
import TaskForm from "./TaskForm";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [completeTask, setCompleteTask] = useState(0);

  const [completedTaskList, setCompletedTaskList] = useState(() => {
    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTaskList")) || [];
    return storedCompletedTasks;
  });

  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTaskIndices, setSelectedTaskIndices] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedCompletedTaskList =
      JSON.parse(localStorage.getItem("completedTaskList")) || [];
    setCompleteTask(storedCompletedTaskList.length);
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const handleCheckboxChange = (index) => {
    if (selectedTaskIndices.includes(index)) {
      setSelectedTaskIndices(selectedTaskIndices.filter((i) => i !== index));
    } else {
      setSelectedTaskIndices([...selectedTaskIndices, index]);
    }

    const completedTask = tasks[index];
    setCompletedTaskList([...completedTaskList, completedTask]);
  };

  const handleDeleteSelectedTasks = () => {
    if (selectedTaskIndices.length > 0) {
      const updatedTasks = tasks.filter(
        (_, index) => !selectedTaskIndices.includes(index)
      );
      setTasks(updatedTasks);
      setSelectedTaskIndices([]);

      localStorage.setItem(
        "completedTaskList",
        JSON.stringify(completedTaskList)
      );
    }
  };

  const handleOpenTaskForm = () => {
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  return (
    <div className="TaskBoardMain">
      <Head />

      <div className="TaskBoardMainInside">
        <div className="box" style={{ display: "flex", padding: 20 }}>
          <div className="head1">My Tasks</div>
          <div className="butt1"> ⋮ </div>
        </div>

        <div className="boxCage">
          <div className="addTaskButt2">
            <button
              className="addTaskButt"
              onClick={() => setShowTaskForm(true) && handleOpenTaskForm}
            >
              +
            </button>
          </div>
          <div className="label1">
            <label> Add a task</label>
          </div>
        </div>

        <div className="tasksList">
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTaskIndices.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {task}
                </label>
                <label className="pencil">✎</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="completedTasks">
          <button className="completed2" onClick={handleDeleteSelectedTasks}>
            Completed Tasks ({completeTask}){" "}
          </button>
          <ul className="task-list">
            {completedTaskList.map((task, index) => (
              <li key={index}>
                <label className="completedTaskLabel">{task}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showTaskForm && (
        <div>
          <div className="backdrop" onClick={handleCloseTaskForm}></div>
          <div className="modal">
            <TaskForm onAddTask={handleAddTask} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;

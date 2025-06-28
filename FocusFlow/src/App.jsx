import { useState, useEffect, useRef } from "react";
import Heading from "./components/Heading";
import Addtask from "./components/Addtask";
import Container from "./components/Container";
import TaskHistory from "./components/TaskHistory";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem("taskList");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskHistory, setTaskHistory] = useState(() => {
    const saved = localStorage.getItem("taskHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTask, setActiveTask] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const timeRef = useRef(0);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("taskHistory", JSON.stringify(taskHistory));
  }, [taskHistory]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      clearInterval(interval);
      if (!isOnBreak) {
        const timestamp = new Date().toLocaleTimeString();
        setTaskHistory([{ task: activeTask.task, timestamp }, ...taskHistory]);
        alert(`✅ Task "${activeTask.task}" is complete! Break time!`);
        setTimeLeft(300); // 5-minute break
        setIsOnBreak(true);
        setIsRunning(true);
      } else {
        alert("⏱️ Break over! Time to start your next task!");
        setActiveTask(null);
        setIsRunning(false);
        setIsOnBreak(false);
        setTimeLeft(0);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isOnBreak]);

  const handleInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const [task, minutes] = e.target.value.split("|").map((s) => s.trim());
      const duration = parseInt(minutes) * 60 || 1500;
      const newTask = { task, duration };
      setTaskList([...taskList, newTask]);
      e.target.value = "";
    }
  };

  const startTask = (taskObj) => {
    if (activeTask?.task === taskObj.task && timeLeft > 0) {
      setIsRunning(true);
      return;
    }
    setActiveTask(taskObj);
    setTimeLeft(taskObj.duration);
    setIsRunning(true);
    setIsOnBreak(false);
  };

  const pauseTask = () => {
    setIsRunning(false);
  };

  const cancelTask = () => {
    setIsRunning(false);
    setActiveTask(null);
    setTimeLeft(0);
  };

  const deleteTask = (taskName) => {
    const filtered = taskList.filter((t) => t.task !== taskName);
    setTaskList(filtered);
    if (activeTask?.task === taskName) {
      cancelTask();
    }
  };

  return (
    <>
      <Heading />
      <Container>
        <Addtask
          item={taskList}
          handleinput={handleInput}
          activeTask={activeTask}
          timeLeft={timeLeft}
          isRunning={isRunning}
          startTask={startTask}
          pauseTask={pauseTask}
          cancelTask={cancelTask}
          deleteTask={deleteTask}
        />
        <TaskHistory history={taskHistory} />
      </Container>
    </>
  );
}

export default App;

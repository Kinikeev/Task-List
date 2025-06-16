import { useEffect, useRef, useState } from "react";
import "./TaskList.css";
import Task from "./Task";

function TaskList() {
  const [tasks, setTasks] = useState([
    { text: "Task 1:", completed: false },
    { text: "Task 2:", completed: false },
    { text: "Task 3:", completed: false },
  ]);

  const newTaskRef = useRef(); // Создаем ссылку на <input>

  // Загрузка задач из localStorage

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    console.log("Загруженные задачи:", savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Сохранение задач в localStorage при любом изменении tasks:

  useEffect(() => {
    console.log("Сохраняем задачи:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // const handleClickAdd = () => {
  //   const value = newTaskRef.current.value; // Берем текст из поля input
  //   if (value === "") return alert("Введите номер задания! (Task Nr :)");
  //   const tasksCopy = [...tasks];
  //   tasksCopy.push(newTaskRef.current.value); // Добавляем в массив tasks
  //   setTasks(tasksCopy);
  //   newTaskRef.current.value = ""; // Очищаем поле
  // };

  const handleClickAdd = () => {
    const value = newTaskRef.current.value;
    if (value === "") return alert("Введите номер задания! (Task Nr :)");

    const newTask = { text: value, completed: false };
    setTasks([...tasks, newTask]);
    newTaskRef.current.value = "";
  };

  return (
    <div className="app">
      <h1>Task Manager App 📝</h1>
      <div className="add-task">
        <input
          className=""
          ref={newTaskRef}
          placeholder="Enter new task (Task Nr. :)"
        />
        <button className="add" onClick={handleClickAdd}>
          Add Task
        </button>
      </div>
      <div className="task-list">
        {tasks.map((e, i) => (
          // 1. функция (без информации о параметре)
          // handleClickDelete
          // 2. Результат вызова функции
          // handleClickDelete(i)
          // 3. Функция, которая при запуске запустит handleClickDelete(i)
          // () => handleClickDelete(i)
          <Task key={i} name={e} index={i} tasks={tasks} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
}
export default TaskList;

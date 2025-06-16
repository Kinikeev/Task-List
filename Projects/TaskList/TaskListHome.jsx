const root = ReactDOM.createRoot(document.getElementById("root"));

// Homework:
// Добавить функционал работы кнопки Delete и стилистику приложения

// Создаём компонент Task
const Task = ({ name, index, tasks, setTasks }) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const textRef = React.useRef(); // Создаем ссылку на <input>

  const handleClickSave = () => {
    const copyTasks = [...tasks];
    copyTasks[index] = textRef.current.value;
    setTasks(copyTasks);
    setIsEdit(false);
  };

  const handleClickDelete = () => {
    const confirmed = confirm("Вы уверены, что хотите удалить эту задачу?");
    if (confirmed) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  return (
    <div className="task">
      {isEdit ? (
        <>
          <textarea ref={textRef} defaultValue={name}></textarea>
          <br />
          <button onClick={handleClickSave}>Save 💾</button>
        </>
      ) : (
        <>
          <p>{name}</p>
          <button onClick={() => setIsEdit(true)}>Edit ✏️</button>
          <button onClick={handleClickDelete}>Delete 🗑️</button>
        </>
      )}
    </div>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = React.useState(["Task 1:", "Task 2:", "Task 3:"]);

  const newTaskRef = React.useRef(); // Создаем ссылку на <input>

  // Объясните подробно каждую строку пожалуйста

  // Загрузка задач из localStorage

  React.useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Сохранение задач в localStorage при любом изменении tasks:

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleClickAdd = () => {
    const value = newTaskRef.current.value; // Берем текст из поля input
    if (value === "") return alert("Введите номер задания! (Task Nr :)");
    const tasksCopy = [...tasks];
    tasksCopy.push(newTaskRef.current.value); // Добавляем в массив tasks
    setTasks(tasksCopy);
    newTaskRef.current.value = ""; // Очищаем поле
  };

  // const handleClickDelete = (index) => {
  //   const tasksCopy = [...tasks];
  //   tasksCopy.splice(index, 1);
  //   setTasks(tasksCopy);
  // }

  return (
    <div className="app">
      <h1>Task Manager App 📝</h1>
      <div className="add-task">
        <input ref={newTaskRef} placeholder="Enter new task" />
        <button onClick={handleClickAdd}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((e, i) => (
          <Task
            key={Math.random()}
            name={e}
            index={i}
            tasks={tasks}
            setTasks={setTasks}
            // delete={() => handleClickDelete(i)}
          />
        ))}
      </div>
    </div>
  );
};

root.render(
  <>
    <TaskList />
  </>
);

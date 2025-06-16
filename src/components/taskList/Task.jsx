import { useRef, useState } from "react";

const Task = ({ name, index, tasks, setTasks }) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [tasks, setTasks] = useState("tasks");

  const textRef = useRef(); // Создаем ссылку на <input>

  const handleClickSave = () => {
    const copyTasks = [...tasks];
    copyTasks[index].text = textRef.current.value;
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

  const toggleCompleted = () => {
    const copyTasks = [...tasks];
    copyTasks[index].completed = !copyTasks[index].completed;
    setTasks(copyTasks);
  };

  return (
    <div className={`task ${name.completed ? "completed" : ""}`}>
      {isEdit ? (
        <>
          <textarea ref={textRef} defaultValue={name.text}></textarea>
          <br />
          <button className="save" onClick={handleClickSave}>
            Save 💾
          </button>
        </>
      ) : (
        <>
          <div className="checkbox-container">
            <p>{name.text}</p>
            <div className="done">
              <input
                className="check-box"
                type="checkbox"
                checked={name.completed}
                onChange={toggleCompleted}
              />
              <label>Выполнено!</label>
            </div>
          </div>
          <div className="knopf">
            <button className="edit" onClick={() => setIsEdit(true)}>
              Edit ✏️
            </button>
            <button className="delete" onClick={handleClickDelete}>
              Delete 🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Task;

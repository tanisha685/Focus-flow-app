// Addtask.jsx
import styles from "./Addtask.module.css";
import Item from "./Item";

const Addtask = ({
  item,
  handleinput,
  activeTask,
  timeLeft,
  isRunning,
  startTask,
  pauseTask,
  cancelTask,
  deleteTask,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder="Enter task | duration (min)"
        className={styles.input}
        onKeyDown={handleinput}
      />
      <ol className="list-group list-group-numbered">
        {item.map((items, index) => (
          <Item
            key={index}
            taskObj={items}
            isActive={activeTask?.task === items.task}
            timeLeft={activeTask?.task === items.task ? timeLeft : null}
            isRunning={isRunning}
            onStart={() => startTask(items)}
            onPause={pauseTask}
            onCancel={cancelTask}
            onDelete={deleteTask}
          />
        ))}
      </ol>
    </>
  );
};

export default Addtask;

// Item.jsx
import styles from "./Item.module.css";

const Item = ({
  taskObj,
  isActive,
  timeLeft,
  isRunning,
  onStart,
  onPause,
  onCancel,
  onDelete,
}) => {
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        isActive ? styles.activeTask : ""
      }`}
    >
      <div className="d-flex flex-column">
        <strong>{taskObj.task}</strong>
        {isActive && (
          <span className={styles.timer}>{formatTime(timeLeft)}</span>
        )}
      </div>

      <div className="btn-group">
        {isActive ? (
          <>
            {isRunning ? (
              <button className="btn btn-outline-secondary" onClick={onPause}>
                Pause
              </button>
            ) : (
              <button className="btn btn-outline-success" onClick={onStart}>
                Resume
              </button>
            )}
            <button className="btn btn-outline-danger" onClick={onCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-outline-warning" onClick={onStart}>
            Start
          </button>
        )}
        <button
          className="btn btn-outline-dark"
          onClick={() => onDelete(taskObj.task)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Item;

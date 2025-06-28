// TaskHistory.jsx
import styles from "./TaskHistory.module.css";

const TaskHistory = ({ history }) => {
  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyHeading}>Task History</h2>
      {history.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        <ul className="list-group">
          {history.map((entry, index) => (
            <li key={index} className="list-group-item">
              <strong>{entry.task}</strong> — completed at {entry.timestamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskHistory;

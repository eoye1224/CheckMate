import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";  

// Analytics component displays task completion statistics and a celebration effect when all tasks are done
const Analytics = ({ tasks }) => {
  // Calculate the total number of tasks and the number of completed tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  // Calculate the percentage of completed tasks (avoiding division by zero)
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // State to track whether the celebration effect should be triggered
  const [celebrationTriggered, setCelebrationTriggered] = useState(false);

  // Effect hook to trigger the celebration when all tasks are completed
  useEffect(() => {
    if (percentage === 100) {
      setCelebrationTriggered(true); // Trigger the celebration if all tasks are completed
      // Reset the celebration effect after 5 seconds
      setTimeout(() => setCelebrationTriggered(false), 5000);
    }
  }, [percentage]); // The effect runs whenever the percentage changes

  return (
    <div className="analytics">
      {/* Conditionally render the confetti animation if all tasks are completed */}
      {celebrationTriggered && (
        <div className="celebration-container">
          {/* Confetti component to display celebration animation */}
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      <h3>Task Analytics</h3>
      {/* Display the total number of tasks and completed tasks */}
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <div className="progress-bar-container">
        <span className="progress-label">Completion Progress</span>
        <div className="progress-bar">
          {/* Display the progress bar, with dynamic width based on completion percentage */}
          <div
            style={{
              width: `${percentage}%`, 
              backgroundColor: "green", 
              height: "100%", 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

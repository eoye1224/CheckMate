import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";  // Using a confetti library for the celebration effect

const Analytics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const [celebrationTriggered, setCelebrationTriggered] = useState(false);

  useEffect(() => {
    if (percentage === 100) {
      setCelebrationTriggered(true); // Trigger the celebration when all tasks are completed
      setTimeout(() => setCelebrationTriggered(false), 5000); // Reset after 5 seconds
    }
  }, [percentage]);

  return (
    <div className="analytics">
      {celebrationTriggered && (
        <div className="celebration-container">
          {/* Confetti animation when all tasks are completed */}
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      <h3>Task Analytics</h3>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <div className="progress-bar-container">
        <span className="progress-label">Completion Progress</span>
        <div className="progress-bar">
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

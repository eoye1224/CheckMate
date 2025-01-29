// Function to toggle completion of a task
export const toggleTaskCompletion = (task) => {
    return { ...task, completed: !task.completed };
};
  
// Function to filter tasks by status (all, completed, pending)
export const filterTasks = (tasks, status) => {
    if (status === "completed") {
        return tasks.filter(task => task.completed);
    }
    if (status === "pending") {
      return tasks.filter(task => !task.completed);
    }
    return tasks; // "all"
};
  

  
export const setTaskPriority = (task, priority) => {
    return { ...task, priority: priority };
};
  
  
// Function to calculate the number of tasks completed (for analytics)
export const calculateTaskCompletion = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const percentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  
    return { totalTasks, completedTasks, percentage };
  };
  
  
// Function to format due date to a readable string
export const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
  
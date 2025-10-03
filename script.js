// ========================================
// DATA INITIALIZATION
// ========================================

// Load task list from localStorage or initialize empty array
const taskList = JSON.parse(localStorage.getItem('todoList')) || [];

// Initial render of task list
renderTaskList();


// ========================================
// CORE FUNCTIONS
// ========================================

/**
 * Add a new task to the task list
 * Validates input, adds task to array, clears inputs, and re-renders
 */
function addTask() {
    // Get input values
    let taskName = document.querySelector('.task-name-input').value.trim();
    let taskDate = document.querySelector('.task-date-input').value;
    
    // Validate task name is not empty
    if (!taskName) {
        return;
    }
    
    // Add new task object to task list
    taskList.push({ 
        taskName: taskName, 
        taskDate: taskDate,
        completed: false
    });
    
    // Clear input fields
    document.querySelector('.task-name-input').value = '';
    document.querySelector('.task-date-input').value = '';
    
    // Re-render the task list
    renderTaskList();
}


/**
 * Toggle the completion status of a task
 * @param {number} taskIndex - Index of the task in the taskList array
 */
function toggleComplete(taskIndex) {
    taskList[taskIndex].completed = !taskList[taskIndex].completed;
    renderTaskList();
}


/**
 * Render the complete task list to the DOM
 * Generates HTML for each task and updates localStorage
 */
function renderTaskList() {
    let tasksHTML = '';
    
    // Loop through each task and generate HTML
    for (let index = 0; index < taskList.length; index++) {
        const task = taskList[index];
        const taskName = task.taskName;
        const taskDate = task.taskDate;
        const isCompleted = task.completed || false;
        
        // Generate HTML for individual task row
        const taskHTML =
            `<div class="task-row">
                <div class="task-item ${isCompleted ? 'completed' : ''}">
                    <input 
                        type="checkbox" 
                        ${isCompleted ? 'checked' : ''} 
                        onchange="toggleComplete(${index})"
                        style="margin-right: 8px; cursor: pointer;">
                    ${taskName}
                </div> 
                <div class="task-item ${isCompleted ? 'completed' : ''}">${taskDate}</div> 
                <div>
                    <button 
                        onclick="taskList.splice(${index}, 1); renderTaskList();" 
                        class="delete-task-button">
                        Delete
                    </button>
                </div>
            </div>`;
        
        tasksHTML += taskHTML;
    }
    
    // Update the DOM with generated HTML
    document.querySelector('.tasks-list').innerHTML = tasksHTML;
    
    // Save updated task list to localStorage
    localStorage.setItem('todoList', JSON.stringify(taskList));
}

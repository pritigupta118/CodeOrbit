import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface compilerStateType {
  fullCode: {
    html: string,
    css: string,
    javascript: string
  },
  currentLanguage: "html" | "css" | "javascript"
}

const initialState: compilerStateType = {
  fullCode: {
    html: `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do App</title>
  <link rel="stylesheet" href="style.css"> <!-- Link to external CSS -->
</head>
<body>
  <h1>To-Do List</h1>
  <input type="text" id="todoInput" placeholder="Enter a new task">
  <button id="addButton">Add Task</button>
  <ul id="todoList"></ul>
  <script src="script.js"></script> <!-- Link to external JS -->
</body>
</html>
`,
    css: `/* CSS for styling */
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  text-align: center;
}

h1 {
  color: #333;
}

#todoInput {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#addButton {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

#addButton:hover {
  background-color: #218838;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f8f9fa;
  padding: 10px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.deleteButton {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.deleteButton:hover {
  background-color: #c82333;
}
`,
    javascript: `// JavaScript for To-Do App
const addButton = document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Add task function
addButton.addEventListener('click', function() {
  const task = todoInput.value.trim(); // Get input value
  if (task === '') {
    alert('Please enter a task.');
    return;
  }

  // Create new list item
  const listItem = document.createElement('li');
  listItem.textContent = task;

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('deleteButton');

  // Add delete functionality
  deleteButton.addEventListener('click', function() {
    todoList.removeChild(listItem); // Remove task
  });

  // Append delete button to list item
  listItem.appendChild(deleteButton);

  // Add list item to the to-do list
  todoList.appendChild(listItem);

  // Clear the input field
  todoInput.value = '';
});
`,
  },
  currentLanguage: "html"
}

const compilerSlice = createSlice({
  name: "compilerslice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action: PayloadAction<compilerStateType["currentLanguage"]>) => {
      state.currentLanguage = action.payload
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload
    },
    updateFullCode: (state, action: PayloadAction<compilerStateType["fullCode"]>) => {
      state.fullCode = action.payload
    }
  }
})

export const { updateCurrentLanguage, updateCodeValue, updateFullCode } = compilerSlice.actions
export default compilerSlice.reducer
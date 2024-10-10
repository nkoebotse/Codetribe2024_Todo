import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [list, setList] = useState([]); // Stores the list of tasks
  const [input, setInput] = useState({
    Task: '',
    priority: 'Low', // Default priority
  });
  const [isEditing, setIsEditing] = useState(null); // Tracks if we are editing a task
  const [searchQuery, setSearchQuery] = useState(''); // Stores the search query
  const [user, setUser] = useState(null); // Stores user data

  // Update task and priority state
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Add a new task or update an existing task
  const addOrUpdateTodo = () => {
    if (isEditing) {
      // If editing, update the task
      const updatedList = list.map((todo) =>
        todo.id === isEditing ? { ...todo, ...input } : todo
      );
      setList(updatedList);
      setIsEditing(null); // Reset editing mode
    } else {
      // If adding a new task, generate a random ID
      const newTodo = {
        id: Math.random(),
        ...input,
      };
      setList([...list, newTodo]);
    }
    setInput({ Task: '', priority: 'Low' }); // Reset input fields after adding/updating task
  };

  // Delete a task by ID
  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  // Edit an existing task by populating the input fields
  const editTodo = (todo) => {
    setInput(todo);
    setIsEditing(todo.id); // Set the edit mode to the current task ID
  };

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
    setUser(userData);
  }, []);

  // Get the color for the task row based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'white';
    }
  };

  // Filter the task list based on the search query
  const filteredList = list.filter((todo) =>
    todo.Task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1>Welcome {user ? user.email : 'User'}</h1>

      <div className="container2">
        <div className="todo-section">
          <h1>To-Do List Items</h1>

          {/* Add Task Section */}
          <input
            type="text"
            value={input.Task}
            name="Task"
            placeholder="Enter Task Description"
            onChange={handleInputChange}
          />
          <select
            name="priority"
            value={input.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button onClick={addOrUpdateTodo}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>

          {/* Search Functionality */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <table>
            <thead>
              <tr>
                <th>Task Description</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((todo) => (
                <tr
                  key={todo.id}
                  style={{ backgroundColor: getPriorityColor(todo.priority) }}
                >
                  <td>{todo.Task}</td>
                  <td>{todo.priority}</td>
                  <td>
                    <button onClick={() => editTodo(todo)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>&times; Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todo;

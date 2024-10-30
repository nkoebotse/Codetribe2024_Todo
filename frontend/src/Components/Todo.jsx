import  { useEffect, useState } from 'react';
import axios from 'axios';


const Todo = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState({ task: '', priority: 'Low' });
  const [isEditing, setIsEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/api/todos');
    setList(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const addOrUpdateTodo = async () => {
    if (!input.task.trim()) {
      alert('Task description cannot be empty.');
      return;
    }

    if (isEditing) {
      await axios.put(`http://localhost:5000/api/todos/${isEditing}`, input);
      setIsEditing(null);
    } else {
      await axios.post('http://localhost:5000/api/todos', input);
    }

    setInput({ task: '', priority: 'Low' });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const editTodo = (todo) => {
    setInput(todo);
    setIsEditing(todo.id);
  };

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

  const filteredList = list.filter(todo => 
    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          name="task"
          value={input.task}
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

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((todo) => (
            <tr key={todo.id} style={{ backgroundColor: getPriorityColor(todo.priority) }}>
              <td>{todo.task}</td>
              <td>{todo.priority}</td>
              <td>
                <button onClick={() => editTodo(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;

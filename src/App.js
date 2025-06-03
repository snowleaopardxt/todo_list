import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edit
  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h1>Todo List</h1>
        
        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button type="submit" className="add-button">Add Task</button>
        </form>

        {/* Todo List */}
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              {editingId === todo.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                  />
                  <div className="edit-buttons">
                    <button onClick={() => saveEdit(todo.id)} className="save-button">Save</button>
                    <button onClick={() => setEditingId(null)} className="cancel-button">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.text}</span>
                  </div>
                  <div className="todo-actions">
                    <button onClick={() => startEditing(todo.id, todo.text)} className="edit-button">Edit</button>
                    <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App; 
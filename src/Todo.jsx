import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const toEdit = todos.find((todo) => todo.id === id);
    setInputValue(toEdit.text);
    setEditId(id);
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: inputValue } : todo
      )
    );
    setInputValue('');
    setEditId(null);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTodos([]);
    }
  };

  return (
    <div className="todo-container">
      <h2>📝 My Todo List</h2>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {editId ? (
          <button className="update-btn" onClick={updateTodo}>Update</button>
        ) : (
          <button onClick={addTodo}>Add</button>
        )}
      </div>

      {todos.length > 0 && (
        <div className="todo-header">
          <p>You have {todos.length} task(s)</p>
          <button className="clear-btn" onClick={clearAll}>Clear All</button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <div className="btn-group">
              <button onClick={() => deleteTodo(todo.id)}>❌</button>
              <button onClick={() => editTodo(todo.id)}>✏️</button>
              <button onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? '↩️' : '✅'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

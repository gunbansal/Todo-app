import React, { useState } from 'react'
import './Todo.css';
const Todo = () => {
    const [todos,setTodos]=useState([]);
    const [inputValue,setInputValue]=useState('');
    const [editMode,setEditMode]=useState(false);
    const [editId,setEditId]=useState(null);
    const [editValue,setEditValue]=useState('');

    const addTodo=()=>{
        if(inputValue.trim()!== ''){
            const newTodo={
                id:new Date().getTime(),
                text: inputValue,
            }
            setTodos([...todos,newTodo]);
            setInputValue('');
        }
    }
    const deleteTodo=(id)=>{
        const updateTodos=todos.filter((todo)=>todo.id!==id);
        setTodos(updateTodos);
    }
    const editTodo=(id,text)=>{
      setEditMode(true);
      setEditId(id);
      setEditValue(text);
    }

    const updateTodo=()=>{
        const updatedTodos=todos.map((todo)=>{
            if(todo.id===editId){
                return{...todo,text:editValue};
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditId(null);
        setEditMode(false);
        setEditValue('');
    }
  return (
    <div className='todo-container'>
      <h2>TODO List</h2>
      <input type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}></input>

      {
        editMode ? (
           <div>
           <input type='text' value={editValue} onChange={(e)=>setEditValue(e.target.value)}></input>
           <button onClick={updateTodo}>Update</button>
           </div>
        ):(
            <button onClick={addTodo}>Add</button>
        )
      }
      <ul>
        {todos.map((todo)=>(
            <li key={todo.id}>
                {todo.text}
                <div>
                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                <button onClick={()=>editTodo(todo.id,todo.text)}>Edit</button>
                </div>
                </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo

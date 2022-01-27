import { useState, useEffect } from 'react';
import TodoItem from './TodoItem.js'
import AddTodoForm from './AddTodoForm.js'
import EditForm from './EditForm.js'
import './App.css';

const App = () => {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value })
    console.log("Current Todo ", currentTodo);
  }

  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos));

  }, [todos])

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {

    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          check: false
        }
      ])
    }

    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(removeItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo })
  }

  function handleUpdateTodo(id, updatedTodo) {

    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);
    setTodos(updatedItem);

  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function checkBox(id){
    const checkit = todos.map((todo) => {
      if(todo.id === id){
        return {
          ...todo,
          check: !todo.check
        };
      }
      return todo;
    })
    setTodos(checkit);
  }

  return (
    <div className="App">
      <h1>TodoList</h1>

      {isEditing ? (
        <EditForm 
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditFormSubmit}
        />
      ) : (
        <AddTodoForm 
          todo={todo}
          onAddFormSubmit={handleFormSubmit}
          onAddInputChange={handleInputChange}
        />
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem 
            todo={todo}
            checkBox={checkBox}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
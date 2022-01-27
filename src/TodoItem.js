import React from 'react'

const TodoItem = ({ todo, onEditClick, onDeleteClick, checkBox }) => {
    return (
        <li key={todo.id}>
            <input type="checkbox" checked={todo.check} onClick={() => checkBox(todo.id) }/>
            <span style={{
                textDecoration: todo.check ? "line-through" : null
            }}>{todo.text}</span>
            {" "}
            <button onClick={() => onEditClick(todo)}>Edit</button>
            <button onClick={() => onDeleteClick(todo.id)}>X</button>
        </li>
    )
}

export default TodoItem
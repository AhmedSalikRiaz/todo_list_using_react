import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuid } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.tasks'

function App() {
    const [todos, setTasks] = useState([]);
    const taskName = useRef();

    //for storing the tasks
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTasks) setTasks(storedTasks)
    }, [])

    //for getting the tasks
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTask(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTasks(newTodos)
    }

    function handleAdd () {
        const name = taskName.current.value
        if(name === '') return

        setTasks( prevTodos => {
            return [...prevTodos, {id: uuid(), name: name, complete: false} ]
        } )

        taskName.current.value = null
    }

    function handleClear() {
        const newTasks = todos.filter(todo => !todo.complete)
        setTasks(newTasks)
    }

    return (
        <div className='m-3'>
            
            <TodoList list={todos} toggleTask={toggleTask} />
            <input className='m-2 border border-info rounded' ref={taskName} type = "text" ></input>
            <br></br>
            <button className='m-2 btn btn-info btn-sm' onClick={handleAdd} >Add Todo</button>
            <button className='m-2 btn btn-danger btn-sm' onClick={handleClear}>Clear Completed Tasks</button>
            <div className='m-2 text-warning'>{todos.filter(todo => !todo.complete).length} tasks left to do</div>

        </div>

    );
}

export default App;
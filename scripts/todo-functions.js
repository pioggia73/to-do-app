'use strict'

// READ EXISTING DATA FROM LOCAL STORAGE

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []

        // if (todosJSON !== null) {
        //     return JSON.parse(todosJSON)
        // } else {
        //     return []
        // }
    } catch (e) {
        return []
    }  
};

// SAVE THE TODOS TO LOCAL STORAGE 

const saveTodos = (todos) => {
     localStorage.setItem('todos', JSON.stringify(todos))
};

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//TOGGLE A COMPLETED VALUE FOR A COMPLETED TODO
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if(todo) {
        todo.completed = !todo.completed
    }
}

// RENDER TODOS APPLICATION

const renderTodos = (todos, filters) =>  {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter( (todo) => {

        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch

        // return !filters.hideCompleted || !todo.completed
        ////////////////////////////////////////////////
        // if(filters.hideCompleted) {
        //     return !todo.completed
        // } else {
        //     return true
        // }
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed )

    todoEl.innerHTML = ''

    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    //generateSummaryDOM(todos)

    if(filteredTodos.length > 0 ) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.textContent = 'No to-dos to show'
        messageEl.classList.add('empty-message')
        todoEl.appendChild(messageEl)
     
    } 
};

// GENERATE THE TODO DOM 

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // SET UP THE TODO CHECKBOX

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // SET UP THE TODO TEXT 

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // SET UP CONTAINER

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // SET UP THE REMOVE BUTTON

    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl 
};

// GENERATE SUMMARY DOM 

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`

    return summary
};
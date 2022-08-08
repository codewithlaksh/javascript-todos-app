// Get all the todos
const showTodos = () => {
    let output = "";
    let todos = localStorage.getItem('todos');
    let todosArr = [];
    if (todos == null){
        todos = [];
    }else{
        todosArr = JSON.parse(todos);
        Array.from(todosArr).forEach((element, index) => {
            output += `<tr>
                <td scope="row">${index+1}</td>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td>${element.timestamp}</td>
                <td><button class="deleteBtn btn btn-sm btn-danger" id="${index}">Delete</button></td>
            </tr>`;
        })
        document.getElementById("tbody").innerHTML = output;
    }
}
showTodos();

// Script to add a note
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTodo();
})

const addTodo = () => {
    let todos = localStorage.getItem('todos');
    let todosArr = [];

    let title = document.forms["todoForm"]["title"].value;
    let description = document.forms["todoForm"]["description"].value;
    let timestamp = new Date().toLocaleString();

    const formData = {
        title: title,
        description: description,
        timestamp: timestamp
    }
    if (todos == null){
        todosArr = [];
        todosArr.push(formData);
        localStorage.setItem("todos", JSON.stringify(todosArr));
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    }
    else{
        todosArr = JSON.parse(todos);
        todosArr.push(formData);
        localStorage.setItem("todos", JSON.stringify(todosArr));
    }
    showTodos();
}

// Script to delete a todo
let deleteBtns = document.getElementsByClassName('deleteBtn');
Array.from(deleteBtns).forEach(element => {
    element.addEventListener('click', e =>{
        if (confirm("Are you sure, you want to delete this todo ?")){
            let todos = localStorage.getItem('todos');
            let todosArr = [];
            if (todos == null){
                todosArr = [];
            }
            else {
                todosArr = JSON.parse(todos);
            }
            todosArr.splice(e.target.id, 1);
            localStorage.setItem('todos', JSON.stringify(todosArr));
            showTodos();
        }
    })
})
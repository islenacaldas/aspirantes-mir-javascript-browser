const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const deleteDoneButton = document.getElementById('delete-done-button');
const filterOption = document.getElementById('filter-todo');

// Funciones
function addTodo(event) {
  event.preventDefault();
  const todoTitle = todoInput.value.trim();
  if (todoTitle === '') {
    return;
  }
  const todo = {
    id: Date.now(),
    title: todoTitle,
    completed: false,
  };
  createTodoElement(todo);
  todoInput.value = '';
}

function createTodoElement(todo) {
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');
  if (todo.completed) {
    todoItem.classList.add('is-completed');
  }

  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.checked = todo.completed;
  todoCheckbox.id = `todo-${todo.id}`;
  todoCheckbox.addEventListener('change', function () {
    toggleTodoCompletion(todo);
  });

  const todoLabel = document.createElement('label');
  todoLabel.setAttribute('for', `todo-${todo.id}`);
  todoLabel.innerText = todo.title;

  const todoDeleteButton = document.createElement('button');
  todoDeleteButton.classList.add('delete-todo');
  todoDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDeleteButton.addEventListener('click', function () {
    deleteTodoItem(todoItem, todo);
  });

  todoItem.appendChild(todoCheckbox);
  todoItem.appendChild(todoLabel);
  todoItem.appendChild(todoDeleteButton);
  todoList.appendChild(todoItem);
}

function toggleTodoCompletion(todo) {
  todo.completed = !todo.completed;
  const todoItem = document.getElementById(`todo-${todo.id}`);
  todoItem.checked = todo.completed;
  if (todo.completed) {
    todoItem.parentElement.classList.add('is-completed');
  } else {
    todoItem.parentElement.classList.remove('is-completed');
  }
}

function deleteTodoItem(todoItem, todo) {
  todoList.removeChild(todoItem);
  todos = todos.filter((item) => item.id !== todo.id);
}

function deleteDoneTodos() {
  const completedTodos = todoList.querySelectorAll('.is-completed');
  completedTodos.forEach((completedTodo) => {
    const todoItem = completedTodo.parentElement;
    const todoId = Number(todoItem.querySelector('input[type="checkbox"]').id.split('-')[1]);
    const todo = todos.find((item) => item.id === todoId);
    todos = todos.filter((item) => item.id !== todoId);
    todoList.removeChild(todoItem);
  });
}

function filterTodos(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case 'completed':
        if (todo.classList.contains('is-completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('is-completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        todo.style.display = 'flex';
    }
  });
}

// Eventos
todoForm.addEventListener('submit', addTodo);
deleteDoneButton.addEventListener('click', deleteDoneTodos);
filterOption.addEventListener('change', filterTodos);

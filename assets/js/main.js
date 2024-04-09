function todoList() {
    const inputTask = document.querySelector('#input-task')
    const tasks = document.querySelector('#tasks');

    function saveTasks() {
        let spanTask = tasks.querySelectorAll('span')
        let taskList = [];

        for (let task of spanTask) {
            taskList.push(task.textContent)
        }

        let tasksJSON = JSON.stringify(taskList)
        localStorage.setItem('tasks', tasksJSON)
    }

    function insertTask(taskName) {
        let newLi = document.createElement('li')
        let newSpan = document.createElement('span')
        let deleteBtn = document.createElement('button')

        newSpan.innerText = taskName
        deleteBtn.innerText = "Apagar"
        deleteBtn.setAttribute('id', 'delete-task') 

        newLi.appendChild(newSpan)
        newLi.appendChild(deleteBtn)
        tasks.appendChild(newLi)
    }

    function recoverTasks() {
        let recover = localStorage.getItem('tasks');
        let recoverList = JSON.parse(recover)
        
        for (let task of recoverList) {
            insertTask(task);
        }
    }

    function addTask() {
        let newTask = inputTask.value.trim()
        if (newTask !== "") {
            insertTask(newTask);
            inputTask.value = ""
            inputTask.focus()
            saveTasks();
        }
    }

    function deleteTask(target) {
        target.parentElement.remove()
        saveTasks();
    }

    document.addEventListener('click', function(event) {
        let target = event.target;
        if (target.id === 'add-task') {
            addTask();
        }
        if (target.id === 'delete-task') {
            deleteTask(target);
        }
    });

    inputTask.addEventListener('keypress', function(event) {
        let keyCode = event.keyCode;
        // keyCode 13 = Enter
        if (keyCode === 13) {
            addTask();
        }
    });

    recoverTasks();
}
todoList();

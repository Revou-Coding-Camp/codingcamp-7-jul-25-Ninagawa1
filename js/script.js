console.log('Javascript is running!')

//kayak inisialisasi di java
let tasks = [];

//kayak method di java
function addTask(){
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');

    //Validasi input
    if(taskInput.value === '' || dueDateInput.value === ''){
        alert('Please fill all the information!');
    }
    else{
        //Mbuat object baru kayak di java biasa
        const newTask = {
            id: Date.now(),
            task: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };

        //Tambahin semua task ke array
        tasks.push(newTask);

        //Cek
        console.log('New task added', newTask);
        displayTask();
    }
    console.log('Adding task:', taskInput.value, 'Due date:', dueDateInput.value);
}

//<p> ${element.task} {Due: ${element.dueDate}} </p>
function displayTask(){
    const today = new Date().toISOString().split('T')[0];
    const displayInput = document.getElementById('task-list');
    displayInput.innerHTML = '';
    tasks.forEach(element => {
        const isOverdue = element.dueDate < today;
        const buttonLabel = element.completed ? 'Undo' : 'Done';
        const buttonColor = element.completed ? 'bg-blue-400' : 'bg-green-400';
        const taskItem = `
        <div class="flex justify-between items-center p-[8px] border-b border-black-500">
            <div class="flex flex-col">
                <span class="text-lg">${element.task}</span>
                <span class="text-sm text-gray-500">${element.dueDate}</span>
            </div>
                <button onclick="statusChange(${element.id})" 
                    class="${buttonColor} px-2 py-1 rounded text-white">
                    ${buttonLabel}
                </button>
            <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTaskOne('${element.id}')">Delete</button>
        </div>
        `;
        displayInput.innerHTML += taskItem;
    });
}

function deleteTask(){
    tasks = [];
    displayTask();
    console.log('All task deleted');
}

function deleteTaskOne(id){
    const taskIndex = tasks.find(task => task.id == id);
    console.log('Deleting task with ID: ', id);
    console.log('Task index found ')
    if(taskIndex !== -1){
        tasks.splice(taskIndex, 1);
        displayTask();
    }
}

function statusChange(id){
    const task = tasks.find(task => task.id === id);
    if(task){
        task.completed = !task.completed;
        console.log('Toggling completion for task with ID: ', id);
        displayTask();
    }
}

function filterTask(filterType){
    let filtered = [];
    if(filterType === 'completed'){
        filtered = tasks.filter(task => task.completed);
    }
    else {
        filtered = tasks;
    }
    displayFilteredTask(filtered);
}

function displayFilteredTask(taskArray) {
    const displayInput = document.getElementById('task-list');
    displayInput.innerHTML = '';
    taskArray.forEach(element => {
        const buttonLabel = element.completed ? 'Undo' : 'Done';
        const buttonColor = element.completed ? 'bg-blue-400' : 'bg-green-400';
        const taskItem = `
            <div class="flex justify-between items-center p-[8px] border-b border-black-500">
                <div class="flex flex-col">
                    <span class="text-lg">${element.task}</span>
                    <span class="text-sm text-gray-500">${element.dueDate}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="statusChange(${element.id})" 
                        class="${buttonColor} px-2 py-1 rounded text-white">
                        ${buttonLabel}
                    </button>
                    <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTaskOne('${element.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `;
        displayInput.innerHTML += taskItem;
    });
}
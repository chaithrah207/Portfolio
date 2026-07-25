let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){

const input=document.getElementById("taskInput");

if(input.value.trim()=="") return;

tasks.push({
text:input.value,
completed:false
});

input.value="";

saveTasks();
displayTasks();
}

function displayTasks(){

const list=document.getElementById("taskList");
list.innerHTML="";

tasks.forEach((task,index)=>{

if(currentFilter==="active" && task.completed) return;

if(currentFilter==="completed" && !task.completed) return;

const li=document.createElement("li");

if(task.completed)
li.classList.add("completed");

li.innerHTML=`
<span onclick="toggleTask(${index})">${task.text}</span>

<div>
<button onclick="editTask(${index})">Edit</button>

<button onclick="deleteTask(${index})">Delete</button>
</div>
`;

list.appendChild(li);

});

}

function toggleTask(index){
tasks[index].completed=!tasks[index].completed;
saveTasks();
displayTasks();
}

function editTask(index){

let newTask=prompt("Edit Task",tasks[index].text);

if(newTask!==null && newTask.trim()!=""){
tasks[index].text=newTask;
saveTasks();
displayTasks();
}

}

function deleteTask(index){
tasks.splice(index,1);
saveTasks();
displayTasks();
}

function filterTasks(type){
currentFilter=type;
displayTasks();
}

displayTasks();


const countText = document.getElementById("time")
const startBtn = document.getElementById("start")
const resetBtn = document.getElementById("reset")
const currentMode = document.getElementById("mode")
const numberOfCycles = document.getElementById("number_of_cycles")


let interval = null
let breakTime = 5 * 60
let mode = "work"
let timer = 25 *60
let n = 0

function updateTimer(){
    let minutes = Math.floor(timer / 60)
        let seconds = timer % 60
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds;

        countText.innerText = minutes + ":" + seconds
        
}

function startTimer(){
    if(interval !== null) return

     interval = setInterval(function(){

        if(timer <= 0){
            clearInterval(interval)
            interval = null

            if(mode == "work"){
                               n++
                numberOfCycles.innerText = "#" + n
                var snd = new Audio('/alarm.mp3')
                snd.play()
                mode = "break"
                timer = 5 *60
                countText.innerText = "5:00"
                currentMode.innerText = "Break"
                startTimer()
            }
            else if(mode =="break"){
                mode = "work"
                timer = 25 *60
                countText.innerText = "25:00"
                currentMode.innerText = "Work"
                startTimer()

            }
        return
    }
    timer--
    updateTimer()

    }, 1000)   
}

startBtn.addEventListener("click", startTimer)

resetBtn.addEventListener("click",()=>{
    clearInterval(interval)
    interval = null
    timer = 25 * 60
    countText.innerText = "25:00"
})


const taskInput = document.getElementById("task_input")
const addBtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks(){
    taskList.innerHTML = ""
    tasks.forEach((task, index)=>{
        const li = document.createElement("li");
        const textSpan = document.createElement("span")
        textSpan.textContent = task.text    

        const leftSide = document.createElement("div")


        if(task.completed){
            li.classList.add("completed")
        }


        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "X"
        deleteBtn.style.color = "red"
        li.style.display = "flex"
        li.style.justifyContent = "space-between"
        li.style.alignItems = "center"
        li.style.paddingTop = "10px"
        

        deleteBtn.addEventListener("click",(e)=>{
            e.stopPropagation()
            tasks.splice(index, 1)
            saveTasks()
            renderTasks()
        })

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.completed

        checkbox.addEventListener("change",(e)=>{
            e.stopPropagation()
            tasks[index].completed = checkbox.checked
            saveTasks()
            renderTasks()
            
        })
        
        leftSide.appendChild(checkbox)
        leftSide.appendChild(textSpan)
        li.appendChild(leftSide)
        li.appendChild(deleteBtn)
        taskList.appendChild(li)
    });
}

addBtn.addEventListener("click",()=>{
    const text = taskInput.value.trim();
    if(text == "") return
    tasks.push({text : text, completed:false});
    taskInput.value = ""
    saveTasks()
    renderTasks()
})
renderTasks()

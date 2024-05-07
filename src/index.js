import "./style.css";
import {findSelectedProject, removeProject, changeSelectedProject, isDeletedProject} from "./projects.js";
import createTodoList, {addTask, getTask, updateListDisplay, filterProject} from "./todoList.js";
import {displayAddTaskSection, removeAddTaskSection, getTaskDetails, setPriority} from "./display/task-add-display.js";
import { resetTodoContainer, displayCompleteTask} from "./display/task-display.js";
import {displayAddProject, removeAddProjectDisplay, getProjectName, displayNewProject,
displayDeleteProjectButton, hideDeleteProjectButton, getNewProjectName,
deleteProjectDisplay, displaySelectedProject} from "./display/project-display.js";
import {addProject} from "./projects.js";
import {viewTaskDetails, closeTaskDetails, editViewedTask, getViewedTask} from "./display/details.js";
//import {filterProject} from "./filter.js";

const addTaskBtn = document.querySelector(".add-task-btn");
addTaskBtn.addEventListener("click", () => {
    displayAddTaskSection("submit-task");

})

const submitTaskBtn = document.querySelector(".submit-task");
function handleSubmitTask(){
    if(submitTaskBtn.classList.contains("submit-edit-task")){
        return;
    }

    let [title, date, description, priority] = getTaskDetails();
    removeAddTaskSection();
    findSelectedProject().addTask(title, date, description, priority);
    displayTodos();
    
}
submitTaskBtn.addEventListener("click", handleSubmitTask);

function displayTodos(){
    resetTodoContainer();
    findSelectedProject().updateListDisplay();
    addTodoEventListeners();
}

const cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener(("click"), () => {
    removeAddTaskSection();
});

const addProjectButton = document.querySelector(".project-btn");
addProjectButton.addEventListener("click", () => {
    displayAddProject();
});

const submitProjectButton = document.querySelector(".add-project-section button:first-of-type");
submitProjectButton.addEventListener("click", () => {
    addProject(createTodoList(getNewProjectName()));
    displayNewProject(getNewProjectName());
    removeAddProjectDisplay();
    addProjectEventListeners();
});

const cancelProjectButton = document.querySelector(".add-project-section button:last-of-type");
cancelProjectButton.addEventListener("click", () => {
    removeAddProjectDisplay();
})



const priorityBtnsContainer = document.querySelector(".priority-btns");
const priorityBtns = priorityBtnsContainer.children;
for(let btn of priorityBtns){
    btn.addEventListener("click", () => {
        setPriority( btn);
    })
};

function addTodoEventListeners(){
    const todoNodes = document.querySelectorAll(".todo-item");
    for(let node of todoNodes){
        const checkBox = node.querySelector(".checkmark");
        checkBox.addEventListener("click", () => {
            displayCompleteTask(checkBox);
            console.log(node);
            //moveToCompleted()
            setTimeout(() => deleteTask(node), 500);
        })
        const detailsButton = node.querySelector(".task-view-btn");
        detailsButton.addEventListener("click", () => {
            console.log(node)
            viewTaskDetails(getTaskOfNode(node));
        });

    };
};

function addProjectEventListeners(){
    const projectList = document.querySelector(".projects-list");
    const customProjectNodes = projectList.querySelectorAll("li");
    const allProjectNodes = document.querySelectorAll(".projects-list li, .home");
    allProjectNodes.forEach((node) => {
        node.addEventListener("click", () => {
           
            if(isDeletedProject(getProjectName((node)))){
                changeSelectedProject("Home");
                const homeNode = document.querySelector(".home");
                displaySelectedProject(homeNode, allProjectNodes);
            }
            else {
                changeSelectedProject(getProjectName(node));
                displaySelectedProject(node, allProjectNodes);
            }
            resetFilters();
            displayTodos();

        })

        
    })

    customProjectNodes.forEach((node) => {
        node.addEventListener("mouseover", () => {
            displayDeleteProjectButton(node);
        });
        node.addEventListener("mouseout", () => {
            hideDeleteProjectButton(node);
        })
        
        const deleteProjectButton = node.querySelector("button");
        deleteProjectButton.addEventListener("click", () => {
            deleteProjectDisplay(node);
            removeProject(getProjectName(node));
        })
    });
}

function getTaskOfNode(node){
    let index = node.getAttribute("id");
    return findSelectedProject().getTask(index);
}

function deleteTask(node){
    let todo = getTaskOfNode(node);
    //maybe move to completed
    findSelectedProject().completeTask(todo);
    resetTodoContainer();
    findSelectedProject().updateListDisplay();
    addTodoEventListeners();
};

const exitDetailsButton = document.querySelector(".exit-details");
exitDetailsButton.addEventListener("click", () => {
    closeTaskDetails();
    addTodoEventListeners();
});

const editTaskButton = document.querySelector(".edit-task");
editTaskButton.addEventListener("click", () => {
    editViewedTask();
    refreshSubmitChangesButton();
    resetFilters();
    
})
function refreshSubmitChangesButton(){
    const submitChangesButton = document.querySelector(".submit-edit-task");

    function handleClickSubmitChanges(){
        let detailsArr = getTaskDetails();
        findSelectedProject().replaceTask(detailsArr,getViewedTask());
        removeAddTaskSection();
        displayTodos();
        submitChangesButton.removeEventListener("click", handleClickSubmitChanges);
        addTodoEventListeners();

    }
   
    submitChangesButton.addEventListener("click", handleClickSubmitChanges)
}

const filterDateSelect = document.querySelector("#filter-date");
filterDateSelect.addEventListener("change", () => {
    resetTodoContainer();
    applyFilters();
});

const filterPrioritySelect = document.querySelector("#filter-priority");
filterPrioritySelect.addEventListener("change", () => {
    resetTodoContainer();
    applyFilters();

});

function applyFilters(){
    findSelectedProject().filterProject("priority", filterPrioritySelect.value,
    "dateStatus", filterDateSelect.value);
}

function resetFilters(){
    filterDateSelect.value = ""
}




















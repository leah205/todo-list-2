
import { createTodoNode } from "./display/task-display.js";
import createTodoItem from "./todoItem.js";
import { addTaskToHome, completeTaskFromHome , replaceTaskFromHome} from "./home.js";


export default function createTodoList(project){
    let selected = false;
    //addProjecttoArr(project);
    let todoList = [];

    function updateListDisplay(){
        displayList(this.todoList);
    }

    function displayList(arr){
        arr.forEach((todo) => {
            createTodoNode(todo, arr.indexOf(todo));
        });
    }

    function replaceTask(arr, oldTask){
        let [title, date, description, priority] = arr;
        const newTask = createTodoItem(title, date, description, priority);
        this.todoList[this.todoList.indexOf(oldTask)] = newTask;
        if(!("isDefault" in this)){
            replaceTaskFromHome(arr, oldTask);
        }
        
      
    }

    function addTask(...args){
        //make sure no problem if add project named home(Error);
       if(!("isDefault" in this)){
            addTaskToHome(...args);
        }
        let todo = createTodoItem(...args);
        this.todoList.push(todo);
        
    };

    function filterProject(attribute, value){
        if(value === "All" || !value){
            displayList(this.todoList);
        }
        else{
            const filteredArr = this.todoList.filter((item) => {
            return item[attribute].includes(value) || item[attribute] === value;
        });
            displayList(filteredArr);
        
        };
        
        
    }

    function completeTask(todo){
        if(!("isDefault" in this)){
            completeTaskFromHome(todo);
        }
        this.todoList = this.todoList.filter((obj) => obj !== todo); 
       
    }
    function getTask(index){
        return this.todoList[index];
    }

    return {project, completeTask, addTask, todoList, selected, updateListDisplay, getTask, replaceTask, filterProject};
}


let projectsArr = [];

function addProject(project){
    projectsArr.push(project);
    //displayProjects(projectsArr);
};

function findSelectedProject(){
    for(let project of projectsArr){
        if(project.selected) return project;
    }
}
function changeSelectedProject(name){
    let newSelectedProject = projectsArr.find((obj) => obj.project == name);
    let oldSelectedProject = projectsArr.find((obj) => obj.selected == true);
    if(oldSelectedProject) oldSelectedProject.selected = false;
    newSelectedProject.selected = true;
}

function isDeletedProject(name){
    if(projectsArr.find((obj) => obj.project === name) == undefined){
        return true;
    }
}

function removeProject(name){
    projectsArr = projectsArr.filter((obj) => obj.project !== name);
    console.log(projectsArr);
    //displayProjects(projectsArr);
}

export {addProject, removeProject, findSelectedProject, changeSelectedProject, isDeletedProject};


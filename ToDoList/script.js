//- Un TODO est constitué de
//o Un titre
//o Un ensemble d’éléments à faire
//o Un ensemble d’élément déjà fait
//    - Pouvoir Ajouter / Supprimer des todos
//        - Pouvoir Ajouter / Valider / Invalider des éléments
//            - Garder en mémoire les TODOs via le localStorage

$(window).ready(executeAfterLoading);
$(window).on('unload', executeBeforeUnloading);

function executeAfterLoading() {

    $('body').css('background-color', '#DCDCDC');
    createANewTaskForm();
    createATaskValidationForm();
    createATaskUnvalidationForm();

    addANewTaskWhenSubmit();
    addDoneTasksWhenSubmit();
    addUndoneTasksWhenSubmit();

    retrieveAllTasks();
};

function executeBeforeUnloading() {
    //localStorage.clear();
    saveAllTasks();
}

//Nouvelle ligne avant ou après un élément

function newLineBefore(myElement) {
    ($('<br>')).insertBefore(myElement);
}

function newLineAfter(myElement) {
    ($('<br>')).insertAfter(myElement);
}

//Enlever une ligne avant ou après un élément

function removeLineBefore(myElement) {
    $(myElement).prev('br').remove();
}

function removeLineAfter(myElement) {
    $(myElement).next('br').remove();
}

//Créer un formulaire, une text box et un submit button pour ajouter une tâche

function createANewTaskForm() {
    let myForm = $('<form>');
    myForm.attr('method', 'post');
    myForm.attr('id', 'new_task_form');

    myForm.insertBefore($('#main_title'));
    createATextBox();
    createASubmitButton(myForm, "Ajouter une t\u00e2che");
}

function createATextBox() {
    let myTextBox = $('<input>');
    myTextBox.attr('type', 'text');
    myTextBox.attr('id', 'new_task');
    myTextBox.attr('name', 'task');
    myTextBox.attr('placeholder', 'Ma t\u00e2che');

    $('#new_task_form').append(myTextBox);
}

function createASubmitButton(myForm, myText) {
    let myButton = $('<button>');
    myButton.attr('type', 'submit');
    myButton.text(myText);
    myForm.append(myButton);
    return myButton;
}

//Créer un formulaire pour valider les tâches accomplies

function createATaskValidationForm() {
    let myForm = $('<form>');
    myForm.attr('method', 'post');
    myForm.attr('id', 'validate_task_form');
    $('#todo').append(myForm);
    let myButton = createASubmitButton(myForm, "Les t\u00e2ches coch\u00e9es sont accomplies");
    myButton.css({ 'background-color': '#90EE90', 'color': 'grey', 'padding': '5%', 'font-weight': 'bold' });
    newLineBefore(myButton);

    let myToDoTasks = $('<div>');
    myToDoTasks.attr('id', 'todo_container');
    myForm.prepend(myToDoTasks);
}

//Créer un formulaire pour défaire les tâches non accomplies

function createATaskUnvalidationForm() {
    let myForm = $('<form>');
    myForm.attr('method', 'post');
    myForm.attr('id', 'unvalidate_task_form');
    $('#done').append(myForm);
    let myButton = createASubmitButton(myForm, "Les t\u00e2ches coch\u00e9es ne sont pas accomplies");
    myButton.css({ 'background-color': '#E9383F', 'color': 'white', 'padding': '3%', 'font-weight': 'bold' });
    newLineBefore(myButton);

    let myDoneTasks = $('<div>');
    myDoneTasks.attr('id', 'done_container');
    myForm.prepend(myDoneTasks);
}

//Ajouter à la liste des tâches à faire en fonction de l'entrée utilisateur

function addANewTaskWhenSubmit() {
    function addANewTask(e) {
        e.preventDefault();

        let userInput = $('#new_task').val();
        let myLabel = $('<label>');
        myLabel.text(userInput);
        myLabel.attr('class', 'task_to_do');
        addGarbage(myLabel);

        let myCheckBox = $('<input>');
        myCheckBox.attr('type', 'checkbox');

        myLabel.prepend(myCheckBox);
        $('#todo_container').prepend(myLabel);
        newLineAfter(myLabel);
    }

    $('#new_task_form').submit(addANewTask);
}

//Ajouter à la liste des tâches faites en fonction des cases cochées quand le formulaire validate_task_form est validé (=do)

function addDoneTasksWhenSubmit() {
    function addADoneTask(myTask) {
        let myLabel = $('<label>');
        myLabel.text($(myTask).text());
        myLabel.attr('class', 'task_done');
        addGarbage(myLabel);

        let myCheckBox = $('<input>');
        myCheckBox.attr('type', 'checkbox');

        myLabel.prepend(myCheckBox);
        $('#done_container').prepend(myLabel);
        newLineAfter(myLabel);

        removeLineAfter(myTask);
        myTask.remove();
    }

    function selectAndAddAllDoneTasks(e) {
        e.preventDefault();

        let allTasksToDo = $(".task_to_do");

        for (let i = 0; i < allTasksToDo.length; i++) {
            let myLabel = allTasksToDo[i];
            let myCheckBox = myLabel.children[0];

            if ($(myCheckBox).is(':checked')) {
                addADoneTask(myLabel);
            }
        }
    }

    $('#validate_task_form').submit(selectAndAddAllDoneTasks);
}

//Ajouter à la liste des tâches à faire en fonction des cases cochées quand le formulaire unvalidate_task_form est validé (=undo)

function addUndoneTasksWhenSubmit() {
    function addAnUndoneTask(myTask) {
        let myLabel = $('<label>');
        myLabel.text($(myTask).text());
        myLabel.attr('class', 'task_to_do');
        addGarbage(myLabel);

        let myCheckBox = $('<input>');
        myCheckBox.attr('type', 'checkbox');

        myLabel.prepend(myCheckBox);
        $('#todo_container').prepend(myLabel);
        newLineAfter(myLabel);

        removeLineAfter(myTask);
        myTask.remove();
    }

    function selectAndAddAllUndoneTasks(e) {
        e.preventDefault();

        let allDoneTasks = $(".task_done");

        for (let i = 0; i < allDoneTasks.length; i++) {
            let myLabel = allDoneTasks[i];
            let myCheckBox = myLabel.children[0];

            console.log(myLabel);
            if ($(myCheckBox).is(':checked')) {
                addAnUndoneTask(myLabel);
            }
        }
    }

    $('#unvalidate_task_form').submit(selectAndAddAllUndoneTasks);
}

//Ajouter un logo poubelle à la fin d'un élément. Quand on clique dessus, ça supprime l'élément

function addGarbage(myElement) {
    let myGarbage = $('<i>');
    myGarbage.attr('class', 'far fa-trash-alt');
    myElement.append("&nbsp;&nbsp;");
    myElement.append(myGarbage);

    function destroy(e) {
        e.preventDefault();
        removeLineAfter(myElement);
        myElement.remove();
    }
    myGarbage.click(destroy);
}

// Sauvegarder et récupérer les tâches avec localStorage

function saveAllTasks() {
    let myTodoTasks = $('#todo_container').html();
    let myDoneTasks = $('#done_container').html();

    localStorage.setItem('tasks_to_do', myTodoTasks);
    localStorage.setItem('done_tasks', myDoneTasks);
}

function retrieveAllTasks() {
    let myTodoTasks = localStorage.getItem('tasks_to_do');
    let myDoneTasks = localStorage.getItem('done_tasks');
    $('#todo_container').html(myTodoTasks);
    $('#done_container').html(myDoneTasks);

    let trashes = $('label i');

    for (let i = 0; i < trashes.length; i++) {
        removeLabelWhenClickingOnATrash($(trashes[i]));
    }

    function removeLabelWhenClickingOnATrash(myTrash) {

        let myLabel = $(myTrash.parent());

        function destroy(e) {
            e.preventDefault();
            removeLineAfter(myLabel);
            myLabel.remove();
        }

        myTrash.click(destroy);
    }

}
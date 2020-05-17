//- Un TODO est constitu� de
//o Un titre
//o Un ensemble d��l�ments � faire
//o Un ensemble d��l�ment d�j� fait
//    - Pouvoir Ajouter / Supprimer des todos
//        - Pouvoir Ajouter / Valider / Invalider des �l�ments
//            - Garder en m�moire les TODOs via le localStorage

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

//Nouvelle ligne avant ou apr�s un �l�ment

function newLineBefore(myElement) {
    ($('<br>')).insertBefore(myElement);
}

function newLineAfter(myElement) {
    ($('<br>')).insertAfter(myElement);
}

//Enlever une ligne avant ou apr�s un �l�ment

function removeLineBefore(myElement) {
    $(myElement).prev('br').remove();
}

function removeLineAfter(myElement) {
    $(myElement).next('br').remove();
}

//Cr�er un formulaire, une text box et un submit button pour ajouter une t�che

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

//Cr�er un formulaire pour valider les t�ches accomplies

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

//Cr�er un formulaire pour d�faire les t�ches non accomplies

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

//Ajouter � la liste des t�ches � faire en fonction de l'entr�e utilisateur

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

//Ajouter � la liste des t�ches faites en fonction des cases coch�es quand le formulaire validate_task_form est valid� (=do)

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

//Ajouter � la liste des t�ches � faire en fonction des cases coch�es quand le formulaire unvalidate_task_form est valid� (=undo)

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

//Ajouter un logo poubelle � la fin d'un �l�ment. Quand on clique dessus, �a supprime l'�l�ment

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

// Sauvegarder et r�cup�rer les t�ches avec localStorage

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
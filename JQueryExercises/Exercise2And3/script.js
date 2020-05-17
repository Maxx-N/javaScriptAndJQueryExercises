$(window).ready(executeAfterLoading);

function executeAfterLoading() {
    //Exo 2
    createAFormTag();
    createATextBox();
    newLine();
    createATextBlock();
    newLine();
    createACheckBox();
    newLine();
    createASubmitButton()

    //Exo3
    createContainer()
    newDivOnFormSubmit()
    forceUpperCase()
};

// Nouvelle ligne

function newLine() {
    $('#myForm').append($('<br><br>'));
}

//Créez un formulaire HTML

function createAFormTag() {
    let myFormTag = $('<form>');
    myFormTag.attr('method', 'post');
    myFormTag.attr('id', 'myForm');
    $('body').append(myFormTag);
}

//o Une textbox

function createATextBox() {
    //Je crée mon label
    let myLabel = $('<label>');
    myLabel.text('Nom');
    myLabel.attr('for', 'user_name');

    //Je crée ma text box
    let myTextBox = $('<input>');
    myTextBox.attr('type', 'text');
    myTextBox.attr('id', 'user_name');
    myTextBox.attr('name', 'name');

    //J'ajoute les deux aux formulaire
    $('#myForm').append(myLabel);
    $('#myForm').append(myTextBox);
}

//o Un textblock

function createATextBlock() {
    let myLabel = $('<label>');
    myLabel.text('Description');
    myLabel.attr('for', 'user_description');

    let myTextBlock = $('<textarea>');
    myTextBlock.attr('id', 'user_description');
    myTextBlock.attr('rows', '5');
    myTextBlock.attr('cols', '33');
    myTextBlock.attr('name', 'description');

    $('#myForm').append(myLabel);
    $('#myForm').append(myTextBlock);
}

//o Une checkbox

function createACheckBox() {
    let myLabel = $('<label>');;
    myLabel.text("J'aime le vert");
    myLabel.attr('for', 'user_green');

    let myCheckBox = $('<input>')
    myCheckBox.attr('type', 'checkbox');
    myCheckBox.attr('id', 'user_green');
    myCheckBox.attr('name', 'green');

    $('#myForm').append(myLabel);
    $('#myForm').append(myCheckBox);
}

//o Un bouton submit

function createASubmitButton() {
    myButton = $('<button>');
    myButton.attr('type', 'submit');
    myButton.text("Valider");
    $('#myForm').append(myButton);
}

//Sur le submit du formulaire:

//o Ajouter un paragraphe dans un div externe au formulaire(on peut avoir plusieurs paragraphes)

function createContainer() {
    let myDiv = $('<div>');
    myDiv.attr('id', 'container');
    $('body').append(myDiv);
}

//o Le titre aura le contenu de la textbox
//o Le contenu aura le contenu de la textblock

function newDivOnFormSubmit() {
    //Je définis la fonction à appeler au déclenchement de l'évènement
    function createADiv(e) {
        e.preventDefault();

        let myDiv = $('<div>');
        if ($('#user_green').is(":checked"))
            greenBackground(myDiv);

        let myTitle = $('<h2>');
        myTitle.text($('#user_name').val());

        let myParagraph = $('<p>');
        myParagraph.text($('#user_description').val());

        myDiv.append(myTitle);
        myDiv.append(myParagraph);
        CreateAButtonToDeleteDiv(myDiv);
        $('#container').append(myDiv);
        appearingAnimation(myDiv);
    }

    //J'appelle la fonction au déclenchement de l'évènement
    $('#myForm').submit(createADiv);
}

//o Le paragraphe contiendra aussi un bouton permettant de supprimer ce paragraphe

function CreateAButtonToDeleteDiv(myDiv) {

    let myButton = $('<button>');
    myButton.text("Cachez ce paragraphe que je ne saurais voir ...");
    myDiv.append(myButton);

    let deleteDiv = (e) => {
        e.preventDefault();
        disappearingAnimation(myDiv);
    }

    myButton.click(deleteDiv);
}

//o Lors de l’ajout et de la suppression du paragraphe il doit y avoir une animation

//Ajout
function appearingAnimation(myDiv) {
    myDiv.hide().fadeIn(1500)
}

//Suppression
function disappearingAnimation(myDiv) {
    function remove() {
        myDiv.remove();
    }

    myDiv.animate(
        {
            opacity: '0',
            height: '0'
        },
        1000,
        remove
    )
}

//o Le paragraphe aura un fond vert si la checkbox est cochée

//Voir création de la div qui appelle cette fonction si la checkbox est cochée
function greenBackground(myDiv) {
    myDiv.css(
        {
            backgroundColor: "#55FF55"
        }
    )
}

//o Lors de l’écriture dans la textbox, forcer l’écriture en majuscule

function forceUpperCase() {
    $('#user_name').keyup(function (e) {
        e.preventDefault();
        $(this).val($(this).val().toUpperCase());
    })
}
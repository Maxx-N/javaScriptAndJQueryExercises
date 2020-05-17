$(window).ready(executeAfterLoading);

function executeAfterLoading() {
    createAFormTag();
    createATextBox();
    newLine();
    createASubmitButton();
    getNameAndGiveAge()
};

// Nouvelle ligne

function newLine() {
    $('#myForm').append($('<br><br>'));
}

//Faites rentrer un nom � l�utilisateur et donner lui son �ge

//Cr�ation du formulaire
function createAFormTag() {
    let myFormTag = $('<form>');
    myFormTag.attr('method', 'post');
    myFormTag.attr('id', 'myForm');
    $('body').append(myFormTag);
}

//Cr�ation de la text box
function createATextBox() {
    //Je cr�e mon label
    let myLabel = $('<label>');
    myLabel.text("Dis-moi comment tu t'appelles, je te dirai quel \u00e2ge tu as...");
    myLabel.attr('for', 'user_name');

    //Je cr�e ma text box
    let myTextBox = $('<input>');
    myTextBox.attr('type', 'text');
    myTextBox.attr('id', 'user_name');
    myTextBox.attr('name', 'name');
    myTextBox.attr('placeholder', 'Ton pr\u00e9nom');

    //J'ajoute les deux aux formulaire
    $('#myForm').append(myLabel);
    newLine();
    $('#myForm').append(myTextBox);
}

//Cr�ation du submit button
function createASubmitButton() {
    myButton = $('<button>');
    myButton.attr('type', 'submit');
    myButton.text("Valider");
    $('#myForm').append(myButton);
}

//Fonction pour avoir l'�ge selon le pr�nom 

function getAgeFromName(myName) {
    $.get("https://api.agify.io", { name: myName }, function (data) {
        let result = (`${data.name} ? Tu as ${data.age} ans !!!`);
        let myParagraph = $('<p>');
        myParagraph.text(result);
        $('body').append(myParagraph);
    });
}

//Fonction pour r�cup�rer l'�ge de l'utilisateur et lui afficher :

function giveAgeFromName(e) {
    e.preventDefault();
    getAgeFromName($('#user_name').val());
}

//Fonction pour appeler la pr�c�dente � la soumission du formulaire 

function getNameAndGiveAge() {
    $('#myForm').submit(giveAgeFromName);
}
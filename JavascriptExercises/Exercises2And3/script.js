window.addEventListener("load", executeAfterLoading);

function executeAfterLoading() {
    myForm = createAFormTag();
    createATextBox(myForm);
    newLine(myForm);
    newLine(myForm);
    createATextBlock(myForm);
    newLine(myForm);
    createACheckBox(myForm)
    newLine(myForm);
    newLine(myForm);
    newLine(myForm);
    createASubmitButton(myForm)

    createMagicDiv();
    newDivOnFormSubmit(myForm);

    forceUpperCaseWhenEnteringText();
};

//Créez un formulaire HTML

function createAFormTag() {
    let myFormTag = document.createElement("form");
    myFormTag.method = "post";
    document.body.appendChild(myFormTag);
    return document.getElementsByTagName("form")[0];
}


//o Une textbox

function createATextBox(form) {
    let myLabel = document.createElement("label");
    let myTextBox = document.createElement("input");
    myLabel.innerText = "Nom";
    myLabel.setAttribute("for", "user_name");
    myTextBox.type = "text";
    myTextBox.id = "user_name";
    myTextBox.name = "name";
    form.appendChild(myLabel);
    form.appendChild(myTextBox);
}

//o Un textblock

function createATextBlock(form) {
    let myLabel = document.createElement("label");
    let myTextBlock = document.createElement("textarea");
    myLabel.innerText = "Description";
    myLabel.setAttribute("for", "user_description");
    myTextBlock.id = "user_description";
    myTextBlock.rows = "5";
    myTextBlock.cols = "33";
    myTextBlock.name = "description";
    form.appendChild(myLabel);
    form.appendChild(myTextBlock);
}

//o Une checkbox

function createACheckBox(form) {
    let myParagraph = document.createElement("p");
    myParagraph.innerText = "Etes-vous gentil?";

    let myNiceLabel = document.createElement("label");
    myNiceLabel.innerText = "Oui je t'aime ! :-) xxx";
    myNiceLabel.setAttribute("for", "good_user");
    let myNiceCheckBox = document.createElement("input");
    myNiceCheckBox.type = "checkbox";
    myNiceCheckBox.id = "good_user";
    myNiceCheckBox.name = "kindness";

    let myNastyLabel = document.createElement("label");
    myNastyLabel.innerText = "NAN ESPECE DE SALE $^*-+&% !!!"
    myNastyLabel.setAttribute("for", "bad_user");
    let myNastyCheckBox = document.createElement("input");
    myNastyCheckBox.type = "checkbox";
    myNastyCheckBox.id = "bad_user";
    myNastyCheckBox.name = "kindness";

    form.appendChild(myParagraph)
    form.appendChild(myNiceCheckBox);
    form.appendChild(myNiceLabel);
    newLine(form);
    form.appendChild(myNastyCheckBox);
    form.appendChild(myNastyLabel);

}

//o Un bouton submit

function createASubmitButton(form) {
    myButton = document.createElement("button");
    myButton.type = "submit";
    myButton.innerText = "Valider";
    form.appendChild(myButton);
}

// Nouvelle ligne

function newLine(form) {
    form.appendChild(document.createElement("br"));
}

//Sur le submit du formulaire:

//o Ajouter un paragraphe dans un div externe au formulaire(on peut avoir plusieurs paragraphes)

function createMagicDiv() {
    let myDiv = document.createElement("div");
    document.body.appendChild(myDiv);
    myDiv.id = "magic_div";
}

//o Le titre aura le contenu de la textbox
//o Le contenu aura le contenu de la textblock

function newDivOnFormSubmit(form) {
    function createADiv(e) {
        e.preventDefault();
        let magicDiv = document.getElementById("magic_div");

        let myDiv = document.createElement("div");

        let goodChoice = document.getElementById("good_user");
        let badChoice = document.getElementById("bad_user");

        if (goodChoice.checked && badChoice.checked) {
            orangeBackground(myDiv);
        }
        else if (goodChoice.checked) {
            greenBackground(myDiv);
        }
        else if (badChoice.checked) {
            redBackground(myDiv);
        }

        let myTitle = document.createElement("h2");
        let myNameInput = document.getElementsByTagName("input")[0].value;
        myTitle.innerText = myNameInput;

        let myParagraph = document.createElement("p");
        let myDescriptionInput = document.getElementsByTagName("textarea")[0].value;
        myParagraph.innerText = myDescriptionInput;

        magicDiv.appendChild(myDiv);

        animationOnDivCreation(myDiv);

        myDiv.appendChild(myTitle);
        myDiv.appendChild(myParagraph);

        CreateAButtonToDeleteDiv(myDiv);

    }

    form.addEventListener("submit", createADiv);
}

//o Le paragraphe contiendra aussi un bouton permettant de supprimer ce paragraphe

function CreateAButtonToDeleteDiv(div) {

    let myButton = document.createElement("button");
    myButton.innerText = "Cachez ce paragraphe que je ne saurais voir ...";
    div.appendChild(myButton);

    let deleteDiv = (e) => {
        e.preventDefault();
        animationOnDivDeletion(div);
    }

    myButton.addEventListener("click", deleteDiv);
}

//o Lors de l’ajout et de la suppression du paragraphe il doit y avoir une animation

function animationOnDivCreation(div) {
    let currentWidth = 0, finalWidth = 100;
    let interval = setInterval(function () {
        if (currentWidth === finalWidth) {
            clearInterval(interval);
            return;
        }

        currentWidth = currentWidth + 1;
        div.style.width = currentWidth + '%';
    }, 20);
}

function animationOnDivDeletion(div) {
    div.animate([
        { width: '100%', opacity: '1'},
        { width: '0%', opacity: '0.5'}
    ], {
        duration: 1000
    });
    setTimeout(function () {
        div.remove();
    }, 1000);
}

//o Le paragraphe aura un fond vert si la checkbox est cochée

//Voir création de la div qui appelle cette fonction si la checkbox est cochée
function greenBackground(myDiv) {
    myDiv.setAttribute('style', 'background-color: #55FF55');
}

function redBackground(myDiv) {
    myDiv.setAttribute('style', 'background-color: #FF0000');
}

function orangeBackground(myDiv) {
    myDiv.setAttribute('style', 'background-color: orange');
}

//o Lors de l’écriture dans la textbox, forcer l’écriture en majuscule

function forceUpperCaseWhenEnteringText() {
    document.getElementById('user_name').addEventListener('keyup', forceUpperCase);

    function forceUpperCase(e) {
        e.preventDefault();
        this.value = this.value.toUpperCase();
    }
}

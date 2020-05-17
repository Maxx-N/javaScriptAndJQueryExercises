//Au chargement de la page :

window.addEventListener("load", executeAfterLoading);

function executeAfterLoading() {
    displayHelloWorld();
    changeSpan3WhenClickingOnButton();
    displayMultiplicationTable();
};

//Ecrire « Hello World » dans la console

function displayHelloWorld() {
    console.log("Hello World");
}

//Modifier le contenu d’un span qui est dans votre page lors d’un click sur un bouton présent dans votre page

function changeSpan3WhenClickingOnButton() {
    let selectSpan3 = () => {
        return document.getElementsByTagName("span")[2];
    }

    let changeInnerText = (element, newText) => {
        element.innerText = newText;
    }

    let changeSpan3InnerText = (e) => {
        e.preventDefault();

        let span3 = selectSpan3();

        switch (span3.innerText) {
            case "span3":
                changeInnerText(span3, "NOUVEAU SPAN 3");
                break;
            default:
                changeInnerText(span3, "span3");
                break;
        }  
    }

    let selectLastButton = () => {
        let allButtons = document.getElementsByTagName("button");
        return allButtons[allButtons.length - 1];
    }

    let buttonEventListener = () => {
        let myButton = selectLastButton();
        myButton.addEventListener("click", changeSpan3InnerText);
    }

    buttonEventListener();
}

//Afficher les tables de multiplications dans une table générée en JS

function displayMultiplicationTable() {
    let myTable = document.createElement("table");
    myTable.border = "1px";
    for (let i = 0; i < 10; i++) {
        let myRow = document.createElement("tr");
        for (let j = 0; j < 10; j++) {
            mySquare = document.createElement("td");
            mySquare.style = "text-align: center; padding: 5px";
            mySquare.innerText = `  ${j} x ${i} = ${i*j}  `;
            myRow.appendChild(mySquare);
        }
        myTable.appendChild(myRow);
    }
    let mySecondSubtitle = document.getElementsByTagName("h2")[1];
    mySecondSubtitle.appendChild(myTable);
}


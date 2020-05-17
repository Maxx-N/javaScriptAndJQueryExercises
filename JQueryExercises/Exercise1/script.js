//Au chargement de la page :

$(window).ready(executeAfterLoading);

function executeAfterLoading() {
    displayHelloWorld();
    modifySecondSpanOnClick();
    displayMultiplicationTable()
};

//Ecrire « Hello World » dans la console

function displayHelloWorld() {
    console.log("Hello World");
}

//Modifier le contenu d’un span qui est dans votre page lors d’un click sur un bouton présent dans votre page

function modifySecondSpanOnClick() {
    //J'attribue les id html
    $('span:nth-of-type(2)').attr('id', 'second_span');
    $('button:nth-of-type(1)').attr('id', 'first_button');

    //Je définis la fonction à appeler au déclenchement de l'évènement
    function modifySecondSpan(e) {
        e.preventDefault();

        switch ($('#second_span').text()) {
            case "span2":
                $('#second_span').text('Hello World');
                break;
            default:
                $('#second_span').text('span2');
                break;
        }
    }

    //J'appelle la fonction au déclenchement de l'évènement
    $('#first_button').click(modifySecondSpan);
}

//Afficher les tables de multiplications dans une table généré en JS

function displayMultiplicationTable() {
    let myTable = $('<table>');
    myTable.attr("border","1px");
    for (let i = 0; i < 10; i++) {
        let myRow = $('<tr>');
        for (let j = 0; j < 10; j++) {
            mySquare = $('<td>');
            mySquare.attr('style', 'text-align: center; padding: 5px');
            mySquare.text(`${j} x ${i} = ${i * j}`);
            myRow.append(mySquare);
        }
        myTable.append(myRow);
    }
    $('#multiplication').append(myTable);
}

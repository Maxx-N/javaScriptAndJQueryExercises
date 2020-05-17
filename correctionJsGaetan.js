function initJsIntro() {
    // Exo 1
    console.log("Hello World");

    // Exo 2
    document.getElementById('btnExo').addEventListener('click', function () {
        document.getElementById('spanExo').innerText = "Hello World";
    });

    // Exo 3
    // Récupération du container dans la vue
    var container = document.getElementById('containerTable');

    // Création de la table
    var table = document.createElement('table');

    for (var i = 1; i <= 10; i++) {
        var ligne = document.createElement('tr');

        for (var y = 1; y <= 10; y++) {
            var cases = document.createElement('td');
            cases.innerText = i * y;
            ligne.appendChild(cases);
        }

        table.appendChild(ligne);
    }

    // Ajout au container
    container.appendChild(table);
}

function initJsParagraphe() {
    // Abonnement de l'évènement keyup pour écraser la valeur à chaque lettre
    document.getElementById('txtTitre').addEventListener('keyup', function () {
        this.value = this.value.toUpperCase();
    });

    document.getElementById('btnBarrel').addEventListener('click', function () {

        var i = 0;
        setInterval(function () {
            console.log(i);
            i += 10;
            document.body.style.transform = 'rotate(' + i + 'deg)';
        }, 10);

        //document.body.animate([
        //    // keyframes
        //    { transform: 'rotate(0deg)' },
        //    { transform: 'rotate(360deg)' }
        //], {
        //    // timing options
        //    duration: 1000
        //    //iterations: Infinity
        //});
    });

    // Récupération de l'évènement submit
    document.getElementById('formParagraphe').addEventListener('submit', function (e) {
        var container = document.getElementById('containerParagraphe');

        var bloc = document.createElement('div');
        var titre = document.createElement('h1');
        var contenu = document.createElement('p');
        var bouton = document.createElement('input');

        titre.innerText = document.getElementById('txtTitre').value;
        contenu.innerText = document.getElementById('txtContenu').value;

        if (document.getElementById('cbEstVert').checked)
            contenu.style.backgroundColor = 'green';

        bouton.value = 'Supprimer le paragraphe';
        bouton.type = 'submit';

        bloc.appendChild(titre);
        bloc.appendChild(contenu);
        bloc.appendChild(bouton);

        container.appendChild(bloc);

        bloc.animate([
            // keyframes
            { opacity: 0 },
            { opacity: 1 }
        ], {
            // timing options
            duration: 500
        });

        bouton.addEventListener('click', function () {
            bloc.animate([
                // keyframes
                { opacity: 1 },
                { opacity: 0 }
            ], {
                // timing options
                duration: 500
            });

            setTimeout(function () {
                bloc.remove();
            }, 500);
        });

        e.preventDefault();
    });
}

function initJsAjax() {
    document.getElementById('formAjax').addEventListener('submit', function (e) {
        var xhttp = new XMLHttpRequest();

        // Ajout du name en paramètre du GET
        xhttp.open('GET', 'https://api.agify.io/?name=' + document.getElementById('txtPrenom').value, true);

        xhttp.addEventListener("load", function () {
            var container = document.getElementById('containerAjax');

            console.log(xhttp.response);

            // Parse du json récupéré
            container.innerText = JSON.parse(xhttp.response).age;
        });

        xhttp.send();

        e.preventDefault();
    });
}
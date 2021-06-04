//TODO: PANIER Récupération LocalStorage
let data = JSON.parse(localStorage.getItem('objet'));

//TODO: PANIER Affichage

function affichagePanier() {
	// Permet d'afficher le contenu du panier récupérer dans le localStorage

	for (let i = 0; i < data.length; i++) {
		let tbody = document.querySelector('tbody');
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		tr.innerHTML = '<th><span>' + data[i].name + '</span></th>';
		tr.innerHTML +=
			'<th><span class="description" >' + data[i].description + '</span></th>';
		tr.innerHTML +=
			'<th><span class="price">' + data[i].price / 100 + '</span>€</th>';
	}
}
affichagePanier();

//TODO Panier Prix

function price() {
	// Permet d'afficher le prix total
	let prixTotal = 0;
	for (let i = 0; i < data.length; i++) {
		number = data[i].price / 100;
		// Envoi le moi vers tableau
		prixTotal += number;
	}

	let divAffichage = document.querySelector('#affichePanier');
	price = document.createElement('span');
	divAffichage.appendChild(price);
	price.innerHTML = 'Total : ' + prixTotal + '€';

	// Envoi prix total pour confirm.js
	localStorage.setItem('total', JSON.stringify(prixTotal));
}
price();

//TODO PANIER Formulaire
function formulaire() {
	// Permet d'afficher le formulaire et récuperer les données qu'on envoi au LocalStorage

	document.querySelector('#commande').addEventListener('click', function () {
		// Permet de récuperer les valeurs du formulaire

		let firstName = document.getElementById('firstName');

		let lastName = document.getElementById('lastName');

		let address = document.getElementById('address');

		let city = document.getElementById('city');

		let email = document.getElementById('email');

		// Stockent les données formulaires
		let contact = {
			firstName: firstName.value,
			lastName: lastName.value,
			address: address.value,
			email: email.value,
			city: city.value,
		};

		if (
			firstName.value.match(/^([a-zA-Z- àâäéèêëïîôöùûüç]+)$/) &&
			lastName.value.match(/^([a-zA-Z- àâäéèêëïîôöùûüç]+)$/) &&
			address.value.match(/^([0-9a-zA-Z- àâäéèêëïîôöùûüç]+)$/) &&
			email.value.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			) &&
			city.value.match(/^([a-zA-Z- àâäéèêëïîôöùûüç]+)$/)
		) {
			// Stockent les ID des produits acheter
			let products = [];
			for (let i = 0; i < data.length; i++) {
				number = data[i]._id;
				// Envoi le moi vers tableau
				products.push(number);
			}

			// Stockent les données précédente dans une variable et la transforme en fichier JSON
			let sendData = JSON.stringify({ contact, products });

			// Envoie les données de sendData à l'API
			fetch('http://localhost:3000/api/cameras/order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: sendData,
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (commande) {
					// Stockent la réponse dans réponse de l'API dans le LocalStorage
					// Puis supprime la commande du LocalStorage
					// Puis renvoi vers la page confirm
					localStorage.setItem('numero', JSON.stringify(commande));
					localStorage.removeItem('objet');
					window.location.href = '../../front-end/view/confirm.html';
				})
				.catch(function (err) {
					// Sinon renvoie une erreur
					return err;
				});
		}
	});
}
formulaire();
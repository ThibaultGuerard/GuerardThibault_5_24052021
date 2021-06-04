// :::::::::::::::::::::::::::::::::::::::::::::: XMLHTTPREQUEST / FETCH ::::::::::::::::::::::::::::::::::::::::::::
//TODO: PRODUIT Récupération ID

// Récupére l'id dans l'url
const IDPURE = window.location.search;
// Remplace ?id= par du rien ne laissant que l'ID
const ID = IDPURE.replace('?id=', '');

//TODO: PRODUIT API

function getArticle() {
	// Récupére les données de l'API
	fetch('http://localhost:3000/api/cameras/' + ID + '/')
		// Créer une function qui va récuperer les données JSON de l'API

		.then(function (response) {
			return response.json();
		})
		// Recupere la valeur de la response.json puis la transofrme en une variable camera
		.then(function (camera) {
			displayArticles(camera);
		})
		// Si y a une erreur affiche erreur
		.catch(function (error) {
			alert(error);
		});
}
getArticle();

//TODO: PRODUIT Affichage

function displayArticles(article) {
	document.title = 'Orinoco | ' + article.name;

	//Image
	const img = document.querySelector('.imgProduit');
	img.src = article.imageUrl;

	//Titre
	const h2 = document.querySelector('h2');
	h2.textContent = article.name;

	//Description
	const p = document.querySelector('p');
	p.textContent = article.description;

	//Modele
	let lenses = article.lenses;
	for (let i = 0; i < lenses.length; i++) {
		let select = document.querySelector('select');
		console.log(lenses[i]);
		const option = document.createElement('option');
		option.textContent = lenses[i];
		select.appendChild(option);
	}

	//Prix
	const span = document.querySelector('span');
	span.textContent = article.price / 100 + '€';

	//TODO: PRODUIT Panier
	document.querySelector('input').addEventListener('click', function (e) {
		e.preventDefault();

		alert('Nous vous confirmons que vous avez ajouter cette article au panier');
		// Tableaux qui va contenir les articles
		let data = [];

		// stockage d'un objet
		let createObjets = {
			_id: article._id,
			name: article.name,
			description: article.description,
			price: article.price,
		};

		// Permetra de vérifier si il y a une autre
		let autreObjets = true;

		// Si la valeur récuperer dans le localStorage est vide(null).
		// Envoi les données de l'objet créer (createObjets) dans data
		// Puis envoi la data dans le local storage avec pour clé objet
		if (localStorage.getItem('objet') === null) {
			data.push(createObjets);
			localStorage.setItem('objet', JSON.stringify(data));
		}

		// Sinon si la valeur récuperer dans le localStorage n'est pas vide
		// data = la valeur déja dans le localstorage
		// Et si un il y a un autre objet envois le nouvelle objet dans data
		// Puis envois data dans le localstorage
		else {
			data = JSON.parse(localStorage.getItem('objet'));

			if (autreObjets) {
				data.push(createObjets);
				// Crée objet au format JSON
				localStorage.setItem('objet', JSON.stringify(data));
			}
		}
	});
}
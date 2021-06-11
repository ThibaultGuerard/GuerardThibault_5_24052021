//TODO INDEX Affichage
// Attend réponse API et affiche les articles

window.onload=mainJS();
async function mainJS() {
	// ASYNC permet de d'utiliser await qui va attendre la reponse avent de s'executer
	// Créer une variable avec les données produite part l'API et AWAIT permet d'en attendre sa réponse
	const articles = await getArticle();
	// Function : Qui va afficher les articles.
	for (let i = 0; i < articles.length; i++) {
		const article = articles[i];
		displayArticles(article);
	}
}

//TODO INDEX API
// Appel d'API

function getArticle() {
	// Appelle API (Equivalent à HTTPRequest)
	return (
		fetch('http://localhost:3000/api/cameras')
			// Créer une function qui va récuperer les données JSON de l'API
			.then(function (response) {
				return response.json();
			})
			// Recupere la valeur de la response.json puis la transofrme en une variable article
			.then(function (articles) {
				return articles;
			})
			// Si y a une erreur affiche erreur
			.catch(function (error) {
				alert(error);
			})
	);
}

//TODO INDEX Article
// Affichage Article

function displayArticles(article) {
	// Créer un fiche article qui sera lu dans la boucle mainJS
	console.log(article);

	// MAIN PAGE
	const main = document.querySelector('main');

	// PRODUIT CONTAINER
	const container = document.createElement('div');
	main.appendChild(container);

	// LIEN
	const lien = document.createElement('a');
	container.appendChild(lien);
	lien.href = 'front-end/view/produits.html?id=' + article._id;
	lien.classList.add('lienProduit');

	// FIGURE
	const figure = document.createElement('figure');
	lien.appendChild(figure);

	// IMAGE
	figure.innerHTML = '<img src="' + article.imageUrl + '"class="imgProduit" />';

	// FIGCAPTION (Nom, Description, Prix)
	const figcaption = document.createElement('figcaption');
	figure.appendChild(figcaption);
	figcaption.classList.add('fiche');
	figcaption.innerHTML =
		'<h2 class="name">' +
		article.name +
		'</h2><p class="description">' +
		article.description +
		'</p><span class="price">' +
		article.price / 100 +
		' €</span>';
}
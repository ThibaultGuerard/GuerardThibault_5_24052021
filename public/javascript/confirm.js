//TODO CONFIRM Commande
// Récuperer les données du localStorage
let data = JSON.parse(localStorage.getItem('numero'));
let total = JSON.parse(localStorage.getItem('total'));

console.log(total);

// Récupere le prix total du localStorage pour l'afficher
document.querySelector('#total').innerHTML =
	'Total :<br><br>' + total + ' €<br><br>';

// Récupere le numéro de commande
let order = data.orderId;

// Affiche le numéro de commande
let confirm = document.getElementById('confirm_num');
confirm.innerHTML = 'N° de commande :  <br><br>' + order;
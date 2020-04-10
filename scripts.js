const button = document.querySelector('#shopping-card');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal-close');

function toggleModal() {
    modal.classList.toggle('open'); 
}

button.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);

new WOW().init();

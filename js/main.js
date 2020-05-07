const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const password = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

const cardsRestaurants = document.querySelector('.cards-restaurants');
const cardsMenu = document.querySelector('.cards-menu');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');



// Authorize module
let login = '' || localStorage.getItem('deliveryFood');

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized(){
  console.log('Authorised');
  
  function logOut(){
    login = null;
    localStorage.removeItem('deliveryFood');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    
    checkAuth();
  }

  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}


// function maskInput(string) {
//   return !!string.trim();
// }


function notAuthorized(){
  console.log('Not authorised');

  function logIn(event){
    event.preventDefault();
    
    if(loginInput.value.trim() && password.value.trim()) {
      login = loginInput.value;
  
      localStorage.setItem('deliveryFood', login);
  
      toggleModalAuth();

      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      loginForm.removeEventListener('submit', logIn);
      loginForm.reset();
      
      checkAuth();
    } else {
      loginInput.style.borderColor = 'tomato'; 
      password.style.borderColor = 'tomato';
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  loginForm.addEventListener('submit', logIn)
}

function checkAuth(){
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

// Resturants' cards

function createCardRestaurant(){
  const cardRestaurant = 
    `<a class="card card-restaurant">
              <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image" />
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title">Пицца плюс</h3>
                  <span class="card-tag tag">50 мин</span>
                </div>
                <div class="card-info">
                  <div class="rating">
                    4.5
                  </div>
                  <div class="price">От 900 ₽</div>
                  <div class="category">Пицца</div>
                </div>
              </div>
            </a>`;

    cardsRestaurants.insertAdjacentHTML('beforeend', cardRestaurant);
}



function createCardDish() {
  const cardDish =  `
        <div class="card">
            <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Классика</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина,
									салями,
									грибы.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">510 ₽</strong>
							</div>
						</div>
        </div>				
      `;
  cardsMenu.insertAdjacentHTML('beforeend', cardDish);
  
}



function openDishes(event){
  
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');

    if (restaurant) {

      if (login) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      createCardDish();
      createCardDish();
      createCardDish();
      } else {
        toggleModalAuth();
      }
    }
    
}
function closeDishes(event){
    
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
    
}


cartButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openDishes);
logo.addEventListener('click', closeDishes);


checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 1,
});
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

const urlRest = './db/partners.json';



// Authorize module
let login = '' || localStorage.getItem('deliveryFood');

const getData = async function(url) {
    const response = await fetch(url);
    
    if(!response.ok) {
      throw new Error('URL is missed');
    }

  const data = await response.json();
  return data;
};



const toggleModal = () => modal.classList.toggle("is-open");

const toggleModalAuth = () => modalAuth.classList.toggle('is-open');

const authorized = () => {
  console.log('Authorised');
  
  const logOut = () => {
    login = null;
    localStorage.removeItem('deliveryFood');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    
    checkAuth();
  };

  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
};



const notAuthorized = () => {
  console.log('Not authorised');

  const logIn = event => {
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

const checkAuth = () => {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

// Resturants' cards

const createCardRestaurant = restaurant => {
  
  const { 
    name, 
    time_of_delivery: deliveryTime, 
    stars, 
    price,
    kitchen,
    image,
    products 
  } = restaurant;
  
  const cardRestaurant = 
    `<a class="card card-restaurant" data-products="${products}">
              <img src="${image}" alt="${name}" class="card-image" />
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title">${name}</h3>
                  <span class="card-tag tag">${deliveryTime} мин</span>
                </div>
                <div class="card-info">
                  <div class="rating">
                    ${stars}
                  </div>
                  <div class="price">От ${price} грн</div>
                  <div class="category">${kitchen}</div>
                </div>
              </div>
            </a>`;

    cardsRestaurants.insertAdjacentHTML('beforeend', cardRestaurant);
}



const createCardDish = dish => {

  const {
    id,
    name,
    description,
    price,
    image
  } = dish;
  
  
  const cardDish =  `
        <div class="card">
            <img src="${image}" alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} грн</strong>
							</div>
						</div>
        </div>				
      `;
  cardsMenu.insertAdjacentHTML('beforeend', cardDish);
  
}



const openDishes = event => {
  
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');

    if(login) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      getData(`./db/${restaurant.dataset.products}`)
        .then(data => 
          data.forEach(createCardDish));
    } else {
        toggleModalAuth();
      }
    }
    
const closeDishes = event => {
    
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
    
}

 function init() {
    getData(urlRest)
      .then( data => 
        data.forEach(createCardRestaurant));

    cartButton.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);

    cardsRestaurants.addEventListener('click', openDishes);
    logo.addEventListener('click', closeDishes);


    checkAuth();

    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000,
      },
      slidesPerView: 1,
    });
};

init();
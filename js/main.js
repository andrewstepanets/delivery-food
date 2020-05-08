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

const totalTagPrice = document.querySelector('.modal-pricetag');
const modalBody = document.querySelector('.modal-body');
const cancelCartButton = document.querySelector('.clear-cart');

const urlRest = './db/partners.json';

const cartItems =[];



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
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    
    checkAuth();
  };
  
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';

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
								<button class="button button-primary button-add-cart" data-name="${name}" data-price="${price}" data-id="${id}">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price card-price-bold">${price} грн</strong>
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

function addItemsToCart(event) {
  const target = event.target;
  const buttonAddItemsToCart = target.closest('.button-add-cart');
  
  if(buttonAddItemsToCart) {
    const title = buttonAddItemsToCart.dataset.name;
    const price = parseInt(buttonAddItemsToCart.dataset.price);
    const id = buttonAddItemsToCart.dataset.id;

    const nameItem = cartItems.find(item => item.id === id);

   if(nameItem) {
     nameItem.count +=1;
   } else {
     cartItems.push({
       id,
       title,
       price,
       count: 1,
     });
   } 
  }
}

function renderCart(){
    modalBody.textContent = '';

  cartItems.forEach(({ id, title, price, count }) => {
        const cartItem = `
          <div class="food-row">
            <span class="food-name">${title}</span>
            <strong class="food-price">${price} грн</strong>
            <div class="food-counter">
              <button class="counter-button counter-minus" data-id="${id}">-</button>
              <span class="counter">${count}</span>
              <button class="counter-button counter-plus" data-id="${id}">+</button>
            </div>
          </div>
        `;
        modalBody.insertAdjacentHTML('afterbegin', cartItem);
      });

      const totalPrice = cartItems.reduce(function(result, item) {
          return result + item.price * item.count;
      }, 0);

      totalTagPrice.textContent = `${totalPrice} грн`;
        
}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const dish = cartItems.find(item => item.id === target.dataset.id);
    
    target.classList.contains('counter-minus') && dish.count--;
    if(dish.count === 0) cartItems.splice(cartItems.indexOf(dish), 1);
    target.classList.contains('counter-plus') && dish.count++;

    renderCart();
  }
}

function init() {
    getData(urlRest)
      .then( data => 
        data.forEach(createCardRestaurant));

    cartButton.addEventListener('click', function(){
      renderCart();
      toggleModal();
    });


    cancelCartButton.addEventListener('click', () => {
      cartItems.length = 0;
      renderCart();
    })
    
    modalBody.addEventListener('click', changeCount);
    
    cardsMenu.addEventListener('click', addItemsToCart);
    closeButton.addEventListener('click', toggleModal);

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
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// Day 1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const password = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = '' || localStorage.getItem('deliveryFood');

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

checkAuth();


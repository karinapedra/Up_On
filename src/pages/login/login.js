import {
  loginEmailAndPassword,
  loginGoogle,
  recoverPassword,
} from '../../firebase/firebase.js';

export default () => {
  const container = document.createElement('article');
  container.classList.add('formContent');
  const template = `
  <header class='header'>
      <nav>
        <ul class='headerMenu'>
            <a href='#login' id='logo'>
              <img src='assets/up_on_logo.png' alt='up_on_logo' />
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <section class='about'> 
      <figure><img src='./assets/up_on_logo.png' alt='Up_On' id='logo'></figure>
      <p id='aboutUpOn'>
        A place where you can connect with what truly matters. Stay updated on your favorite interests, from technology to entertainment, all in real-time. Share news, discover relevant content, and become a part of a community passionate about knowledge. 
        Join us to explore a world of information and meaningful connections.
      </p>
    </section>
    <section class='formLogin'>
      <section class='formTitle'>
          <h2>Sign in</h2>
          <p class='initialAbout'> Stay up on the latest happenings from around the world, right here and now.</p>
      </section>
      <form class='formInputs'>
        <p id='errorMessage'></p>
        <input type='email' class='formInput' placeholder='E-mail' id='email' required></input>
        <input type='password' class='formInput' placeholder='Password' id='password' required></input>
        <a href='#forgot' id='recoverPasswordButton'>Forgot your password?</a>
        <button class='formButtons' id='signIn'>Sign In</button>
      </form>
      <hr>
      <button id='google' class='buttonGoogle'>
        <img class='imgGoogle' src='./assets/google.png' alt='Google'>
        <p>Continue With Google</p>
      </button>
      <p class='smallThings'>New in Up_On? <a href='#register'>SignUp</a></p>
      <a href='#' class='smallThings' id='open-modal-about'>Learn About Up_On</a>
    </section>
    
    <div id='fade-about' class='hide'></div>
    <div id='modal-about' class='hide'>
      <div class='modal-header-about'>
        <img src='/assets/up_on_logo.png' class='logo-img' alt='up_on_logo' />
      </div>
      <div class='modal-body-about'>
        <p class='modalText'>
          A place where you can connect with what truly matters. Stay updated on your favorite interests, from technology to entertainment, all in real-time. Share news, discover relevant content, and become a part of a community passionate about knowledge. 
          Join us to explore a world of information and meaningful connections.
        </p>
        <button class='formButtons' id='close-modal-about'>Back</button>
      </div>
    </div>
`;

  container.innerHTML = template;
  const emailLogin = container.querySelector('#email');
  const passwordLogin = container.querySelector('#password');
  const signInButton = container.querySelector('#signIn');
  const google = container.querySelector('#google');
  const errorMessage = container.querySelector('#errorMessage');
  const recoverPasswordButton = container.querySelector('#recoverPasswordButton');

  recoverPasswordButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = emailLogin.value;
    recoverPassword(email);
  });

  signInButton.addEventListener('click', (event) => {
    event.preventDefault();
    loginEmailAndPassword(emailLogin.value, passwordLogin.value)
      .catch((error) => {
        let errorCode = error.code;
        errorCode = errorCode.substr(5).split('-').join(' ');
        errorMessage.innerText = errorCode.charAt(0).toUpperCase() + errorCode.slice(1);
        errorMessage.style.display = 'block';
      });
  });
  google.addEventListener('click', () => loginGoogle());
  emailLogin.addEventListener('input', () => {
    errorMessage.style.display = 'none';
  });
  passwordLogin.addEventListener('input', () => {
    errorMessage.style.display = 'none';
  });
  const openModalAboutButton = container.querySelector('#open-modal-about');
  const closeModalAboutButton = container.querySelector('#close-modal-about');
  const modalAbout = container.querySelector('#modal-about');
  const fadeAbout = container.querySelector('#fade-about');

  const toggleModal = () => {
    modalAbout.classList.toggle('hide');
    fadeAbout.classList.toggle('hide');
  };

  [openModalAboutButton, closeModalAboutButton, fadeAbout].forEach((el) => {
    el.addEventListener('click', () => toggleModal());
  });
  return container;
};

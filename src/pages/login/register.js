import {
  createUserEmailAndPassword,
  loginGoogle,
} from '../../firebase/firebase.js';
import logo from '../../assets/up_on_logo.png';
import google from '../../assets/google.png';

export default () => {
  const container = document.createElement('article');
  container.classList.add('formRegister');

  const template = `
      <header class='header-register'>
          <nav>
            <ul class='headerMenu'>
                <a href='#login' id='logo'>
                  <img src='${logo}' alt='up_on_logo' />
                </a>
              </li>
            </ul>
          </nav>
        </header>
      <article class='formRegisterContent'>
        <h2 class='formTitle'>Sign Up</h2>
        <p class='formTitle'>And be part of the network that keeps you up on the most current information in the world!</p>
        <form class='formInputs' id='formRegister'>
          <p id='errorMessage'></p>
          <input id='email' type='email' class='formInput'  placeholder='E-mail'/>
          <input type='text' class='formInput' id='nickname' placeholder='Choose your nickname'/>
          <section class='chooseIcon'> 
            <p>Choose your Icon</p>
            <figure class='iconUser'>
                <label for='i1'><img class='iconImg' src='https://cdn.icon-icons.com/icons2/1576/PNG/512/3561841-emoji-expression-glared-shocked-surprised_107880.png' alt=''></label>
              <input type='radio' name='imagem' value='https://cdn.icon-icons.com/icons2/1576/PNG/512/3561842-emoji-emoticon-expression-shame-smiley_107887.png' id='i2' />
                <label for='i2'><img class='iconImg' src='https://cdn.icon-icons.com/icons2/1576/PNG/512/3561842-emoji-emoticon-expression-shame-smiley_107887.png' alt=''></label>
              <input type='radio' name='imagem' value='https://cdn.icon-icons.com/icons2/1576/PNG/512/3561857-bedroom-emoji-emoticon-rest-sleep-sleeping_107895.png' id='i3' />
                <label for='i3'><img class='iconImg' src='https://cdn.icon-icons.com/icons2/1576/PNG/512/3561857-bedroom-emoji-emoticon-rest-sleep-sleeping_107895.png' alt=''></label>
              <input type='radio' name='imagem' value='https://cdn.icon-icons.com/icons2/1576/PNG/512/3561839-emoji-emoticon-silly_107878.png' id='i4' />
                <label for='i4'><img class='iconImg' src='https://cdn.icon-icons.com/icons2/1576/PNG/512/3561839-emoji-emoticon-silly_107878.png' alt=''></label>
            </figure>
          </section>
          <p class='smallContent'>Enter at least 6 characters</p>
          <input id='password' type='password' class='formInput' placeholder='Password'/>
          <input id='confirmPassword' type='password' class='formInput' placeholder='Confirm your password'/>
          <button id='signUp' class='formButtons'>Sign Up</button>
        </form>
        <button id='google' class='buttonGoogle'>
        <img class='imgGoogle' src='${google}' alt='Google'>
        <p>Continue With Google</p>
        </button>
      </article>
    `;

  container.innerHTML = template;
  const emailCreate = container.querySelector('#email');
  const passwordCreate = container.querySelector('#password');
  const confirmPasswordCreate = container.querySelector('#confirmPassword');
  const signUpButton = container.querySelector('#signUp');
  const googleButton = container.querySelector('#google');
  const errorMessage = container.querySelector('#errorMessage');
  const nickname = container.querySelector('#nickname');
  const icons = container.querySelectorAll('input[type="radio"][name="imagem"]');
  let selectedIcon = '';

  icons.forEach((icon) => {
    icon.addEventListener('change', (selectedIcon = () => {
      const iconSelected = container.querySelector('input[type="radio"][name="imagem"]:checked');
      if (iconSelected) {
        return iconSelected.value;
      }
      return iconSelected.value;
    }));
  });

  signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (passwordCreate.value === confirmPasswordCreate.value) {
      createUserEmailAndPassword(
        emailCreate.value,
        passwordCreate.value,
        nickname.value,
        selectedIcon(),
      )
        .then(() => {
          window.location.href = '#timeline';
        })
        .catch((error) => {
          let errorCode = error.code;
          errorCode = errorCode.substr(5).split('-').join(' ');
          errorMessage.innerText = errorCode.charAt(0).toUpperCase() + errorCode.slice(1);
          errorMessage.style.display = 'block';
        });
    } else {
      errorMessage.style.display = 'block';
      errorMessage.innerText = 'Passwords dont match';
    }
  });

  googleButton.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        window.location.href = '#timeline';
      });
  });
  emailCreate.addEventListener('input', () => {
    errorMessage.style.display = 'none';
  });
  passwordCreate.addEventListener('input', () => {
    errorMessage.style.display = 'none';
  });

  return container;
};

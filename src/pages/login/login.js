import { loginEmailAndPassword, loginGoogle } from "../../firebase/firebase.js";

export default () => {
  const container = document.createElement("article");
  container.classList.add("formContent");
  const template = `
    <section class="about"> 
      <figure><img src="./assets/up_on_logo.png" alt="Up_On" id="logo"></figure>
      <p id="aboutUpOn">
        A place where you can connect with what truly matters. Stay updated on your favorite interests, from technology to entertainment, all in real-time. Share news, discover relevant content, and become a part of a community passionate about knowledge. 
        Join us to explore a world of information and meaningful connections.
      </p>
    </section>
    <section class="formLogin">
      <section class="formTitle">
          <h2>Sign in</h2>
          <p class="initialAbout"> Stay up on the latest happenings from around the world, right here and now.</p>
      </section>
      <form class="formInputs">
        <p id="errorMessage"></p>
        <input type="email" class="formInput" placeholder="E-mail" id="email" required></input>
        <input type="password" class="formInput" placeholder="Password" id="password" required></input>
        <button class="formButtons" id="signIn">Sign In</button>
      </form>
      <hr>
      <button id="google" class="buttonGoogle">
        <img class="imgGoogle" src="./assets/google.png" alt="Google">
        <p>Continue With Google</p>
      </button>
      <p class="smallThings">New in Up_On? <a href="#register">SignUp</a></p>
      <a href="#" class="smallThings" id="open-modal">Learn About Up_On</a>
    </section>
    <div id="fade" class="hide"></div>
    <div id="modal" class="hide">
      <div class="modal-header">
        <img src="/assets/up_on_logo.png" class="logo-img" alt="up_on_logo" />
      </div>
      <div class="modal-body">
        <p class="modalText">
          A place where you can connect with what truly matters. Stay updated on your favorite interests, from technology to entertainment, all in real-time. Share news, discover relevant content, and become a part of a community passionate about knowledge. 
          Join us to explore a world of information and meaningful connections.
        </p>
        <button class="formButtons" id="close-modal">Back</button>
      </div>
    </div>
`;

  container.innerHTML = template;
  const emailLogin = container.querySelector("#email");
  const passwordLogin = container.querySelector("#password");
  const signInButton = container.querySelector("#signIn");
  const google = container.querySelector("#google");
  const errorMessage = container.querySelector("#errorMessage");
  const header = document.querySelector(".header");

  header.style.display = "none";

  signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    loginEmailAndPassword(emailLogin.value, passwordLogin.value)
      .then((userCredential) => {
        window.location.href = "#timeline";
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error)
        let errorCode = error.code;
        errorCode = errorCode.substr(5).split("-").join(" ");
        errorMessage.innerText =
          errorCode.charAt(0).toUpperCase() + errorCode.slice(1);
        errorMessage.style.display = "block";
      });
  });
  google.addEventListener("click", () => {
    loginGoogle()
      .then((result) => {
        window.location.href = "#timeline";
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
      });
  });
  emailLogin.addEventListener("input", () => {
    errorMessage.style.display = "none";
  })
  passwordLogin.addEventListener("input", () => {
    errorMessage.style.display = "none";
  })
  const openModalButton = container.querySelector("#open-modal");
  const closeModalButton = container.querySelector("#close-modal");
  const modal = container.querySelector("#modal");
  const fade = container.querySelector("#fade");

  const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
  };

  [openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
  });
  return container;
};


import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../configFirebase.js";

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
        <input type="email" class="formInput" placeholder="E-mail" id="email"></input>
        <input type="password" class="formInput" placeholder="Password" id="password"></input>
        <button class="formButtons" id="signIn">Sign In</button>
      </form>
      <hr>
      <img src="./assets/google.png" alt="Google" id="google">
      <p class="smallThings">New in Up_On? <a href="#" >SignUp</a></p>
      <a href="#" class="smallThings" id="open-modal">Learn About Up_On</a>
    </section>
    <div id="fade" class="hide"></div>
    <div id="modal" class="hide">
      <div class="modal-header">
        <img src="/assets/up_on_logo.png" class="logo-img" alt="up_on_logo" />
      </div>
      <div class="modal-body">
        <p class="modalText">A place where you can connect with what truly matters. Stay updated on your favorite interests, from technology to entertainment, all in real-time. Share news, discover relevant content, and become a part of a community passionate about knowledge. 
        Join us to explore a world of information and meaningful connections.</p>
        <button class="formButtons" id="close-modal">Back</button>
      </div>



`;

  container.innerHTML = template;
  const emailLogin = container.querySelector("#email");
  const passwordLogin = container.querySelector("#password");
  const signInButton = container.querySelector("#signIn");
  const getAppAuth = () => getAuth(app);
  const auth = getAppAuth();
  signInButton.addEventListener(
    "click", () => {
      signInWithEmailAndPassword(auth, emailLogin.value, passwordLogin.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("deu certo")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
    });
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

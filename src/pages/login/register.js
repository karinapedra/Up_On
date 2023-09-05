import { createUserEmailAndPassword, loginGoogle } from "../../firebase/firebase.js";

export default () => {
  const container = document.createElement("article");
  container.classList.add("formRegister");

  const template = `
      <h2 class="formTitle">Sign Up</h2>
      <p class="formTitle">And be part of the network that keeps you up on the most current information in the world!</p>
      <form class="formInputs">
        <p id="errorMessage"></p>
        <input id="email" type="email" class="formInput"  placeholder="E-mail"/>
        <input type="text" class="formInput" placeholder="Choose your nickname"/>
        <p class="smallContent">Enter at least 8 characters</p>
        <input id="password" type="password" class="formInput" placeholder="Password"/>
        <input id="confirmPassword" type="password" class="formInput" placeholder="Confirm your password"/>
        <button id="signUp" class="formButtons">Sign Up</button>
      </form>
      <button id="google" class="buttonGoogle">
        <img class="imgGoogle" src="./assets/google.png" alt="Google">
        <p>Continue With Google</p>
      </button>
    `

  container.innerHTML = template;
  const emailCreate = container.querySelector("#email");
  const passwordCreate = container.querySelector("#password");
  const confirmPasswordCreate = container.querySelector("#confirmPassword");
  const signUpButton = container.querySelector("#signUp");
  const google = container.querySelector("#google");
  const errorMessage = container.querySelector("#errorMessage");
  const header = document.querySelector(".header");

  header.style.display = "flex";

  signUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (passwordCreate.value === confirmPasswordCreate.value){
      console.log("ok");
      createUserEmailAndPassword(emailCreate.value, passwordCreate.value)
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
    } else {
      errorMessage.innerText = "Password doesn't match";
    }
  });

  google.addEventListener("click", () => {
    loginGoogle()
      .then((result) => {
        window.location.href = "#timeline";
      })
      .catch((error) => {
        const errorCode = error.code;
      });
  });
  emailCreate.addEventListener("input", () => {
    errorMessage.style.display = "none";
  })
  passwordCreate.addEventListener("input", () => {
    errorMessage.style.display = "none";
  })

    return container;
}
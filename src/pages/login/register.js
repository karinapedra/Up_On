import { createUserEmailAndPassword, loginGoogle } from "../../firebase/firebase.js";

export default () => {
  const container = document.createElement("article");
  container.classList.add("formRegister");

  const template = `
      <h2 class="formTitle">Sign Up</h2>
      <p class="formTitle">And be part of the network that keeps you up on the most current information in the world!</p>
      <form class="formInputs" id="formRegister">
        <p id="errorMessage"></p>
        <input id="email" type="email" class="formInput"  placeholder="E-mail"/>
        <input type="text" class="formInput" id="nickname" placeholder="Choose your nickname"/>
        <section class="chooseIcon"> 
          <p>Choose your Icon</p>
          <figure class="iconUser">
            <input type="radio" name="imagem" value="https://drive.google.com/uc?id=1V-xExEGhwfNOajQiLyWHfvmrkI5-h8nD" id="i1" />
              <label for="i1"><img class="iconImg" src="https://drive.google.com/uc?id=1V-xExEGhwfNOajQiLyWHfvmrkI5-h8nD" alt=""></label>
            <input type="radio" name="imagem" value="https://drive.google.com/uc?id=1IaVq5iSVO5EAm2Zr8KqEWQqKuRfzPTVS" id="i2" />
              <label for="i2"><img class="iconImg" src="https://drive.google.com/uc?id=1IaVq5iSVO5EAm2Zr8KqEWQqKuRfzPTVS" alt=""></label>
            <input type="radio" name="imagem" value="https://drive.google.com/uc?id=12s1zfZz18VpKonacjdgdxIHhrkKzQsZS" id="i3" />
              <label for="i3"><img class="iconImg" src="https://drive.google.com/uc?id=12s1zfZz18VpKonacjdgdxIHhrkKzQsZS" alt=""></label>
            <input type="radio" name="imagem" value="https://drive.google.com/uc?id=1l3de36UjlXbzICb1vwwtUVvif9JcKZs2" id="i4" />
              <label for="i4"><img class="iconImg" src="https://drive.google.com/uc?id=1l3de36UjlXbzICb1vwwtUVvif9JcKZs2" alt=""></label>
          </figure>
        </section>
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
  const nickname = container.querySelector("#nickname");
  // const form = container.querySelector("#formRegister");
  // const icons = form.elements["image"]
  const icons = container.querySelectorAll('input[type="radio"]');
  
  header.style.display = "flex";


  const valueSelected = (() =>{
    icons.forEach((icon)=>{
      icon.addEventListener("change",()=>{
        const iconSelected = container.querySelector("input[type='radio'] [name='image']:checked");
        if(iconSelected){
          const valueSelected = iconSelected.value;
          console.log("opção selecionada:" + valueSelected);
          return valueSelected
        }
      })
    })
  })

  signUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (passwordCreate.value === confirmPasswordCreate.value) {
      console.log("ok");
      createUserEmailAndPassword(emailCreate.value, passwordCreate.value, nickname.value, valueSelected())
        .then((userCredential) => {
          window.location.href = "#timeline";
          const user = userCredential.user;
          console.log(user);
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
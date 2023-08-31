import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../configFirebase.js";

export default () => {
  const container = document.createElement("article");
  container.classList.add("formContent");
  const template = `
    <section class="formTitle">
        <h2>Sign in</h2>
        <p> Stay up on the latest happenings from around the world, right here and now.</p>
    </section>
    <input type="email" class="formInput" placeholder="E-mail" id="email"></input>
    <input type="password" class="formInput" placeholder="Password" id="password"></input>
    <a href="#" class="smallThings">Forgot your password?</a>
    <button class="formButtons" id="signIn">Sign In</button>
    <p>_____________ or ____________</p>
    <button class="formButtons" id="google">Continue with Google</button>
    <p class="smallThings">New in Up_On? <a href="#" >SignUp</a></p>
    <a href="#" class="smallThings">Learn About Up_On</a>
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
  return container;
};

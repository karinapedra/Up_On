import { logOut } from "../../firebase/firebase.js";

export default () => {
  const container = document.createElement("div");
  container.classList.add("formContent");

  const template = `
    <h2 class="formTitle">TIMELINE</h2>
    <button id="signOut">Sign Out</button>
    `;

  container.innerHTML = template;
  const signOutButton = container.querySelector("#signOut")
  signOutButton.addEventListener("click", (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        window.location.href = "#login";
      })
      .catch((error) => {
      });
  });


  return container;
};

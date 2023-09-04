import login from "./pages/login/login.js";
import register from "./pages/login/register.js";
import timeline from './pages/timeline/timeline.js'

const main = document.querySelector("#root");

const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = "";
    switch (window.location.hash) {
      case " ":
        main.appendChild(login());
        break;
      case "#register":
        main.appendChild(register());
        break;
      case "#timeline":
        main.appendChild(timeline());
        break;
      case "#search":
        main.appendChild(search());
        break;
      default:
        main.appendChild(login());
    }
  });
};

window.addEventListener("load", () => {
  main.appendChild(login());
  init();
});

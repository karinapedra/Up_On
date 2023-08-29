import login from './pages/login/login.js'
import register from './pages/login/register.js'
import timeline from './pages/timeline/timeline.js'

const main = document.querySelector("#root");

window.addEventListener("load", () => {
main.appendChild(login());
})
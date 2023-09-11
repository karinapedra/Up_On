import { logOut, getUserInfo } from "../../firebase/firebase.js";

export default () => {
  const container = document.createElement("article");
  container.classList.add("formContent");

  const template = `
    <article class="posts">
      <section class="postHeader">
        <img src="" id="userImage">
        <h4 id="nickname"></h4>
        <p class="timestamp">11-09-2023 10:38</p>
        <button class="postButtons"><img src="./assets/edit.png"></button>
      </section>
      <p class="content">Post aquii Post aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquii</p>
      <section class="postFooter">
        <button class="postButtons"><img src="./assets/remove.png"></button>
        <section class="votes">
          <button class="postButtons"><img src="./assets/upvote.png"></button>
          <p id="countVotes">3</p>
          <button class="postButtons"><img src="./assets/downvote.png"></button>
        </section>
      </section>
    </article>
    <br>
    <article class="posts">
      <section class="postHeader">
        <img src="" id="userImage">
        <h4 id="nickname"></h4>
        <p class="timestamp">11-09-2023 10:38</p>
        <button class="postButtons"><img src="./assets/edit.png"></button>
      </section>
      <p class="content">Post aquii Post aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquii</p>
      <section class="postFooter">
        <button class="postButtons"><img src="./assets/remove.png"></button>
        <section class="votes">
          <button class="postButtons"><img src="./assets/upvote.png"></button>
          <p id="countVotes">3</p>
          <button class="postButtons"><img src="./assets/downvote.png"></button>
        </section>
      </section>
    </article>
    <br>
    <article class="posts">
      <section class="postHeader">
        <img src="" id="userImage">
        <h4 id="nickname"></h4>
        <p class="timestamp">11-09-2023 10:38</p>
        <button class="postButtons"><img src="./assets/edit.png"></button>
      </section>
      <p class="content">Post aquii Post aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquii</p>
      <section class="postFooter">
        <button class="postButtons"><img src="./assets/remove.png"></button>
        <section class="votes">
          <button class="postButtons"><img src="./assets/upvote.png"></button>
          <p id="countVotes">3</p>
          <button class="postButtons"><img src="./assets/downvote.png"></button>
        </section>
      </section>
    </article>
    <br>
    <article class="posts">
      <section class="postHeader">
        <img src="" id="userImage">
        <h4 id="nickname"></h4>
        <p class="timestamp">11-09-2023 10:38</p>
        <button class="postButtons"><img src="./assets/edit.png"></button>
      </section>
      <p class="content">Post aquii Post aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquiiPost aquii</p>
      <section class="postFooter">
        <button class="postButtons"><img src="./assets/remove.png"></button>
        <section class="votes">
          <button class="postButtons"><img src="./assets/upvote.png"></button>
          <p id="countVotes">3</p>
          <button class="postButtons"><img src="./assets/downvote.png"></button>
        </section>
      </section>
    </article>
    <button id="signOut">Sign Out</button>
    `;

  container.innerHTML = template;
  const signOutButton = container.querySelector("#signOut");
  const userImage = container.querySelector("#userImage");
  const userNickname = container.querySelector("#nickname");
  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");
  const user = getUserInfo();
  userImage.src = user.photoURL;
  userNickname.innerHTML = user.displayName


  footer.style.display = "block";
  header.style.display = "flex";

  signOutButton.addEventListener("click", (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        window.location.href = "#login";
      })
      .catch((error) => {});
  });
  return container;
};

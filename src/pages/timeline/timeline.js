import { async } from "regenerator-runtime";
import { logOut, getUserInfo, getPosts } from "../../firebase/firebase.js";

export default () => {
  const container = document.createElement("article");
  container.classList.add("timelineContent");

  const template = `
    <section class="allPosts"></section>
    <div id="fade" class="hide"></div>
    <div id="modal" class="hide">
      <div class="modal-header">
        <img src="" id="userImagePost" class="imgProfile" alt="Profile Image"/>
        <p id="userCreatPost"></p>
      </div>
      <div class="modal-body">
        <textarea id="createPost" placeholder="What's happening?"></textarea>
        <section class="buttonsCreate"> 
          <button class="postButtonsCreate" id="close-modal">CANCEL</button>
          <button class="postButtonsCreate" id="sendPost">POST</button>
        </section>
      </div>
    </div>

    <button class="createButton" id="open-modal"><img src="./assets/create.png"></button>
    <button id="signOut">Sign Out</button>
    `;

  container.innerHTML = template;
  const signOutButton = container.querySelector("#signOut");
  const userImagePost = container.querySelector("#userImagePost");
  const userCreatPost = container.querySelector("#userCreatPost");
  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");
  const openModalButton = container.querySelector("#open-modal");
  const closeModalButton = container.querySelector("#close-modal");
  const modal = container.querySelector("#modal");
  const fade = container.querySelector("#fade");
  const allPosts = container.querySelector(".allPosts");

  const user = getUserInfo();

  userImagePost.src = user.photoURL;
  userCreatPost.innerHTML = user.displayName;
  footer.style.display = "block";
  header.style.display = "flex";


  const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
  };

  [openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
  });


  const createPosts = (post) =>{
    const firestoreTimestamp = post.data;
    const date = firestoreTimestamp.toDate();
    const dateString = date.toLocaleDateString(); 
    const timeString = date.toLocaleTimeString();

    const postFeed = document.createElement("article");
    postFeed.classList.add("posts");
    const template = `
      <section class="postHeader">
        <section class="postUserInfo">
          <img src="${post.photoURL}" class="userImage">
          <h4 class="nickname">${post.nickname}</h4>
          <p class="timestamp">${dateString, timeString}</p>
        </section>  
        <button class="postButtons"><img src="./assets/edit.png"></button>
      </section>
      <p class="content">${post.content}</p>
      <section class="postFooter">
        <section class="votes">
          <button class="postButtons"><img src="./assets/upvote.png"></button>
          <p class="countVotes"></p>
          <button class="postButtons"><img src="./assets/downvote.png"></button>
        </section>
        <button class="postButtons"><img src="./assets/remove.png"></button>
      </section>
    `
    postFeed.innerHTML = template;
    container.appendChild(postFeed);
    return postFeed;
  }

  const showPosts = async (posts) =>{
    posts = await getPosts()
    console.log(posts);
    posts.forEach((post) => {
      const cards = createPosts(post);
      allPosts.appendChild(cards);
      
    });  
  }
document.addEventListener("load", showPosts());


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

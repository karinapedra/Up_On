import {
  logOut,
  getUserInfo,
  addPost,
  calculateTimeAgo,
  getPosts,
  votePost,
} from "../../firebase/firebase.js";

export default () => {
  const container = document.createElement("article");
  container.classList.add("timelineContent");

  const template = `
    <header class="header-timeline">
      <nav>
        <ul class="headerMenu-timeline">
          <li>
            <img src="" id="userImageHeader" alt="profileImage">
          <li>
            <a href="#timeline" id="logo">
              <img src="assets/up_on_logo.png" alt="up_on_logo" />
            </a>
          </li>
          <li>
            <a href="#search">
              <img src="assets/search.png" alt="search" />
            </a>
          </li>
        </ul>
    </nav>
    </header>
    <section class="allPosts"></section>
    <div id="fade-createPost" class="hide"></div>
    <div id="modal-createPost" class="hide">
      <div class="modal-header">
        <img src="" id="userImage" class="imgProfile" alt="Profile Image"/>
        <p id="userName"></p>
      </div>
      <div class="modal-body">
        <textarea id="createPost" placeholder="What's happening?" maxlength="150"></textarea>
        <section class="buttonsCreate"> 
          <button class="postButtonsCreate" id="close-modal-createPost">CANCEL</button>
          <button class="postButtonsCreate" id="sendPost">POST</button>
        </section>
      </div>
    </div>

    <button class="createButton" id="open-modal-createPost"><img src="./assets/create.png"></button>
    <button id="signOut">Sign Out</button>
    `;

  // <div id="fade-deletePost" class="hide"></div>
  // <div id="modal-deletePost" class="hide">
  //   <div class="modal-header">
  //     <img src="" id="userImage" class="imgProfile" alt="Profile Image"/>
  //     <p id="userName"></p>
  //   </div>
  //   <div class="modal-body">
  //     <textarea id="createPost" placeholder="What's happening?" maxlength="150"></textarea>
  //     <section class="buttonsCreate">
  //       <button class="postButtonsCreate" id="close-modal-deletePost">CANCEL</button>
  //       <button class="postButtonsCreate" id="sendPost">POST</button>
  //     </section>
  //   </div>
  // </div>

  container.innerHTML = template;

  const signOutButton = container.querySelector("#signOut");
  const userImage = container.querySelector("#userImage");
  const userName = container.querySelector("#userName");
  const header = container.querySelector(".header");
  const footer = container.querySelector(".footer");
  const userImageHeader = container.querySelector("#userImageHeader");
  const openModalCreatePostButton = container.querySelector("#open-modal-createPost");
  const closeModalCreatePostButton = container.querySelector("#close-modal-createPost");
  const modalCreatePost = container.querySelector("#modal-createPost");
  const fadeCreatePost = container.querySelector("#fade-createPost");
  const allPosts = container.querySelector(".allPosts");
  const sendPostButton = container.querySelector("#sendPost");
  const createPost = container.querySelector("#createPost");
  const closeSendPost = container.querySelector("#sendPost");

  const user = getUserInfo();
  userImage.src = user.photoURL;
  userName.innerHTML = user.displayName;
  userImageHeader.src = user.photoURL;


  const toggleModal = () => {
    modalCreatePost.classList.toggle("hide");
    fadeCreatePost.classList.toggle("hide");
  };

  [
    openModalCreatePostButton,
    closeModalCreatePostButton,
    fadeCreatePost,
    closeSendPost,
  ].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
  });

  sendPostButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (createPost.value !== "") {
      addPost(createPost.value, user.displayName, user.photoURL, user.uid);
      allPosts.innerHTML = ""
      loadPosts()
    }
  });

  const createPostElement = (post) => {
    const postFeed = document.createElement("article");
    postFeed.classList.add("posts");
    const template = `
      <section class="postHeader">
        <section class="postUserInfo">
          <img src="${post.photoURL}" class="userImage">
          <h4 class="nickname">${post.nickname}</h4>
          <p class="timestamp">${calculateTimeAgo(post.data.toDate())}</p>
        </section>  
        ${post.userUID === user.uid ? `
        <button class="postButtons"><img src="./assets/edit.png"></button>
        ` : ""}
      </section>
      <p class="content">${post.content}</p>
      <section class="postFooter">
        <section class="votes">
          <button class="upVoteButton" id="${
            post.docRef
          }"><img src="./assets/upvote.png"></button>
          <p class="countVotes">${post.votes.length}</p>
        </section>
        ${post.userUID === user.uid ? `
        <button class="postButtons"><img src="./assets/remove.png"></button>
        ` : ""}
      </section>
    `;
    postFeed.innerHTML = template;
    allPosts.appendChild(postFeed);
  };

  const votePosts = (docRef) => {
      votePost(docRef, user.uid);
      allPosts.innerHTML = ""
  };

  const createAllPosts = (posts) => {
    createPostElement(posts);
  };

  const loadPosts = async () => {
    getPosts(createAllPosts);
  };

  container.addEventListener("click", (event) => {
    const targetParent = event.target.parentNode;
    if(targetParent.classList.contains("upVoteButton")) {
      const docID = targetParent.id;
      votePosts(docID);
    }
  });

  document.addEventListener("load", loadPosts());

  signOutButton.addEventListener("click", (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        window.location.href = "#login";
      })
  });

  return container;
};
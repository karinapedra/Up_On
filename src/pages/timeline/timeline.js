import { async } from "regenerator-runtime";
import { logOut, getUserInfo, getPosts, addPosts, calculateTimeAgo, voted, unvoted, checkedPosts } from "../../firebase/firebase.js";

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
        <textarea id="createPost" placeholder="What's happening?" maxlength="150"></textarea>
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
  const sendPostButton = container.querySelector("#sendPost");
  const createPost = container.querySelector("#createPost");
  const closeSendPost = container.querySelector("#sendPost");
 
 
  const user = getUserInfo();

  userImagePost.src = user.photoURL;
  userCreatPost.innerHTML = user.displayName;
  footer.style.display = "block";
  header.style.display = "flex";



  const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
  };

  [openModalButton, closeModalButton, fade, closeSendPost].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
  });
 
  sendPostButton.addEventListener("click", (event)=> {
    event.preventDefault();
    if (createPost.value !== "") {
      addPosts(
        createPost.value, 
        user.displayName,
        user.photoURL,
        user.uid,
      )
      .then(()=>{
        showPosts.innerHTML="";
        showPosts();
        createPost.value = "";
      })
      .catch((error)=>{
        console.log(error)});
    }
  })
 

  const createPosts = (post) =>{
    const postFeed = document.createElement("article");
    postFeed.classList.add("posts");
    const template = `
      <section class="postHeader">
        <section class="postUserInfo">
          <img src="${post.photoURL}" class="userImage">
          <h4 class="nickname">${post.nickname}</h4>
          <p class="timestamp">${calculateTimeAgo(post.data.toDate())}</p>
        </section>  
        <button class="postButtons"><img src="./assets/edit.png"></button>
      </section>
      <p class="content">${post.content}</p>
      <section class="postFooter">
        <section class="votes">
          <button class="upVoteButton" id="${post.docRef}"><img src="./assets/upvote.png"></button>
          <p class="countVotes">${post.votes.length}</p>
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
    console.log(posts)
    posts.forEach((post) => {
      const cards = createPosts(post);
      allPosts.appendChild(cards);     
    });  
    voteCounter();
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
  
  const voteCounter=()=>{ 
    const upVoteButton = container.querySelectorAll(".upVoteButton")
    
    upVoteButton.forEach(async(voteButton)=>{
    const allPosts = await getPosts();
    voteButton.addEventListener("click", async (event)=>{
    const docID = event.currentTarget.id
    let post = ""
    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].docRef === docID) {
        post = allPosts[i].votes; // Salva o objeto quando o ID é encontrado
        break; // Você pode interromper o loop, pois já encontrou o objeto
      }
    } 
    if (post.includes(user.uid)) {
      unvoted(docID, user.uid) 
      console.log("unvoted")
      const index = post.indexOf(user.uid);
            if (index !== -1) {
              post.splice(index, 1);
            }
    } else {
      voted(docID, user.uid)
      post.push(user.uid);
      console.log("Voted")
    }
    })
    });
  } 
  return container;
};



// let processingClick = false;
// const buttonLike = postElement.querySelector('#button-like');
// buttonLike.addEventListener('click', async () => {
//   const currentUser = auth.currentUser.displayName;
//   const likesArray = post.likes;

//   if (!processingClick) {
//     processingClick = true;
//     // Caso o usuario já esteja no array de likes, quer dizer que ele já deu like
//     // então vamos tirar ele do array de likes
//     if (likesArray.includes(currentUser)) {
//       await deslikeCounter(post.id, currentUser);
//       // foi removido do array de likes dessa publicação lá no Firebase
//       // mas ainda precisamos tirar o usuario do array que esta na variavel local
//       const index = likesArray.indexOf(currentUser);
//       if (index !== -1) {
//         likesArray.splice(index, 1);
//       }
//       // depois vamos atualizar o campo com o numero de likes
//       textLikeCount.innerHTML = likesArray.length;
//       processingClick = false;
//     } else {
//       await likeCounter(post.id, currentUser);
//       // foi adicionado do array de likes dessa publicação lá no Firebase
//       // mas ainda precisamos adicionar o usuario no array que esta na variavel local
//       likesArray.push(currentUser);
//       textLikeCount.innerHTML = likesArray.length;
//       processingClick = false;
//     }
//   }
// });

import {
  logOut,
  getUserInfo,
  addPost,
  getPosts,
  votePost,
  editPost,
  deletePost,
} from '../../firebase/firebase.js';
import logo from '../../assets/up_on_logo.png';
import signOutImg from '../../assets/signOut.png';
import createImg from '../../assets/create.png';
import upvote from '../../assets/upvote.png';
import edit from '../../assets/edit.png';
import remove from '../../assets/remove.png';

export default () => {
  const container = document.createElement('article');
  container.classList.add('timelineContent');

  const template = `
    <header class='header-timeline'>
      <nav class='menu'>
        <ul class='headerMenu-timeline'>
          <li><img src='' id='userImageHeader' alt='profileImage'></li>
          <li>
            <a href='#timeline' id='logo'>
              <img src='${logo}' alt='up_on_logo' />
            </a>
          </li>
          <li>
            <button class='signOut'>
              <img class='signOutIcon' src='${signOutImg}' alt='Sign Out'>
            </button>
          </li>
        </ul>
    </nav>
    </header>
    <section class='allPosts'></section>
    <button class='createButton' id='open-modal-createPost'><img src='${createImg}'></button>
    `;

  container.innerHTML = template;

  const signOutButton = container.querySelector('.signOut');
  const userImageHeader = container.querySelector('#userImageHeader');
  const allPosts = container.querySelector('.allPosts');
  const openModalCreate = container.querySelector('.createButton');
  const user = getUserInfo();
  userImageHeader.src = user.photoURL;
  const calculateTimeAgo = (date) => {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days${days === 1 ? '' : ''}`;
    }
    if (hours > 0) {
      return `${hours}h${hours === 1 ? '' : ''}`;
    }
    if (minutes > 0) {
      return `${minutes} min${minutes === 1 ? '' : ''}`;
    }
    return `${seconds}s${seconds === 1 ? '' : ''}`;
  };

  const createPostElement = (post) => {
    const articleId = `article-${post.docRef}`;
    let postFeed = document.getElementById(articleId);
    if (postFeed) {
      postFeed.innerHTML = '';
    } else {
      postFeed = document.createElement('article');
      postFeed.id = articleId;
      postFeed.classList.add('posts');
    }
    const templatePost = `
      <section class='postHeader'>
        <section class='postUserInfo'>
          <img src='${post.photoURL}' class='userImage'>
          <h4 class='nickname'>${post.nickname}</h4>
          <p class='timestamp'>${calculateTimeAgo(post.data.toDate())}</p>
        </section>  
        ${post.userUID === user.uid ? `
        <button class='postButtons openModalEdit' data-content='${post.content}' data-id='${post.docRef}'><img src='${edit}'></button>
        ` : ''}
      </section>
      <p class='content'>${post.content}</p>
      <section class='postFooter'>
        <section class='votes'>
          <button class='upVoteButton' data-id='${post.docRef}'><img src='${upvote}'></button>
          <p class='countVotes'>${post.votes.length}</p>
        </section>
        ${post.userUID === user.uid ? `
        <button class='postButtons openModalDelete' data-id='${post.docRef}'><img src='${remove}'></button>
        ` : ''}
      </section>
    `;
    postFeed.innerHTML = templatePost;
    allPosts.appendChild(postFeed);
  };

  const votePosts = (docRef) => {
    votePost(docRef, user.uid);
  };

  const modalCreateEdit = (isNewPost) => {
    const modalContent = `
    <div class='fade-createPost hide'></div>
    <div class='modal-createPost hide'>
      <div class='modal-header'>
        <img src='' class='userImage imgProfile' alt='Profile Image'/>
        <p class='userName'></p>
      </div>
      <div class='modal-body'>
        <textarea class='createPost' placeholder='What's happening?' maxlength='150'></textarea>
        <section class='buttonsCreate'> 
          <button class='postButtonsCreate cancelButton close-modal-createPost' >CANCEL</button>
          ${isNewPost ? '<button class="postButtonsCreate confirmButton sendPost">POST</button>' : '<button class="postButtonsCreate confirmButton sendEditPost">EDIT</button>'}
        </section>
      </div>
    </div>
    `;
    const modalContainer = document.createElement('article');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);
    const modal = modalContainer.querySelector('.modal-createPost');
    const fade = modalContainer.querySelector('.fade-createPost');
    const cancelButton = modalContainer.querySelector('.close-modal-createPost');
    const confirmButton = modalContainer.querySelector('.sendPost');
    const confirmEditButton = modalContainer.querySelector('.sendEditPost');
    const userImage = modalContainer.querySelector('.userImage');
    const userName = modalContainer.querySelector('.userName');
    const inputModal = modalContainer.querySelector('.createPost');

    userImage.src = user.photoURL;
    userName.innerHTML = user.displayName;
    cancelButton.addEventListener('click', () => {
      modal.classList.add('hide');
      fade.classList.add('hide');
    });
    if (confirmButton) {
      return {
        modal, confirmButton, inputModal,
      };
    } return { modal, confirmEditButton, inputModal };
  };

  const modalCreate = modalCreateEdit(true);
  const modalEdit = modalCreateEdit(false);
  const createModalDelete = () => {
    const modalContent = `
      <div id='fade-delete' class='hide'></div>
      <div id='modal-delete' class='modalDelete hide'>
      <section class='modalContent'>  
        <section class='modal-header-delete'>
          <h3>DELETE</h3>
        </section>
        <section class='modal-body-delete'>
          <p>Are you sure? </p>
          <p>Your post will be permanently deleted.</p>
          <section class='buttons-delete'>
            <button class='postButtonsCreate closeModalDelete cancelButton'>CANCEL</button>
            <button class='postButtonsCreate confirmDelete confirmButton'>DELETE</button>
          </section>
        </section>
      </section>
      </div>
    `;

    const modalContainer = document.createElement('article');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);
    const modalDelete = modalContainer.querySelector('.modalDelete');
    const fadeDelete = modalContainer.querySelector('#fade-delete');
    const cancelButton = modalContainer.querySelector('.closeModalDelete');
    const confirmButton = modalContainer.querySelector('.confirmDelete');
    cancelButton.addEventListener('click', () => {
      modalDelete.classList.add('hide');
      fadeDelete.classList.add('hide');
    });
    return { modalDelete, fadeDelete, confirmButton };
  };

  const { modalDelete, confirmButton } = createModalDelete();

  const loadPosts = async () => {
    getPosts(createPostElement);
  };

  container.addEventListener('click', (event) => {
    const targetParent = event.target.parentNode;
    if (targetParent.classList.contains('upVoteButton')) {
      const docID = targetParent.dataset.id;
      votePosts(docID);
    } else if (targetParent.classList.contains('openModalDelete')) {
      modalDelete.classList.remove('hide');
      confirmButton.addEventListener('click', () => {
        const docID = targetParent.dataset.id;
        deletePost(docID);
        modalDelete.classList.add('hide');
      });
    } else if (targetParent.classList.contains('openModalEdit')) {
      modalEdit.modal.classList.remove('hide');
      const docID = targetParent.dataset.id;
      const postContent = targetParent.dataset.content;
      modalEdit.inputModal.value = postContent;
      modalEdit.confirmEditButton.addEventListener('click', () => {
        editPost(docID, modalEdit.inputModal.value);
        modalEdit.modal.classList.add('hide');
      });
    }
  });

  openModalCreate.addEventListener('click', () => {
    modalCreate.modal.classList.remove('hide');
    modalCreate.confirmButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (modalCreate.inputModal.value !== '') {
        addPost(modalCreate.inputModal.value, user.displayName, user.photoURL, user.uid);
        modalCreate.inputModal.value = '';
        modalCreate.modal.classList.add('hide');
      }
    });
  });

  document.addEventListener('load', loadPosts());

  signOutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        window.location.href = '#login';
      });
  });

  return container;
};

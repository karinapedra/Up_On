import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut,
  updateCurrentUser,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, query, onSnapshot, getDocs, addDoc, serverTimestamp, orderBy, updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { app, db } from "../firebase/configFirebase.js";
import { async } from "regenerator-runtime";

const provider = new GoogleAuthProvider();

const auth = () => getAuth(app);

export const checkIfUserIsLogged = () => {
  onAuthStateChanged(auth(), (user) => {
    if (user) {
      window.location.href = "#timeline";
      return user.displayName;
    } else {
      window.location.href = "#login";
    }
  });
};
export const getUserInfo = () => {
  return auth().currentUser;
};
export const createUserEmailAndPassword = async (
  email,
  password,
  nickname,
  icon
) => {
  return createUserWithEmailAndPassword(auth(), email, password)
    .then(() => {
      updateProfile(auth().currentUser, {
        displayName: nickname,
        photoURL: icon,
      });
    })
    .catch((error) => {
      throw error;
    });
};

export const recoverPassword = (email) => {
  sendPasswordResetEmail(auth(), email)
    .then(() => {
      alert("E-mail de redefinição enviado com sucesso!");
    })
    .catch((error) => {
      alert("Ocorreu um erro ao enviar o email de redefinição de senha.");
    });
};

export const loginEmailAndPassword = async (email, password) => {
  return setPersistence(auth(), browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth(), email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const loginGoogle = async () => {
  return signInWithPopup(auth(), provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const logOut = () => {
  signOut(auth())
    .then(() => {
    })
    .catch((error) => {
    });
};

export const getPosts = async () =>{
  const posts = []; 
  const ref = collection(db, "Posts");
  const consultPost = query(ref, orderBy("data","desc"));
  onSnapshot(consultPost, (querySnapshot)=>{
    posts.length = 0;
    querySnapshot.forEach((post)=>{
      const data = post.data();
      data.docRef = post.id;
      posts.push({...post.data()});
    }) 
  })
  // const snapshot = await getDocs(consultPost); 
  // snapshot.forEach((document) =>{
  //   posts.push({ ...document.data(), docRef: document.id});
  // });
  return posts;
}

export const voted = async (docID, userUID) => {
  await updateDoc(doc(db, "Posts", docID), {
  votes: arrayUnion(userUID)
});
}
export const unvoted = async (docID, userUID) => {
  await updateDoc(doc(db, "Posts", docID), {
  votes: arrayRemove(userUID)
});
}
export const addPosts = async (content, nickname, photoURL, userUID) => {
const docRef = await addDoc(collection(db, "Posts"), {
  content: content, 
  nickname: nickname,
  data: serverTimestamp(), 
  photoURL: photoURL,
  userUID: userUID,
  votes: [],
});
}

export const checkedPosts = async (postID)=>{
  const postRef = doc(db, "Posts", postID);
  const postSnapshot = await getDoc(postRef);
  const post = postSnapshot.data();
  return post;
}


export const calculateTimeAgo = (date) => {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} days${days === 1 ? '' : ''}`;
  } if (hours > 0) {
    return `${hours}h${hours === 1 ? '' : ''}`;
  } if (minutes > 0) {
    return `${minutes} min${minutes === 1 ? '' : ''}`;
  }
  return `${seconds}s${seconds === 1 ? '' : ''}`;
};

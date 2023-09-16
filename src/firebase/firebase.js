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
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
} from "firebase/firestore";
import { app, db } from "../firebase/configFirebase.js";
import { async } from "regenerator-runtime";

const auth = () => getAuth(app);

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

export const recoverPassword = (email) => {
  sendPasswordResetEmail(auth(), email)
    .then(() => {
      alert("E-mail de redefinição enviado com sucesso!");
    })
    .catch((error) => {
      alert("Ocorreu um erro ao enviar o email de redefinição de senha.");
    });
};

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth(), provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const checkIfUserIsLogged = () => {
  onAuthStateChanged(auth(), (user) => {
    if (user) {
      window.location.href = "#timeline";
    } else {
      window.location.href = "#login";
    }
  });
};

export const getUserInfo = () => {
  return auth().currentUser;
};

export const logOut = () => {
  signOut(auth());
};

export const addPost = async (content, nickname, photoURL, userUID) => {
  await addDoc(collection(db, "Posts"), {
    content: content,
    nickname: nickname,
    data: serverTimestamp(),
    photoURL: photoURL,
    userUID: userUID,
    votes: [],
  });
};

export const getPosts = (createAllPosts) => {
  const ref = collection(db, "Posts");
  const consultPost = query(ref, orderBy("data", "desc"));
  onSnapshot(consultPost, (querySnapshot) => {
    querySnapshot.docs.forEach((post) => {
      const data = post.data();
      data.docRef = post.id;
      createAllPosts(data);
    });
  });
};

export const votePost = (docID, userUID) => {
  const q = doc(db, "Posts", docID);
  onSnapshot(q, async (querySnapshot) => {
    const data = querySnapshot.data();
    const votes = data.votes;
    if (votes.includes(userUID)) {
      await updateDoc(doc(db, "Posts", docID), {
        votes: arrayRemove(userUID),
      });
    } else {
      await updateDoc(doc(db, "Posts", docID), {
        votes: arrayUnion(userUID),
      });
    }
  });
};

export const calculateTimeAgo = (date) => {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} days${days === 1 ? "" : ""}`;
  }
  if (hours > 0) {
    return `${hours}h${hours === 1 ? "" : ""}`;
  }
  if (minutes > 0) {
    return `${minutes} min${minutes === 1 ? "" : ""}`;
  }
  return `${seconds}s${seconds === 1 ? "" : ""}`;
};

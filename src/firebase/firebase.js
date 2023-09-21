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
} from 'firebase/auth';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  updateDoc,
  deleteDoc,
  arrayUnion,
  doc,
  arrayRemove,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { app } from './configFirebase.js';

export const db = getFirestore(app);
const auth = () => getAuth(app);

export const createUserEmailAndPassword = async (
  email,
  password,
  nickname,
  icon,
) => createUserWithEmailAndPassword(auth(), email, password)
  .then(() => {
    updateProfile(auth().currentUser, {
      displayName: nickname,
      photoURL: icon,
    });
  })
  .catch((error) => {
    throw error;
  });

export const loginEmailAndPassword = async (email, password) => {
  setPersistence(auth(), browserLocalPersistence);
  await signInWithEmailAndPassword(auth(), email, password);
};

export const recoverPassword = (email) => {
  sendPasswordResetEmail(auth(), email);
};

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth(), provider);
};

export const checkIfUserIsLogged = () => {
  onAuthStateChanged(auth(), (user) => {
    if (user) {
      window.location.href = '#timeline';
    } else {
      window.location.href = '#login';
    }
  });
};

export const getUserInfo = () => auth().currentUser;

export const logOut = () => {
  signOut(auth());
};

export const addPost = async (postContent, userNickname, userPhotoURL, useruid) => {
  await addDoc(collection(db, 'Posts'), {
    content: postContent,
    nickname: userNickname,
    data: serverTimestamp(),
    photoURL: userPhotoURL,
    userUID: useruid,
    votes: [],
  });
};

export const getPosts = (createPost) => {
  const ref = collection(db, 'Posts');
  const consultPost = query(ref, orderBy('data', 'desc'));
  onSnapshot(consultPost, (querySnapshot) => {
    querySnapshot.docs.forEach((post) => {
      const data = post.data();
      data.docRef = post.id;
      createPost(data);
    });
  });
};

export const votePost = async (docID, userUID) => {
  const q = doc(db, 'Posts', docID);
  const docSnap = await getDoc(q);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const votes = data.votes;
    if (votes.includes(userUID)) {
      await updateDoc(doc(db, 'Posts', docID), {
        votes: arrayRemove(userUID),
      });
    } else {
      await updateDoc(doc(db, 'Posts', docID), {
        votes: arrayUnion(userUID),
      });
    }
  }
};

export const editPost = async (docRef, newContent) => {
  await updateDoc(doc(db, 'Posts', docRef), {
    content: newContent,
  });
};

export const deletePost = async (docRef) => {
  await deleteDoc(doc(db, 'Posts', docRef));
};

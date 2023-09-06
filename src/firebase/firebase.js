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
  updateProfile

} from "firebase/auth";
import { app } from "../firebase/configFirebase.js";

const provider = new GoogleAuthProvider();

const auth = () => getAuth(app);
//const user = auth().currentUser;

export const checkIfUserIsLogged = () => {
 onAuthStateChanged(auth(), (user) => {
  if (user) {
    console.log(user);
    window.location.href = "#timeline";
    const uid = user.uid;
  
  } else {
    window.location.href = "#login";
  }
})
};

export const createUserEmailAndPassword = async (email, password, nickname, icon) => {
    return createUserWithEmailAndPassword(auth(), email, password)
    .then(()=>{
      updateProfile(auth().currentUser, {
        displayName: nickname, photoURL: icon 
      })
    })
    .catch((error)=> {
    throw error;
  })
};

export const loginEmailAndPassword = async (email, password) => {
  return setPersistence(auth(), browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth(), email, password)
        .then((userCredential) => {
          const user = userCredential.user
        })
        .catch((error) => {
          throw error;
        })
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
      console.log("google aqui");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const logOut = () => {
signOut(auth())
.then(()=> {
  console.log("Deu certo");
})
.catch((error)=> {
  console.log("erro" + error)
});
}
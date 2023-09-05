import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { app } from "../firebase/configFirebase.js";

const provider = new GoogleAuthProvider();

const auth = () => getAuth(app);

export const createUserEmailAndPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth(), email, password)
    console.log("ok");
  } catch (error) {
    throw error;
  }
};

export const loginEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth(), email, password);
    console.log("User logged in");
  } catch (error) {
    throw error;
  }
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

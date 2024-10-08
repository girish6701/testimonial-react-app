import {
  getAuth,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";

export function signinWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      const extra = getAdditionalUserInfo(result);
      console.log(extra);
      console.log(user.displayName);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      toast(errorMessage);
    });
}

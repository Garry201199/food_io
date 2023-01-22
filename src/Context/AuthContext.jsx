import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../firebase.config";
import useAuthStatus from "../Hooks/useAuthStatus";

const AuthContext = createContext();

export const AuthcontextProvider = ({ children }) => {

  const auth = getAuth(app);
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [useDefaultCredentials, setuseDefaultCredentials] = useState(false);

  const {  currentUser,loggedIn, checkingStatus } = useAuthStatus()

  const handleFormInfo = (e) => {
    setLoginInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const onLogin = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success(`${currentUser.displayName ?? email } logged in !!  `);

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  const onSignUp = (auth, name , email, password) => {
    createUserWithEmailAndPassword(auth,  email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/login");
        toast.success(`${name} Signed Up !!, Redirecting to Login Page `);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const onlogOut=()=>{
    signOut(auth).
    then(() => {
      toast.warn(`${currentUser.displayName ?? currentUser.email } logged out !!  `);
      navigate('/login')
    }).catch((error) => {
      toast.warn(error);
    });
   }

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        toast.success(`${currentUser.displayName } logged in !!  `);
        navigate("/");
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  const forgotPassword=(email)=>{
    sendPasswordResetEmail(auth, email,{url:'http://localhost:3000/login'})
  .then(() => {
    toast.info(`Password reset link sent to ${email}`)
    setTimeout(() => {
      navigate('/login')
    }, 2000);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(`${error} not found`)
  });
  }
  return (
    <AuthContext.Provider
      value={{
        onLogin,
        setuseDefaultCredentials,
        handleFormInfo,
        useDefaultCredentials,
        loginInfo,
        onGoogleLogin,
        setLoginInfo,
        onSignUp,
        currentUser,
        onlogOut,
        forgotPassword,
        loggedIn, checkingStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

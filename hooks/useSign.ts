import { auth } from "./../fb/index";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";

const useSign = () => {
  const [error, setError] = useState<Error>();
  const [status, setStatus] = useState<"loggedIn" | "notLoggedIn">(
    "notLoggedIn"
  );

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setStatus("loggedIn");
      }
    });
  }, []);

  const SignIn = async ({
    mail,
    password,
  }: {
    mail: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(auth, mail, password);
      setStatus("loggedIn");
    } catch (error) {
      console.error(error);
      let err;
      switch ((error as any).code) {
        case "auth/wrong-password":
          err = new Error("Şifrə yanlışdır");
          break;
        case "auth/user-not-found":
          err = new Error("Belə bir istifadəçi yoxdur");
          break;
        default:
          err = new Error("Nəsə düz getmədi");
      }
      setError(err);
    }
  };

  const SignUp = async ({
    mail,
    password,
  }: {
    mail: string;
    password: string;
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, mail, password);
      setStatus("loggedIn");
    } catch (error) {
      console.error(error);
      let err;
      switch ((error as any).code) {
        case "auth/email-already-in-use":
          err = new Error("Bu mail ilə yaradılmış hesab mövcuddur");
          break;
        default:
          err = new Error("Nəsə düz getmədi");
      }
      setError(err);
    }
  };

  return { SignIn, SignUp, error, status };
};

export default useSign;

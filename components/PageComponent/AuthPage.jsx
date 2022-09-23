import React from "react";
import { auth } from "../../config/firebase.config";
import {
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";

const AuthPage = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [Login] = useSignInWithGithub(auth);
  return (
    <>
      <div className="border border-white h-64 flex max-w-lg m-auto justify-center items-center">
        <div>
          <button
            onClick={() => signInWithGoogle()}
            className="w-full mb-3 bg-gray-50 py-4 font-medium rounded-md text-gray-700"
          >
            Login with Google
          </button>
          <button
            onClick={() => Login()}
            className=" w-full bg-gray-50 py-4 rounded-md font-medium text-gray-700"
          >
            Login with Github
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthPage;

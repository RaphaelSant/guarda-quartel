import { getAuth } from "firebase/auth";
import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import "../HomePage/homepage.css";

import logo from "../../Components/Assets/Logo.png";
import estilo from "./Login.module.css";

export default function Login() {
  const app = iniciarFirestoreDb();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  /*
  function fazLogin() {
    return signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      await fazLogin();

      if (user) {
        window.location.href = "/homePage";
      }
    } catch (error) {
      console.error(error);
    }
  }
  */

  async function handleSignIn(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        window.location.href = "/homePage";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  if (error) {
    console.log(error.message);
  }
  if (user) {
    console.log(user);
  }

  if (loading) {
    //console.log(loading);
  }
  return (
    <>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${estilo.container_login}`}
      >
        <h1 className="mb-3">Sistema de Registro Eletrônico</h1>
        <img src={logo} alt="Logo Pel Com" className={estilo.logo_login} />
        <p className="mt-1">17° Pelotão de Comunicações de Selva</p>
        <form>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="teste@teste.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-2">
            <label htmlFor="email">Senha</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100" onClick={handleSignIn}>
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}

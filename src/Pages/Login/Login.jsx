import { getAuth } from "firebase/auth";
import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from "react";
import "../HomePage/homepage.css";

import logo from "../../Components/Assets/Logo.png";
import estilo from "./Login.module.css";

const app = iniciarFirestoreDb();
const auth = getAuth(app);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    /*
    function handleSignIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
        validate(user);
    }
    */

    function handleSignIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(email, password).then(response => {
            window.location.href = "/homePage";
        }).catch(error => {
            console.error(error);
        });
    }

    if (loading) {
        return (
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }
    if (user) {
        console.log(user);
    }
    if (error) {
        // alert('Credenciais Inválidas');
    }

    return (
        <>

            <div className={`d-flex flex-column justify-content-center align-items-center ${estilo.container_login}`}>
                <h1 className="mb-3">Sistema de Registro Eletrônico</h1>
                <img src={logo} alt="Logo Pel Com" className={estilo.logo_login} />
                <p className="mt-1">17° Pelotão de Comunicações de Selva</p>
                <form>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input className="form-control" type="email" name="email" id="email" placeholder="teste@teste.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mt-2 mb-2">
                        <label htmlFor="email">Senha</label>
                        <input className="form-control" type="password" name="password" id="password" placeholder="t**********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-success w-100" onClick={handleSignIn}>
                        Entrar
                    </button>
                </form>
            </div>

        </>
    );
}
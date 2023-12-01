import { getAuth } from "firebase/auth";
import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from "react";


const app = iniciarFirestoreDb();
const auth = getAuth(app);

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    function handleSignIn(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);
    }

    if(loading) {
        return <p>Carregando...</p>
    }

    return (
        <>
            <form>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="teste@teste.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Senha</label>
                    <input type="password" name="password" id="password" placeholder="t**********" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </form>
            <div className="App">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bnt" onClick={handleSignIn}>
                    Entrar
                </button>
            </div>
        </>
    );
}
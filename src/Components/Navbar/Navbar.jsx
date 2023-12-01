import React from "react";

import { getAuth, signOut } from "firebase/auth";
import iniciarFirestoreDb from "../../Pages/FirestoreConfig/firestoreConfig";

import logoNav from './assets/LogoNavbar.png';
import { Link } from "react-router-dom";
import Manual from "../Assets/Manual do Sistema Eletrônico de Registro de Acesso para Quartéis Militares.pdf";

export default function Navbar() {
    const app = iniciarFirestoreDb();

    function LogOut() {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            console.log('Sucesso') // Sign-out foi um sucesso. 
            window.location.replace("/");
        }).catch((error) => {
            console.log(error)// Erro.
        });
    }

    return <nav className="navbar navbar-expand bg-body-tertiary shadow d-print-none">
        <div className="container">
            <Link className="navbar-brand" to="/homePage">
                <img src={logoNav} alt="Logo 17 PelCom" width='30' />
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item d-flex">
                        <a target="_blank" className="nav-link" href={Manual} rel="noreferrer"><i className="fa-solid fa-book"></i> Manual</a>
                        <button className="btn" onClick={LogOut}><i class="fa-solid fa-power-off"></i> Sair</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}
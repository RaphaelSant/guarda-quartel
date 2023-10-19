import React from "react";

import logoNav from './assets/LogoNavbar.png';
import { Link } from "react-router-dom";

export default function Navbar() {
    return <nav className="navbar navbar-expand bg-body-tertiary shadow d-print-none">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src={logoNav} alt="Logo 17 PelCom" width='30' />
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a target="_blank" className="nav-link" href="www.google.com">Sair</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}
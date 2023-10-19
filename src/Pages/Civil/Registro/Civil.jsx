import React, { useEffect, useState } from "react";
import { NovoRegistro, PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import "./novocivil.css";

/*FIREBASE CONFIG*/
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";

const firebasApp = {
    apiKey: "AIzaSyA3lRP5q3hjFWAJ076FHb2VpHVwVsMZAMA",
    authDomain: "army-guard.firebaseapp.com",
    projectId: "army-guard",
    storageBucket: "army-guard.appspot.com",
    messagingSenderId: "873158697255",
    appId: "1:873158697255:web:a42515442d445145820902"
};

// Initialize Firebase
initializeApp(firebasApp);


export default function RegistroCivil() {
    const [civis, setCivis] = useState([]);

    const db = getFirestore();
    const civisCollectionRef = collection(db, "es_civis");

    useEffect(() => {
        const getCivis = async () => {
            const data = await getDocs(civisCollectionRef)
            setCivis(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getCivis();
    }, []);

    async function deleteCivil(id) {
        const civilDoc = doc(db, "es_civis", id);
        await deleteDoc(civilDoc);
        alert('Registro deletado');
        window.location.reload();
    }

    return <>
        <Navbar />
        <h5 className="mt-4 mb-4 text-center">Civil &gt; <strong style={{ color: '#008BD2' }}>Registro</strong></h5>
        <div className="text-center mb-4">
            <NovoRegistro link="/civis/civil/novoRegistro" titulo="Novo Registro" />
            <PaginaInicial link="/" titulo="Página Inicial" />
        </div>
        <div className="container">
            <table className="table text-center table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Saida</th>
                        <th scope="col">Destino</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {civis.map((civis) => {
                        let id = civis.id
                        return (
                            <tr key={civis.id}>
                                <td>{civis.nome}</td>
                                <td>{civis.cpf}</td>
                                <td>{civis.horarioChegada}</td>
                                <td>{civis.horarioSaida}</td>
                                <td>{civis.destino}</td>
                                <td className="d-flex justify-content-center gap-3">
                                    <div>
                                        <Link to={"/civis/civil/editarRegistro/"+id} ><button className="bnt-acao"><i className="fa-solid fa-pen-to-square fa-lg text-warning"></i></button></Link>
                                    </div>
                                    <div>
                                        <button className="bnt-acao" onClick={() => deleteCivil(civis.id)}><i className="fa-solid fa-trash fa-lg text-danger"></i></button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    </>
}
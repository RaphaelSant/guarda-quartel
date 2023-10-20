import React, { useEffect, useState } from "react";
import { NovoRegistro, PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import "./novocivil.css";
import ministerioLogo from "../../Assets/ministerio-logo.jpg";

/*FIREBASE CONFIG*/
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig.ts";

import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
} from "firebase/firestore";

import { Link } from "react-router-dom";

export default function RegistroCivil() {
    const [civis, setCivis] = useState([]);

    // Obter os dados dos civis no banco de dados e "setando" na useState civis
    const getCivis = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const civisCollectionRef = collection(db, "es_civis");
        try {
            const data = await getDocs(civisCollectionRef);
            const civisData = data.docs.map((civiDoc) => ({
                ...civiDoc.data(),
                id: civiDoc.id,
            }));
            setCivis(civisData);
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
        }
    };

    // Hook para executar a função getCivis() apenas uma vez, não sobrecarregando (leitura) no firestore.
    useEffect(() => {
        try {
            getCivis();
            console.log("Leitura do banco realizada");
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Função chamada pelo icone "trash" para deletar uma linha da tabela do banco
    const deleteCivil = async (id) => {
        iniciarFirestoreDb();
        const db = getFirestore();
        try {
            const civilDoc = doc(db, "es_civis", id);
            await deleteDoc(civilDoc);
            setCivis(civis.filter((civi) => civi.id !== id)); // Atualize o estado local, excluindo o item
            alert("Registro deletado");
        } catch (error) {
            console.error("Erro ao excluir registro:", error);
        }
    };

    // Capturando a data do sistema
    const dateHoje = new Date(Date.now()).toLocaleString().split(',')[0];
    let ontem = new Date().setHours(-1);
    ontem = new Date(ontem); // o comando setHours devolve a data em milisegundos
    const dataOntem = ontem.toLocaleDateString('pt-BR');

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-4 text-center d-print-none">
                Civil &gt; <strong style={{ color: "#008BD2" }}>Registro</strong>
            </h5>
            <div className="text-center mb-4 d-print-none">
                <NovoRegistro link="/civis/civil/novoRegistro" titulo="Novo Registro" />
                <PaginaInicial link="/" titulo="Página Inicial" />
            </div>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <img
                    src={ministerioLogo}
                    width={"100px"}
                    alt="sdasd"
                    className="d-none d-print-block"
                />
                <div className="d-none d-print-block text-center">
                    <p>
                        <b>
                            Ministério da Defesa
                            <br />
                            Exército Brasileiro
                            <br />
                            17° Pelotão de Comunicação de Selva
                        </b>
                    </p>

                    <p>Entrada e Saída de Civis do Dia {dataOntem}.</p>
                </div>

                <table className="table text-center table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saida</th>
                            <th scope="col">Destino</th>
                            <th scope="col" className="d-print-none">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {civis.map((civis) => {
                            let id = civis.id;
                            return (
                                <tr key={civis.id} className="align-middle">
                                    <td>{civis.nome}</td>
                                    <td>{civis.cpf}</td>
                                    <td>{civis.horarioChegada}</td>
                                    <td>{civis.horarioSaida}</td>
                                    <td>{civis.destino}</td>
                                    <td className="d-print-none">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div>
                                                <Link to={"/civis/civil/editarRegistro/" + id}>
                                                    <button className="bnt-acao">
                                                        <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
                                                    </button>
                                                </Link>
                                            </div>
                                            <div>
                                                <button
                                                    className="bnt-acao"
                                                    onClick={() => deleteCivil(civis.id)}
                                                >
                                                    <i className="fa-solid fa-trash fa-lg text-danger"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button
                    className="btn btn-primary d-print-none"
                    onClick={() => window.print()}
                >
                    <i className="fa-solid fa-print me-2"></i>Imprimir
                </button>
                <div className="d-none d-print-block text-center">
                    <p>Quartel em Porto Velho - RO, {dateHoje}.</p>
                    <div className="underline mt-5"></div>
                    <p>Permanência 17º Pel Com Sl</p>
                </div>
            </div>
        </>
    );
}
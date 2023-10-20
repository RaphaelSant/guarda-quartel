import React, { useEffect, useState } from "react";
import { NovoRegistro, PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig.ts";
import { collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./veiculoscivil.css";

import ImpressaoHeader from "../../../Components/Impressao/ImpressaoHeader";


export default function VeiculoCivil() {

    const [veiculosCivis, setVeiculosCivis] = useState([]);

    // Obter os dados dos civis no banco de dados e "setando" na useState civis
    const getVeiculosCivis = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const veiculosCivisCollectionRef = collection(db, "es_veiculos_civis");
        try {
            //const data = await getDocs(veiculosCivisCollectionRef);
            const data = await getDocs(query(veiculosCivisCollectionRef, orderBy("horarioEntrada")));
            const veiculosCivisData = data.docs.map((civiDoc) => ({
                ...civiDoc.data(),
                id: civiDoc.id,
            }));
            setVeiculosCivis(veiculosCivisData);
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
        }
    };

    // Hook para executar a função getVeiculosCivis() apenas uma vez, não sobrecarregando (leitura) no firestore.
    useEffect(() => {
        try {
            getVeiculosCivis();
            console.log("Leitura do banco realizada");
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Função chamada pelo icone "trash" para deletar uma linha da tabela do banco
    const deleteVeiculoCivil = async (id) => {
        iniciarFirestoreDb();
        const db = getFirestore();
        try {
            const veiculoCivilDoc = doc(db, "es_veiculos_civis", id);
            await deleteDoc(veiculoCivilDoc);
            setVeiculosCivis(veiculosCivis.filter((civi) => civi.id !== id)); // Atualiza o estado local, excluindo o item
            alert("Registro deletado");
        } catch (error) {
            console.error("Erro ao excluir registro:", error);
        }
    };

    // Capturando a data do sistema
    const dateHoje = new Date(Date.now()).toLocaleString().split(',')[0];

    return <>
        <Navbar />
        <h5 className="mt-4 mb-4 text-center d-print-none">Civil &gt; <strong style={{ color: '#008BD2' }}>Veículo</strong></h5>
        <div className="text-center mb-4 d-print-none">
            <NovoRegistro link="/civis/veiculoCivil/novoRegistro" titulo="Novo Registro" />
            <PaginaInicial link="/" titulo="Página Inicial" />
        </div>
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <ImpressaoHeader titulo="Entrada e Saída de Veículos Civis" />
            <table className="table text-center table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CNH</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Saída</th>
                        <th scope="col">Destino</th>
                        <th scope="col" className="d-print-none">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {veiculosCivis.map((veiculosCivis) => {
                        let id = veiculosCivis.id;
                        return (
                            <tr key={veiculosCivis.id} className="align-middle">
                                <td>{veiculosCivis.nome}</td>
                                <td>{veiculosCivis.cnh}</td>
                                <td>{veiculosCivis.placa}</td>
                                <td>{veiculosCivis.horarioEntrada}</td>
                                <td>{veiculosCivis.horarioSaida}</td>
                                <td>{veiculosCivis.destino}</td>
                                <td className="d-print-none">
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <div>
                                            <Link to={"/civis/veiculoCivil/editarRegistro/" + id}>
                                                <button className="bnt-acao">
                                                    <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
                                                </button>
                                            </Link>
                                        </div>
                                        <div>
                                            <button
                                                className="bnt-acao"
                                                onClick={() => deleteVeiculoCivil(veiculosCivis.id)}
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
                className="mt-2 btn btn-lg btn-primary d-print-none"
                onClick={() => window.print()}
            >
                <i className="fa-solid fa-print me-2"></i>Imprimir
            </button>
            <div className="d-none d-print-block text-center">
                <p>Quartel em Porto Velho - RO, {dateHoje}.</p>
                <div className="underline mt-5"></div>
                <p>Permanência 17º Pel Com Sl</p>
            </div>
        </div >
    </>
}
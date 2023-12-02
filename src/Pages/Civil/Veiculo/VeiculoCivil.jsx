import React, { useEffect, useState } from "react";
import { Imprimir, NovoRegistro, PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import { collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

/* CSS */
import estiloImpressao from "../../CSS/PrintPortrait.module.css";
import "../../CSS/estiloTabela.css";

import ImpressaoHeader from "../../../Components/Impressao/ImpressaoHeader";
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";


export default function VeiculoCivil() {

    const [veiculosCivis, setVeiculosCivis] = useState([]);

    // Obter os dados dos civis no banco de dados e "setando" na useState civis
    const getVeiculosCivis = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const veiculosCivisCollectionRef = collection(db, "es_veiculos_civis");
        try {
            //const data = await getDocs(veiculosCivisCollectionRef);
            const data = await getDocs(query(veiculosCivisCollectionRef, orderBy("dataEntrada"), orderBy("horarioEntrada")));
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

    // Antes da função deleteVeiculoCivil() for executada, será solicitado ao usuário uma confirmação
    const deleteCivilVeiculoConfirmacao = (id, nome, cpf) => {
        const shouldDelete = window.confirm(
            `Tem certeza de que deseja excluir este registro? Nome: ${nome} CNH: ${cpf}`
        ); // Exibe um diálogo de confirmação

        if (shouldDelete) {
            deleteVeiculoCivil(id); // Chama a função de exclusão se o usuário confirmar
        }
    };

    // Capturando a data do sistema
    const dateHoje = new Date(Date.now()).toLocaleString().split(',')[0];

    return <>
        <Navbar />
        <h5 className="mt-4 mb-0 text-center d-print-none">Civil &gt; <strong style={{ color: '#008BD2' }}>Veículo</strong></h5>
        <p className="text-center d-print-none">Entrada e Saída de Veículos Civis</p>
        <div className="text-center mb-4 d-print-none">
            <PaginaInicial link="/" titulo="Página Inicial" />
            <NovoRegistro link="/civis/veiculoCivil/novoRegistro" titulo="Novo Registro" />
        </div>
        <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
            <ImpressaoHeader titulo="Entrada e Saída de Veículos Civis" />
            <table className="table text-center table-bordered border-dark-subtle table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CNH</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Data</th>
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
                                <td>{veiculosCivis.dataEntrada}</td>
                                <td>{veiculosCivis.horarioEntrada}</td>
                                <td className={`${veiculosCivis.horarioSaida === "OM" ? 'bg-danger text-white fw-bold' : ''}`}>{veiculosCivis.horarioSaida}</td>
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
                                                onClick={() => deleteCivilVeiculoConfirmacao(veiculosCivis.id, veiculosCivis.nome, veiculosCivis.cnh)}
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
            <Imprimir impressao="retrato"/>
            <div className="d-none d-print-block text-center">
                <p>Quartel em Porto Velho - RO, {dateHoje}.</p>
                <div className="underline mt-5"></div>
                <p>Permanência 17º Pel Com Sl</p>
            </div>
        </div >
    </>
}
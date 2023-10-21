import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    Imprimir,
    NovoRegistro,
    PaginaInicial,
} from "../../../../Components/Button/Button";
import Navbar from "../../../../Components/Navbar/Navbar";

/*FIREBASE CONFIG*/
import iniciarFirestoreDb from "../../../FirestoreConfig/firestoreConfig";

import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import ImpressaoHeader from "../../../../Components/Impressao/ImpressaoHeader";
import ImpressaoFooter from "../../../../Components/Impressao/ImpressaoFooter";

export default function DuranteExpediente() {
    const [militares, setMilitares] = useState([]);

    // Obter os dados dos civis no banco de dados e "setando" na useState civis
    const getCivis = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const civisCollectionRef = collection(db, "es_mil_durante_expediente");
        try {
            //const data = await getDocs(civisCollectionRef);
            const data = await getDocs(
                query(
                    civisCollectionRef,
                    orderBy("dataEntrada"),
                    orderBy("horarioEntrada")
                )
            );
            const militarData = data.docs.map((militarDoc) => ({
                ...militarDoc.data(),
                id: militarDoc.id,
            }));
            setMilitares(militarData);
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
    const deleteMilitar = async (id) => {
        iniciarFirestoreDb();
        const db = getFirestore();
        try {
            const militarlDoc = doc(db, "es_mil_durante_expediente", id);
            await deleteDoc(militarlDoc);
            setMilitares(militares.filter((militar) => militar.id !== id)); // Atualize o estado local, excluindo o item
            alert("Registro deletado");
        } catch (error) {
            console.error("Erro ao excluir registro:", error);
        }
    };

    const deleteMilitarConfirmacao = (id, nome, postoGraduacao) => {
        const shouldDelete = window.confirm(
            `Tem certeza de que deseja excluir este registro? PG: ${postoGraduacao} Nome: ${nome}`
        ); // Exibe um diálogo de confirmação

        if (shouldDelete) {
            deleteMilitar(id); // Chama a função de exclusão se o usuário confirmar
        }
    };

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center d-print-none">
                Militares &gt; <strong style={{ color: "#008BD2" }}>Durante o expediente</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE MILITARES DURANTE HORÁRIO DE EXPEDIENTE</p>
            <div className="text-center mb-4 d-print-none">
                <PaginaInicial link="/" titulo="Página Inicial" />
                <NovoRegistro link="/militares/duranteExpediente/novoRegistro" titulo="Novo Registro" />
            </div>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <ImpressaoHeader titulo="ENTRADA E SAÍDA DE MILITARES DURANTE HORÁRIO DE EXPEDIENTE" />

                <table className="table text-center table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">PG</th>
                            <th scope="col">Nome Guerra</th>
                            <th scope="col">Idt Mil</th>
                            <th scope="col">OM</th>
                            <th scope="col">Data</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Origem</th>
                            <th scope="col" className="d-print-none">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {militares.map((militar) => {
                            let id = militar.id;
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td>{militar.pg}</td>
                                    <td>{militar.nomeGuerra}</td>
                                    <td>{militar.idtMilitar}</td>
                                    <td>{militar.om}</td>
                                    <td>{militar.dataEntrada}</td>
                                    <td>{militar.horarioEntrada}</td>
                                    <td className={`${militar.horarioSaida === "OM" ? 'bg-danger text-white fw-bold' : ''}`}>{militar.horarioSaida}</td>
                                    <td>{militar.origem}</td>
                                    <td className="d-print-none">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div>
                                                <Link to={"/militares/duranteExpediente/editarRegistro/" + id}>
                                                    <button className="bnt-acao">
                                                        <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
                                                    </button>
                                                </Link>
                                            </div>
                                            <div>
                                                <button
                                                    className="bnt-acao"
                                                    onClick={() => deleteMilitarConfirmacao(id, militar.nomeGuerra, militar.pg)}
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
                <Imprimir />
                <ImpressaoFooter />
            </div>
        </>
    );
}

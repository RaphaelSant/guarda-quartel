import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    Imprimir,
    NovoRegistro,
    PaginaInicial,
} from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

/*CSS*/
import estiloImpressao from "../../CSS/PrintLandscape.module.css";

/*FIREBASE CONFIG*/
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";

import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import ImpressaoHeader from "../../../Components/Impressao/ImpressaoHeader";
import ImpressaoFooter from "../../../Components/Impressao/ImpressaoFooter";

export default function ViaturasOutraOm() {
    const [viaturas, setViaturas] = useState([]);

    // Obter os dados das viaturas de outras Oms no banco de dados e "setar" na useState viaturas
    const getViaturas = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const viaturasCollectionRef = collection(db, "es_vtr_outros_quarteis");
        try {
            const data = await getDocs(query(viaturasCollectionRef, orderBy("horarioEntrada")));
            const viaturaData = data.docs.map((viaturaDoc) => ({
                ...viaturaDoc.data(),
                id: viaturaDoc.id,
            }));
            setViaturas(viaturaData);
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
        }
    };

    // Hook para executar a função getViaturas() apenas uma vez, não sobrecarregando (leitura) no firestore.
    useEffect(() => {
        try {
            getViaturas();
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Função chamada pelo icone "trash" para deletar uma linha da tabela do banco
    const deleteViatura = async (id) => {
        iniciarFirestoreDb();
        const db = getFirestore();
        try {
            const viaturalDoc = doc(db, "es_vtr_outros_quarteis", id);
            await deleteDoc(viaturalDoc);
            setViaturas(viaturas.filter((viatura) => viatura.id !== id)); // Atualize o estado local, excluindo o item
            alert("Registro deletado");
        } catch (error) {
            console.error("Erro ao excluir registro:", error);
        }
    };

    const deleteViaturaConfirmacao = (id, vtrOm, motorista) => {
        const shouldDelete = window.confirm(
            `Tem certeza de que deseja excluir este registro? VtrOm: ${vtrOm} Motorista: ${motorista}`
        ); // Exibe um diálogo de confirmação

        if (shouldDelete) {
            deleteViatura(id); // Chama a função de exclusão se o usuário confirmar
        }
    };

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center d-print-none">
                Militares &gt; <strong style={{ color: "#008BD2" }}>Viaturas de Outras OMs</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE VIATURAS DE OUTROS QUARTÉIS</p>
            <div className="text-center mb-4 d-print-none">
                <PaginaInicial link="/" titulo="Página Inicial" />
                <NovoRegistro link="/militares/viaturasDeOutrasOms/novoRegistro" titulo="Novo Registro" />
            </div>
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="ENTRADA E SAÍDA DE VIATURAS DE OUTROS QUARTÉIS" />

                <table className="table text-center table-bordered border-dark-subtle table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col" rowSpan={'2'}>Vtr - OM</th>
                            <th scope="col" rowSpan={'2'}>Motorista</th>
                            <th scope="col" colSpan={'2'}>Horário</th>
                            <th scope="col" rowSpan={'2'}>Chefe de Vtr / Acompanhante</th>
                            <th scope="col" rowSpan={'2'}>Destino</th>
                            <th scope="col" rowSpan={'2'} className="d-print-none align-middle">
                                Ação
                            </th>
                        </tr>
                        <tr className="align-middle">
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                        </tr>
                    </thead>

                    <tbody>
                        {viaturas.map((viaturas) => {
                            let id = viaturas.id;
                            return (
                                <tr key={viaturas.id} className="align-middle">
                                    <td>{viaturas.vtrOm}</td>
                                    <td>{viaturas.motorista}</td>
                                    <td>{viaturas.horarioEntrada}</td>
                                    <td className={`${viaturas.horarioSaida === "OM" ? 'bg-danger text-white fw-bold' : ''}`}>{viaturas.horarioSaida}</td>
                                    <td>{viaturas.chefeVtr}</td>
                                    <td>{viaturas.destino}</td>
                                    <td className="d-print-none">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div>
                                                <Link to={"/militares/viaturasDeOutrasOms/editarRegistro/" + id}>
                                                    <button className="bnt-acao">
                                                        <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
                                                    </button>
                                                </Link>
                                            </div>
                                            <div>
                                                <button
                                                    className="bnt-acao"
                                                    onClick={() => deleteViaturaConfirmacao(id, viaturas.vtrOm, viaturas.motorista)}
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
                <Imprimir impressao="paisagem"/>
                <ImpressaoFooter />
            </div>
        </>
    );
}

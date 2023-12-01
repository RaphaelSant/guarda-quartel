import React, { useEffect, useState } from "react";
import {
    Imprimir,
    Voltar,
} from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

/*CSS*/
import estiloImpressao from "../../CSS/PrintLandscape.module.css";

/*FIREBASE CONFIG*/
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";

import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import ImpressaoHeader from "../../../Components/Impressao/ImpressaoHeader";
import ImpressaoFooter from "../../../Components/Impressao/ImpressaoFooter";

export default function BkDuranteExpediente() {
    const [militares, setMilitares] = useState([]);

    // Obter os dados dos civis no banco de dados e "setando" na useState civis
    const getCivis = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const civisCollectionRef = collection(db, "bk_es_mil_durante_expediente");
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

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center d-print-none">
                <strong style={{ color: "#008BD2" }}>Registros do serviço anterior</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE MILITARES DURANTE HORÁRIO DE EXPEDIENTE</p>
            <div className="text-center mb-4 d-print-none">
                <Voltar link="/relatorio/servicoAnterior/" />
            </div>
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
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
                        </tr>
                    </thead>
                    <tbody>
                        {militares.map((militar) => {
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <ImpressaoFooter />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center d-print-none">
                <Imprimir impressao="paisagem"/>
            </div>
        </>
    );
}

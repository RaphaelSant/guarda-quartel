import React, { useEffect, useState } from "react";
import {
    Imprimir,
    PaginaInicial,
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

export default function BkViaturasPelotao() {
    const [viaturas, setViaturas] = useState([]);

    // Obter os dados dos civis no banco de dados e "setando" na useState civis
    const getViaturas = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const viaturasCollectionRef = collection(db, "bk_es_vtr_pelotao");
        try {
            //const data = await getDocs(civisCollectionRef);
            const data = await getDocs(query(viaturasCollectionRef, orderBy("horarioSaida")));
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
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE VIATURAS DO PELOTÃO</p>
            <div className="text-center mb-4 d-print-none">
                <PaginaInicial link="/relatorio/servicoAnterior/" titulo="Voltar" />
            </div>
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="ENTRADA E SAÍDA DE VIATURAS DO PELOTÃO" />

                <table className="table text-center table-bordered table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col" rowSpan={'2'}>Vtr - OM</th>
                            <th scope="col" colSpan={'2'}>Odômetro</th>
                            <th scope="col" colSpan={'2'}>Horário</th>
                            <th scope="col" rowSpan={'2'}>Motorista</th>
                            <th scope="col" rowSpan={'2'}>Chefe de Vtr / Acompanhante</th>
                            <th scope="col" rowSpan={'2'}>Destino</th>
                        </tr>
                        <tr className="align-middle">
                            <th scope="col">Saída</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Entrada</th>
                        </tr>
                    </thead>

                    <tbody>
                        {viaturas.map((viaturas) => {
                            return (
                                <tr key={viaturas.id} className="align-middle">
                                    <td>{viaturas.vtrOm}</td>
                                    <td>{viaturas.odmSaida}</td>
                                    <td>{viaturas.odmEntrada}</td>
                                    <td>{viaturas.horarioSaida}</td>
                                    <td>{viaturas.horarioEntrada}</td>
                                    <td>{viaturas.motorista}</td>
                                    <td>{viaturas.chefeVtr}</td>
                                    <td>{viaturas.destino}</td>
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

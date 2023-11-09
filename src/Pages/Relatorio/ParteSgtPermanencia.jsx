//import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    Imprimir,
    NovoRegistro,
    PaginaInicial,
} from "../../Components/Button/Button";
import Navbar from "../../Components/Navbar/Navbar";

/*FIREBASE CONFIG*/
import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import ImpressaoFooter from "../../Components/Impressao/ImpressaoFooter";
import { capturaAno, capturaDia, capturaMes } from "../Assets/capturaDate";

export default function ParteSargentoPermanencia() {
    const [parteSgtPemanencia, setParteSgtPemanencia] = useState([]);
    let identificacaoSgtPerm = "";
    const [militares, setMilitares] = useState([]);

    // Obter os dados dos militares no banco de dados e "setando" na useState militares
    const getParteSargentoPermanencia = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const militarCollectionRef = collection(db, "parte-sgt-permanencia");
        try {
            const data = await getDocs(militarCollectionRef);
            //const data = await getDocs(query(militarCollectionRef));
            const ptSgtPermanenciaData = data.docs.map((militarDoc) => ({
                ...militarDoc.data(),
                id: militarDoc.id,
            }));
            setParteSgtPemanencia(ptSgtPermanenciaData);
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
        }
    };

    // Obter os dados do Roteiro da Guarda
    const getMilitares = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const militarCollectionRef = collection(db, "roteiroDaGuarda");
        try {
            //const data = await getDocs(militarCollectionRef);
            const data = await getDocs(militarCollectionRef);
            const militaresData = data.docs.map((militarDoc) => ({
                ...militarDoc.data(),
                id: militarDoc.id,
            }));
            setMilitares(militaresData);
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
        }
    };

    // Hook para executar a função getCivis() apenas uma vez, não sobrecarregando (leitura) no firestore.
    useEffect(() => {
        try {
            getParteSargentoPermanencia();
            getMilitares();
            //console.log("Leitura do banco realizada");
        } catch (error) {
            console.log(error);
        }
    }, []);

    let totalFPonta = 0;
    let totalPonta = 0;
    let consumoTotalAtual = 0;
    let consumoTotalAnterior = 0;
    let consumoGeral = 0;

    // SOMA DO CONSUMO DE ENERGIA
    parteSgtPemanencia.map((dados) => {
        totalPonta = Number(dados.consPontaAtual - dados.consPontaAnterior);
        totalFPonta = Number(dados.conForaPontaAtual - dados.conForaPontaAnterior);
        consumoTotalAtual = parseInt(dados.consPontaAtual) + parseInt(dados.conForaPontaAtual);
        consumoTotalAnterior = parseInt(dados.consPontaAnterior) + parseInt(dados.conForaPontaAnterior);
        consumoGeral = totalPonta + totalFPonta;
        return (
            totalPonta,
            totalFPonta,
            consumoTotalAtual,
            consumoTotalAnterior,
            consumoGeral,
            identificacaoSgtPerm = dados.id
        );
    });

    console.log(identificacaoSgtPerm);

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center d-print-none">
                Relatório &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Parte do Sargento Pemanência</strong>
            </h5>
            <p className="text-center d-print-none">PARTE DO SARGENTO PERMANÊNCIA</p>
            <div className="text-center mb-4 d-print-none">
                <PaginaInicial link="/" titulo="Página Inicial" />
                <NovoRegistro
                    link={"/relatorio/parteSargentoPermanencia/editarParte/" + identificacaoSgtPerm}
                    titulo="Editar Parte"
                />
            </div>
            <div className="container border bg-white">
                <table className="table text-center table-bordered table-hover d-none d-print-block">
                    <thead>
                        <tr className="row">
                            <th scope="col" className="col-3">Subcomandante</th>
                            <th scope="col" className="fs-6 col-6">
                                Comando Militar da Amazônia – 12ª Região Militar <br />
                                17ª Brigada de Infantaria de Selva <br />
                                17º Pelotão de Comunicações de Selva <br />
                                <span className="fw-light" style={{fontSize: 15 + 'px'}}>Parte do Sgt Permanência, referente ao serviço do dia {capturaDia() - 1} para o dia {capturaDia()} de {capturaMes()} de {capturaAno()}</span>
                            </th>
                            <th scope="col" className="col-3">Enc Material</th>
                        </tr>
                    </thead>
                </table>
                <div className="container">
                    {parteSgtPemanencia.map((parteSgt) => {
                        return (
                            <div key={parteSgt.id}>
                                <p className="my-1"><b>01 – Parada Diária:</b> {parteSgt.paradaDiaria}</p>
                                <p className="my-1"><b>02 – Recebimento do Serviço:</b> {parteSgt.recebimentoServico}</p>
                                <p className="my-1"><b>03 – Pessoal de Serviço:</b> {parteSgt.pessoalServico}</p>
                                {militares.map((militares) => {
                                    return (
                                        <table className="table table-bordered table-hover" key={militares.id}>
                                            <tbody>
                                                <tr>
                                                    <td><b>Cmt da Gda: </b>{militares.sgtNomeGuerra}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Cb da Gda: </b> {militares.cbNomeGuerra}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Plantões: </b> {militares.primeiroHorario}; {militares.segundoHorario}; e {militares.terceiroHorario}.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    );
                                })}
                                <p  className="my-1"><b>04 - Energia Elétrica:</b></p>
                                <table className="table text-center table-bordered table-hover">
                                    <thead>
                                        <tr className="align-middle">
                                            <th>Leitura</th>
                                            <th>Atual</th>
                                            <th>Anterior</th>
                                            <th>Consumo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="align-middle">
                                            <td>Consumo de ponta (4)</td>
                                            <td>{parteSgt.consPontaAtual}</td>
                                            <td>{parteSgt.consPontaAnterior}</td>
                                            <td>{totalPonta}</td>
                                        </tr>
                                        <tr>
                                            <td>Consumo de fora de ponta (8)</td>
                                            <td>{parteSgt.conForaPontaAtual}</td>
                                            <td>{parteSgt.conForaPontaAnterior}</td>
                                            <td>{totalFPonta}</td>
                                        </tr>
                                        <tr>
                                            <td>Consumo total (3)</td>
                                            <td>{consumoTotalAtual}</td>
                                            <td>{consumoTotalAnterior}</td>
                                            <td>{consumoGeral}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="my-1"><b>05 – Rancho: </b>{parteSgt.rancho}</p>
                                <p className="my-1"><b>06 – Lixeiras: </b>{parteSgt.lixeiras}</p>
                                <p className="my-1"><b>07 - Armamento e munição: </b>{parteSgt.armtoMunicao}</p>
                                <p className="my-1"><b>08 – Dependências: </b>{parteSgt.dependencias}</p>
                                <p className="my-1"><b>09 – Claviculário: </b>{parteSgt.claviculario}</p>
                                <p className="my-1"><b>10 – Bomba d'água: </b>{parteSgt.bombaAgua}</p>
                                <p className="my-1"><b>11 – Revista do recolher: </b>{parteSgt.revistaRecolher}</p>
                                <p className="my-1"><b>12 – Rádios: </b>{parteSgt.radios}</p>
                                <p className="my-1"><b>13 – Câmeras: </b>{parteSgt.cameras}</p>
                                <p className="my-1"><b>14 – Material Carga: </b>{parteSgt.materialCarga}</p>
                                <p className="my-1"><b>16 – Ocorrências: </b>{parteSgt.ocorrencias}</p>
                                <p className="my-1"><b>17 – Correspondências: </b>{parteSgt.correspondencias}</p>
                                <p className="my-1"><b>18 – Viaturas: </b>{parteSgt.viaturas}</p>
                                <p className="my-1 mb-5"><b>19 – Passagem do serviço: </b>{parteSgt.passagemServico}</p>
                            </div>
                            //<p key={alteracao.id}><b>Alterações:</b> {alteracao.alteracoes}</p>
                        );
                    })}
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Imprimir />
                    <ImpressaoFooter />
                </div>
            </div>
        </>
    );
}

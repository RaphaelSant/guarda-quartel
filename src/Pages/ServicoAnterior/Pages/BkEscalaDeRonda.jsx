import React, { useEffect, useState } from "react";
import {
  Imprimir,
  PaginaInicial,
} from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

/*FIREBASE CONFIG*/
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";

import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import ImpressaoHeader from "../../../Components/Impressao/ImpressaoHeader";
import ImpressaoFooter from "../../../Components/Impressao/ImpressaoFooter";

export default function BkEscalaDeRonda() {
  const [militares, setMilitares] = useState([]);

  // Obter os dados dos militares no banco de dados e "setando" na useState militares
  const getMilitares = async () => {
    iniciarFirestoreDb();
    const db = getFirestore();
    const militarCollectionRef = collection(db, "roteiroDaGuarda");
    try {
      //const data = await getDocs(militarCollectionRef);
      const data = await getDocs(query(militarCollectionRef));
      const civisData = data.docs.map((militarDoc) => ({
        ...militarDoc.data(),
        id: militarDoc.id,
      }));
      setMilitares(civisData);
    } catch (error) {
      console.error("Erro ao buscar dados do Firestore:", error);
    }
  };

  // Hook para executar a função getCivis() apenas uma vez, não sobrecarregando (leitura) no firestore.
  useEffect(() => {
    try {
      getMilitares();
      //console.log("Leitura do banco realizada");
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
      <p className="text-center d-print-none">ESCALA DE RONDA</p>
      <div className="text-center mb-4 d-print-none">
        <PaginaInicial link="/relatorio/servicoAnterior/" titulo="Voltar" />
        <Imprimir />
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <ImpressaoHeader titulo="ESCALA DE RONDA" />

        <table className="table text-center table-bordered table-hover">
          <thead>
            <tr className="align-middle">
              <th scope="col">Horário</th>
              <th scope="col">P1</th>
              <th scope="col">P2</th>
              <th scope="col">P3</th>
              <th scope="col">Assinatura</th>
            </tr>
          </thead>
          <tbody>
            {militares.map((militar) => {
              return (
                <tr key={militar.id} className="align-middle">
                  <td className="fw-bold">21h</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>- - -</td>
                  <td className="p-4"></td>
                </tr>
              );
            })}
            {militares.map((militar) => {
              return (
                <tr key={militar.id} className="align-middle">
                  <td className="fw-bold">01h</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.segundoHorario}</td>
                  <td>- - -</td>
                  <td className="p-4"></td>
                </tr>
              );
            })}
            {militares.map((militar) => {
              return (
                <tr key={militar.id} className="align-middle">
                  <td className="fw-bold">03h</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>- - -</td>
                  <td className="p-4"></td>
                </tr>
              );
            })}
            {militares.map((militar) => {
              return (
                <tr key={militar.id} className="align-middle">
                  <td className="fw-bold">05h</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>- - -</td>
                  <td className="p-4"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="container">
          {militares.map((alteracao) => {
            return (
              <p key={alteracao.id}>
                <b>Alterações:</b> {alteracao.alteracoes}
              </p>
            );
          })}
        </div>
        <ImpressaoFooter />
      </div>
    </>
  );
}

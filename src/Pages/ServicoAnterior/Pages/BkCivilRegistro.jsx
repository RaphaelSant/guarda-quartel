import React, { useEffect, useState } from "react";
import {
  Imprimir,
  PaginaInicial,
} from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

/*CSS*/
import estiloImpressao from "../../CSS/PrintPortrait.module.css";

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

export default function BkCivilRegistro() {
  const [civis, setCivis] = useState([]);

  // Obter os dados dos civis no banco de dados e "setando" na useState civis
  const getCivis = async () => {
    iniciarFirestoreDb();
    const db = getFirestore();
    const civisCollectionRef = collection(db, "bk_es_civis");
    try {
      //const data = await getDocs(civisCollectionRef);
      const data = await getDocs(
        query(
          civisCollectionRef,
          orderBy("dataEntrada"),
          orderBy("horarioEntrada")
        )
      );
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
      <p className="text-center d-print-none">Entrada e Saída de Civis</p>
      <div className="container text-center mb-4 d-print-none">
        <PaginaInicial link="/relatorio/servicoAnterior" titulo="Voltar" />
      </div>
      <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
        <ImpressaoHeader titulo="Entrada e Saída de Civis" />

        <table className="table text-center table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Data</th>
              <th scope="col">Entrada</th>
              <th scope="col">Saída</th>
              <th scope="col">Destino</th>
            </tr>
          </thead>
          <tbody>
            {civis.map((civis) => {
              return (
                <tr key={civis.id} className="align-middle">
                  <td>{civis.nome}</td>
                  <td>{civis.cpf}</td>
                  <td>{civis.dataEntrada}</td>
                  <td>{civis.horarioEntrada}</td>
                  <td className={`${civis.horarioSaida === "OM" ? 'bg-danger text-white fw-bold' : ''}`}>{civis.horarioSaida}</td>
                  <td>{civis.destino}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ImpressaoFooter />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center d-print-none">
        <Imprimir/>
      </div>
    </>
  );
}

//import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Imprimir,
  Voltar,
} from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

/*CSS*/
import estiloImpressao from "../../CSS/PrintPortrait.module.css";

/*FIREBASE CONFIG*/
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";

import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import ImpressaoHeader from "../../../Components/Impressao/ImpressaoHeader";
import ImpressaoFooter from "../../../Components/Impressao/ImpressaoFooter";

export default function BkRoteiroDaGuarda() {
  const [militares, setMilitares] = useState([]);

  // Obter os dados dos militares no banco de dados e "setando" na useState militares
  const getMilitares = async () => {
    iniciarFirestoreDb();
    const db = getFirestore();
    const militarCollectionRef = collection(db, "bk_roteiroDaGuarda");
    try {
      //const data = await getDocs(militarCollectionRef);
      const data = await getDocs(query(militarCollectionRef));
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
      <p className="text-center d-print-none">ROTEIRO DA GUARDA</p>
      <div className="text-center mb-4 d-print-none">
        <Voltar link="/relatorio/servicoAnterior/" />
      </div>
      <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
        <ImpressaoHeader titulo="ROTEIRO DA GUARDA" />

        <table className="table text-center table-bordered table-hover">
          <thead>
            <tr className="align-middle">
              <th scope="col">Grad</th>
              <th scope="col">Nome de Guerra</th>
              <th scope="col">Tipo Armto</th>
              <th scope="col">Nr Armto</th>
              <th scope="col">Qtde Mun</th>
              <th scope="col">Função</th>
            </tr>
          </thead>
          <tbody>
            {militares.map((militar) => {
              return (
                <tr key={militar.id} className="align-middle">
                  <td className="fw-bold">Sargento</td>
                  <td>{militar.sgtNomeGuerra}</td>
                  <td>{militar.sgtTipoArmto}</td>
                  <td>{militar.sgtNrArmto}</td>
                  <td>{militar.sgtQtdMun}</td>
                  <td className="fw-bold">Cb Gda</td>
                </tr>
              );
            })}
            {militares.map((militar) => {
              return (
                <tr key={militar.id} className="align-middle">
                  <td className="fw-bold">Cabo</td>
                  <td>{militar.cbNomeGuerra}</td>
                  <td>{militar.cbTipoArmto}</td>
                  <td>{militar.cbNrArmto}</td>
                  <td>{militar.cbQtdMun}</td>
                  <td className="fw-bold">Mot Dia</td>
                </tr>
              );
            })}
            {militares.map((militar) => {
              return (
                <tr key={militar.id} className="align-middle">
                  <td className="fw-bold">Soldado</td>
                  <td>{militar.sdNomeGuerra}</td>
                  <td>{militar.sdTipoArmto}</td>
                  <td>{militar.sdNrArmto}</td>
                  <td>{militar.sdQtdMun}</td>
                  <td className="fw-bold">Cmt Gda</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>
          <b>ROTEIRO DE RODÍZIO DA GUARDA</b>
        </p>

        <table className="table text-center table-bordered table-hover">
          <thead>
            <tr className="align-middle">
              <th scope="col">Horários</th>
              <th scope="col">P1</th>
              <th scope="col">P2</th>
              <th scope="col">P3</th>
            </tr>
          </thead>

          {militares.map((militar) => {
            return (
              <tbody key={militar.id}>
                <tr className="align-middle">
                  <td className="fw-bold">08:00 às 10:00</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">10:00 às 12:00</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">12:00 às 14:00</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">14:00 às 16:00</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">16:00 às 18:00</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">18:00 às 20:00</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">20:00 às 22:00</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">22:00 às 00:00</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">00:00 às 02:00</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">02:00 às 04:00</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">04:00 às 06:00</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.primeiroHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
                <tr className="align-middle">
                  <td className="fw-bold">06:00 às 08:00</td>
                  <td>{militar.terceiroHorario}</td>
                  <td>{militar.segundoHorario}</td>
                  <td>{militar.quartoHorario}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <ImpressaoFooter />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center d-print-none">
        <Imprimir />
      </div>
    </>
  );
}

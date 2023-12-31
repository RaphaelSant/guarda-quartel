import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Imprimir,
  NovoRegistro,
  PaginaInicial,
} from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
/* CSS */
import estiloImpressao from "../../CSS/PrintPortrait.module.css";
import "../../CSS/estiloTabela.css";

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

export default function RegistroCivil() {
  const [civis, setCivis] = useState([]);

  // Obter os dados dos civis no banco de dados e "setando" na useState civis
  const getCivis = async () => {
    iniciarFirestoreDb();
    const db = getFirestore();
    const civisCollectionRef = collection(db, "es_civis");
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
      console.log("Leitura do banco realizada");
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Função chamada pelo icone "trash" para deletar uma linha da tabela do banco
  const deleteCivil = async (id) => {
    iniciarFirestoreDb();
    const db = getFirestore();
    try {
      const civilDoc = doc(db, "es_civis", id);
      await deleteDoc(civilDoc);
      setCivis(civis.filter((civi) => civi.id !== id)); // Atualize o estado local, excluindo o item
      alert("Registro deletado");
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
    }
  };

  const deleteCivilConfirmacao = (id, nome, cpf) => {
    const shouldDelete = window.confirm(
        `Tem certeza de que deseja excluir este registro? Nome: ${nome} CPF: ${cpf}`
    ); // Exibe um diálogo de confirmação

    if (shouldDelete) {
      deleteCivil(id); // Chama a função de exclusão se o usuário confirmar
    }
  };

  return (
    <>
      <Navbar />
      <h5 className="mt-4 mb-0 text-center d-print-none">
        Civil &gt; <strong style={{ color: "#008BD2" }}>Registro</strong>
      </h5>
      <p className="text-center d-print-none">Entrada e Saída de Civis</p>
      <div className="text-center mb-4 d-print-none">
        <PaginaInicial link="/" titulo="Página Inicial" />
        <NovoRegistro link="/civis/civil/novoRegistro" titulo="Novo Registro" />
      </div>
      <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
        <ImpressaoHeader titulo="Entrada e Saída de Civis" />

        <table className="table text-center table-bordered border-dark-subtle table-hover">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Data</th>
              <th scope="col">Entrada</th>
              <th scope="col">Saída</th>
              <th scope="col">Destino</th>
              <th scope="col" className="d-print-none">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {civis.map((civis) => {
              let id = civis.id;
              return (
                <tr key={civis.id} className="align-middle">
                  <td>{civis.nome}</td>
                  <td>{civis.cpf}</td>
                  <td>{civis.dataEntrada}</td>
                  <td>{civis.horarioEntrada}</td>
                  <td className={`${civis.horarioSaida === "OM" ? 'bg-danger text-white fw-bold' : ''}`}>{civis.horarioSaida}</td>
                  <td>{civis.destino}</td>
                  <td className="d-print-none">
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <div>
                        <Link to={"/civis/civil/editarRegistro/" + id}>
                          <button className="bnt-acao">
                            <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="bnt-acao"
                          onClick={() => deleteCivilConfirmacao(id, civis.nome, civis.cpf)}
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
        <ImpressaoFooter />
      </div>
    </>
  );
}

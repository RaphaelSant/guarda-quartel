import React, { useState } from "react";
import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { Cancelar } from "../../Components/Button/Button";
import Navbar from "../../Components/Navbar/Navbar";

export default function ArmazenarServico() {
  const [progresso, setProgresso] = useState(false);
  const [concluido, setConcluido] = useState(false);

  iniciarFirestoreDb();
  const db = getFirestore();

  // Função para excluir todos os campos da coleção a partir da referencia da coleção no BD.
  async function excluirTodosDocumentosDaColecao(docRef) {
    const querySnapshot = await getDocs(docRef);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
        .then(() => {
          console.log(`Documento com ID ${doc.id} excluído com sucesso.`);
        })
        .catch((error) => {
          console.error(`Erro ao excluir documento com ID ${doc.id}:`, error);
        });
    });
  }

  // Função para apagar os documentos de BK_ES_Civis realizar a cópia de ES_Civis e apagar ES_Civis.
  async function bkESCivis() {
    try {
      const origemCollection = collection(db, "es_civis");
      const destinoCollection = collection(db, "bk_es_civis");

      excluirTodosDocumentosDaColecao(destinoCollection);
      console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const civisData = dataOrigem.docs.map((civiDoc) => ({
        ...civiDoc.data(),
        id: civiDoc.id,
      }));

      // Copia os documentos da coleção de origem para a coleção de destino
      civisData.forEach(async (doc) => {
        const nome = doc.nome;
        const cpf = doc.cpf;
        const dataEntrada = doc.dataEntrada;
        const horarioSaida = doc.horarioSaida;
        const horarioEntrada = doc.horarioEntrada;
        const destino = doc.destino;

        await addDoc(destinoCollection, {
          nome,
          cpf,
          dataEntrada,
          horarioSaida,
          horarioEntrada,
          destino,
        });

        console.log("Documentos copiados com sucesso!");

        excluirTodosDocumentosDaColecao(origemCollection);
        console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  // Função para apagar os documentos de BK_ES_Veiculos_Civis realizar a cópia de BK_ES_Veiculos_Civis e apagar ES_Civis.
  async function bkESVeiculosCivis() {
    try {
      const origemCollection = collection(db, "es_veiculos_civis");
      const destinoCollection = collection(db, "bk_es_veiculos_civis");

      excluirTodosDocumentosDaColecao(destinoCollection);
      //console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const origemData = dataOrigem.docs.map((civiDoc) => ({
        ...civiDoc.data(),
        id: civiDoc.id,
      }));

      // Copia os documentos da coleção de origem para a coleção de destino
      origemData.forEach(async (doc) => {
        const nome = doc.nome;
        const cnh = doc.cnh;
        const placa = doc.placa;
        const dataEntrada = doc.dataEntrada;
        const horarioSaida = doc.horarioSaida;
        const horarioEntrada = doc.horarioEntrada;
        const destino = doc.destino;

        await addDoc(destinoCollection, {
          nome,
          cnh,
          placa,
          dataEntrada,
          horarioEntrada,
          horarioSaida,
          destino,
        });
        //console.log("Documentos copiados com sucesso!");

        excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  // Função para apagar os documentos de BK_ES_Veiculos_Civis realizar a cópia de BK_ES_Veiculos_Civis e apagar es_mil_durante_expediente.
  async function bkESMilDuranteExpediente() {
    try {
      const origemCollection = collection(db, "es_mil_durante_expediente");
      const destinoCollection = collection(db, "bk_es_mil_durante_expediente");

      excluirTodosDocumentosDaColecao(destinoCollection);
      //console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const origemData = dataOrigem.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Copia os documentos da coleção de origem para a coleção de destino
      origemData.forEach(async (doc) => {
        const pg = doc.pg;
        const nomeGuerra = doc.nomeGuerra;
        const idtMilitar = doc.idtMilitar;
        const om = doc.om;
        const dataEntrada = doc.dataEntrada;
        const horarioEntrada = doc.horarioEntrada;
        const horarioSaida = doc.horarioSaida;
        const origem = doc.origem;

        await addDoc(destinoCollection, {
          pg,
          nomeGuerra,
          idtMilitar,
          om,
          dataEntrada,
          horarioEntrada,
          horarioSaida,
          origem,
        });
        //console.log("Documentos copiados com sucesso!");

        excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  // Função para apagar os documentos de BK_ES_Veiculos_Civis realizar a cópia de BK_ES_Veiculos_Civis e apagar es_mil_durante_expediente.
  async function bkESMilForaExpediente() {
    try {
      const origemCollection = collection(db, "es_mil_fora_expediente");
      const destinoCollection = collection(db, "bk_es_mil_fora_expediente");

      excluirTodosDocumentosDaColecao(destinoCollection);
      //console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const origemData = dataOrigem.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Salva os dados em variaveis para posterior gravação
      origemData.forEach(async (doc) => {
        const pg = doc.pg;
        const nomeGuerra = doc.nomeGuerra;
        const idtMilitar = doc.idtMilitar;
        const om = doc.om;
        const dataEntrada = doc.dataEntrada;
        const horarioEntrada = doc.horarioEntrada;
        const horarioSaida = doc.horarioSaida;
        const origem = doc.origem;

        // Copia os documentos da coleção de origem para a coleção de destino
        await addDoc(destinoCollection, {
          pg,
          nomeGuerra,
          idtMilitar,
          om,
          dataEntrada,
          horarioEntrada,
          horarioSaida,
          origem,
        });
        //console.log("Documentos copiados com sucesso!");

        excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  // Função para apagar os documentos de BK_es_vtr_pelotao realizar a cópia de es_vtr_pelotao e apagar es_vtr_pelotao.
  async function bkESVtrPelotao() {
    try {
      const origemCollection = collection(db, "es_vtr_pelotao");
      const destinoCollection = collection(db, "bk_es_vtr_pelotao");

      excluirTodosDocumentosDaColecao(destinoCollection);
      //console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const origemData = dataOrigem.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Salva os dados em variaveis para posterior gravação
      origemData.forEach(async (doc) => {
        const vtrOm = doc.vtrOm;
        const odmSaida = doc.odmSaida;
        const odmEntrada = doc.odmEntrada;
        const horarioSaida = doc.horarioSaida;
        const horarioEntrada = doc.horarioEntrada;
        const motorista = doc.motorista;
        const chefeVtr = doc.chefeVtr;
        const destino = doc.destino;

        // Copia os documentos da coleção de origem para a coleção de destino
        await addDoc(destinoCollection, {
          vtrOm,
          odmSaida,
          odmEntrada,
          horarioSaida,
          horarioEntrada,
          motorista,
          chefeVtr,
          destino,
        });
        //console.log("Documentos copiados com sucesso!");

        excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  // Função para apagar os documentos de BK_es_vtr_pelotao realizar a cópia de es_vtr_pelotao e apagar es_vtr_pelotao.
  async function bkVtrOutraOm() {
    try {
      const origemCollection = collection(db, "es_vtr_outros_quarteis");
      const destinoCollection = collection(db, "bk_es_vtr_outros_quarteis");

      excluirTodosDocumentosDaColecao(destinoCollection);
      //console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const origemData = dataOrigem.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Salva os dados em variaveis para posterior gravação
      origemData.forEach(async (doc) => {
        const vtrOm = doc.vtrOm;
        const motorista = doc.motorista;
        const horarioEntrada = doc.horarioEntrada;
        const horarioSaida = doc.horarioSaida;
        const chefeVtr = doc.chefeVtr;
        const destino = doc.destino;

        // Copia os documentos da coleção de origem para a coleção de destino
        await addDoc(destinoCollection, {
          vtrOm,
          motorista,
          horarioEntrada,
          horarioSaida,
          chefeVtr,
          destino,
        });
        //console.log("Documentos copiados com sucesso!");

        excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  // Função para apagar os documentos de BK_roteiroDaGuarda realizar a cópia de roteiroDaGuarda e apagar roteiroDaGuarda.
  async function bkRoteiroGuarda() {
    try {
      const origemCollection = collection(db, "roteiroDaGuarda");
      const destinoCollection = collection(db, "bk_roteiroDaGuarda");

      excluirTodosDocumentosDaColecao(destinoCollection);
      //console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const origemData = dataOrigem.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Salva os dados em variaveis para posterior gravação
      origemData.forEach(async (doc) => {
        const sgtNomeGuerra = doc.sgtNomeGuerra;
        const sgtNrArmto = doc.sgtNrArmto;
        const sgtQtdMun = doc.sgtQtdMun;
        const sgtTipoArmto = doc.sgtTipoArmto;
        const cbNomeGuerra = doc.cbNomeGuerra;
        const cbNrArmto = doc.cbNrArmto;
        const cbQtdMun = doc.cbQtdMun;
        const cbTipoArmto = doc.cbTipoArmto;
        const sdNomeGuerra = doc.sdNomeGuerra;
        const sdNrArmto = doc.sdNrArmto;
        const sdQtdMun = doc.sdQtdMun;
        const sdTipoArmto = doc.sdTipoArmto;
        const primeiroHorario = doc.primeiroHorario;
        const segundoHorario = doc.segundoHorario;
        const terceiroHorario = doc.terceiroHorario;

        // Copia os documentos da coleção de origem para a coleção de destino
        await addDoc(destinoCollection, {
          sgtNomeGuerra,
          sgtNrArmto,
          sgtQtdMun,
          sgtTipoArmto,
          cbNomeGuerra,
          cbNrArmto,
          cbQtdMun,
          cbTipoArmto,
          sdNomeGuerra,
          sdNrArmto,
          sdQtdMun,
          sdTipoArmto,
          primeiroHorario,
          segundoHorario,
          terceiroHorario,
        });
        //console.log("Documentos copiados com sucesso!");

        //excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  // Função para apagar os documentos de BK_roteiroDaGuarda realizar a cópia de roteiroDaGuarda e apagar roteiroDaGuarda.
  async function bkParteSgtPerm() {
    try {
      const origemCollection = collection(db, "parte-sgt-permanencia");
      const destinoCollection = collection(db, "bk_parte-sgt-permanencia");

      excluirTodosDocumentosDaColecao(destinoCollection);
      //console.log("Documentos do destino apagados!");

      // Recupera os documentos da coleção de origem
      const dataOrigem = await getDocs(origemCollection);
      const origemData = dataOrigem.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Salva os dados em variaveis para posterior gravação
      origemData.forEach(async (doc) => {
        const armtoMunicao = doc.armtoMunicao;
        const bombaAgua = doc.bombaAgua;
        const cameras = doc.cameras;
        const claviculario = doc.claviculario;
        const conForaPontaAnterior = doc.conForaPontaAnterior;
        const conForaPontaAtual = doc.conForaPontaAtual;
        const consPontaAnterior = doc.consPontaAnterior;
        const consPontaAtual = doc.consPontaAtual;
        const correspondencias = doc.correspondencias;
        const dependencias = doc.dependencias;
        const lixeiras = doc.lixeiras;
        const materialCarga = doc.materialCarga;
        const ocorrencias = doc.ocorrencias;
        const paradaDiaria = doc.paradaDiaria;
        const passagemServico = doc.passagemServico;
        const pessoalServico = doc.pessoalServico;
        const radios = doc.radios;
        const rancho = doc.rancho;
        const recebimentoServico = doc.recebimentoServico;
        const revistaRecolher = doc.revistaRecolher;
        const viaturas = doc.viaturas;

        // Copia os documentos da coleção de origem para a coleção de destino
        await addDoc(destinoCollection, {
          armtoMunicao,
          bombaAgua,
          cameras,
          claviculario,
          conForaPontaAnterior,
          conForaPontaAtual,
          consPontaAnterior,
          consPontaAtual,
          correspondencias,
          dependencias,
          lixeiras,
          materialCarga,
          ocorrencias,
          paradaDiaria,
          passagemServico,
          pessoalServico,
          radios,
          rancho,
          recebimentoServico,
          revistaRecolher,
          viaturas,
        });

        //console.log("Documentos copiados com sucesso!");

        //excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  async function handleArmazenarServico() {
    setProgresso(true);

    try {
      // Executar as funções para exclusão e cópia dos documentos
      await bkESCivis();
      await bkESVeiculosCivis();
      await bkESMilDuranteExpediente();
      await bkESMilForaExpediente();
      await bkESVtrPelotao();
      await bkVtrOutraOm();
      await bkRoteiroGuarda();
      await bkParteSgtPerm();

      // Simular um tempo de espera (pode ser removido)
      setTimeout(() => {
        setProgresso(false);
        setConcluido(true);
        window.location.href = '/homePage';
      }, 10000);

    } catch (error) {
      console.error("Erro ao processar:", error);
    } finally {
      // setProgresso(false);
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <i className="fa-solid fa-triangle-exclamation"></i> Atenção!{" "}
                <i className="fa-solid fa-triangle-exclamation"></i>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Os dados ficarão disponíveis apenas para consulta e impressão por um período de 24 horas (Até a passagem do serviço atual) no Menu -Serviço Anterior-.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              {concluido ? <button
                type="button"
                className="btn btn-success"
                disabled
              >
                Operação Concluída!
              </button>
                : progresso ? <button className="btn btn-danger" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status"> Em progresso...</span>
                </button>
                  : <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleArmazenarServico}
                  >
                    Armazenar Serviço
                  </button>}

            </div>
          </div>
        </div>
      </div>

      <Navbar />
      <div className="container">
        <h5 className="mt-4 mb-0 text-center d-print-none">
          Relatório &gt;{" "}
          <strong style={{ color: "#008BD2" }}>Armazenar Serviço</strong>
        </h5>
        <p className="text-center d-print-none">Amazenamento de Serviço</p>
        <div className="w-50 m-auto">
          <p className="text-justify">
            O Menu "Armazenar Serviço" é uma ferramenta extremamente delicada.
            Ao utilizá-lo, você estará arquivando suas informações atuais,
            tornando-as disponíveis <strong>apenas</strong> para consulta e
            impressão por um período de 24 horas (Até a passagem do serviço
            atual) no Menu "Serviço Anterior".
          </p>
        </div>
        <div className="w-50 m-auto">
          <button
            type="button"
            className="btn btn-danger w-100"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Armazenar Serviço
          </button>
          <Cancelar link="/homePage" />
        </div>
      </div>
    </>
  );
}

import React, { useEffect } from "react";
import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { Voltar } from "../../Components/Button/Button";

export default function ArmazenarServico() {
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

  useEffect(() => {
    try {
      //bkESCivis();
      //bkESVeiculosCivis();
      //bkESMilDuranteExpediente();
      //bkESMilForaExpediente();
      //bkESVtrPelotao();
      //bkVtrOutraOm();
      console.log("bkESCivis realizado");
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Função para apagar os documentos de BK_ES_Civis realizar a cópia de ES_Civis e apagar ES_Civis.
  const bkESCivis = async () => {
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
  };

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

      // excluirTodosDocumentosDaColecao(destinoCollection);
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

        excluirTodosDocumentosDaColecao(origemCollection);
        //console.log("Documentos da origem apagados!");
      });
    } catch (error) {
      console.error("Erro ao copiar documentos:", error);
    }
  }

  return (
    <div>
      <h1>Menu Civis</h1>
      
      <button onClick={bkESVeiculosCivis}>BK ES Veiculos Civis</button>
      <button onClick={bkESCivis}>BK ES Civis</button>
      <h1>Menu Militares</h1>
      <button onClick={bkESMilDuranteExpediente}>
        BK ES Militares Durante o Expediente
      </button>
      <button onClick={bkESMilForaExpediente}>
        BK ES Militares Fora do Expediente
      </button>
      <button onClick={bkESVtrPelotao}>BK ES Viaturas do Pelotão</button>

      <h1>Menu Outras Oms</h1>
      <button onClick={bkVtrOutraOm}>BK Viaturas de Outras OMs</button>

      <h1>Relatórios</h1>
      <button onClick={bkRoteiroGuarda}>BK Roteiro da Guarda</button>
      <Voltar link="/" />
    </div>
  );
}

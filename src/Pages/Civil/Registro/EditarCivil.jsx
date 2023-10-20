import React, { useEffect, useState } from "react";
import { PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import "./novocivil.css";

import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig.ts";

export default function EditarRegistroCivil() {
    // Obetendo o id do registro passado pela URL (Router)
    const { id } = useParams();

    // Variaveis locais para alteração no banco de dados.
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [horarioChegada, setHorarioChegada] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("");
    const [destino, setDestino] = useState("");


    // Função para obter os dados do ID do registro e adiciona-los às constantes.
    useEffect(() => {
        async function getCivis() {
            iniciarFirestoreDb();
            const db = getFirestore();
            try {
                // Documento de referência passando como parametro o BD, tabela e ID do campo que será alterado.
                const docRef = doc(db, "es_civis", id);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                // Os dados serão "setados" nas variaveis locais.
                setNome(data.nome);
                setCpf(data.cpf);
                setHorarioChegada(data.horarioChegada);
                setHorarioSaida(data.horarioSaida);
                setDestino(data.destino);
            } catch (error) {
                // Mostrar um alerta de erro
                window.alert("Algo deu errado: " + error.message);
            }
        }
        getCivis();
    }, [id]);

    // Função para ação update do botão ATUALZIAR
    const atualizarCivil = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const docRef = doc(db, "es_civis", id);

        try {
            await updateDoc(docRef, {
                nome: nome,
                cpf: cpf,
                horarioChegada: horarioChegada,
                horarioSaida: horarioSaida,
                destino: destino,
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro atualizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/civis/civil";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao atualizar: " + error.message);
        }
        
    }

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-4 text-center">
                Civil &gt; Registro &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Editar Registro</strong>
            </h5>

            <div className="container">
                <div className="row">
                    <div className="mb-3 col-6">
                        <label htmlFor="nome-completo" className="form-label">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            placeholder="Nome Completo"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            id="nome-completo"
                        />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="cpf" className="form-label">
                            CPF
                        </label>
                        <input
                            type="text"
                            placeholder="CPF"
                            className="form-control"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            id="cpf"
                        />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="hora-entrada" className="form-label">
                            Horário de Entrada
                        </label>
                        <input
                            type="text"
                            placeholder="Horário de Entrada"
                            className="form-control"
                            value={horarioChegada}
                            onChange={(e) => setHorarioChegada(e.target.value)}
                            id="hora-entrada"
                        />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="hora-saida" className="form-label">
                            Horário de Saída
                        </label>
                        <input
                            type="text"
                            placeholder="Horário de Saída"
                            className="form-control"
                            value={horarioSaida}
                            onChange={(e) => setHorarioSaida(e.target.value)}
                            id="hora-saida"
                        />
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="destino" className="form-label">
                            Destino
                        </label>
                        <input
                            type="text"
                            placeholder="Destino"
                            className="form-control"
                            value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            id="destino"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center gap-4 text-center mb-4">
                <div>
                    <PaginaInicial link="/civis/civil" titulo="Cancelar" />
                </div>
                <div>
                    <button
                        onClick={() => atualizarCivil()}
                        className="btn btn-lg btn-success"
                    >
                        Atualizar Usuário
                    </button>
                </div>
            </div>
        </>
    );
}

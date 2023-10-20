import React, { useEffect, useState } from "react";
import { PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import "./veiculoscivil.css";

import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig.ts";

export default function EditarVeiculoCivil() {
    // Obetendo o id do registro passado pela URL (Router)
    const { id } = useParams();

    // Variaveis locais para alteração no banco de dados.
    const [nome, setNome] = useState("");
    const [cnh, setCnh] = useState("");
    const [placa, setPlaca] = useState("");
    const [horarioEntrada, setHorarioEntrada] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("");
    const [destino, setDestino] = useState("");


    // Função para obter os dados do ID do registro e adiciona-los às constantes.
    useEffect(() => {
        async function getVeiculosCivis() {
            iniciarFirestoreDb();
            const db = getFirestore();
            try {
                // Documento de referência passando como parametro o BD, tabela e ID do campo que será alterado.
                const docRef = doc(db, "es_veiculos_civis", id);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                // Os dados serão "setados" nas variaveis locais.
                setNome(data.nome);
                setCnh(data.cnh);
                setPlaca(data.placa);
                setHorarioEntrada(data.horarioEntrada);
                setHorarioSaida(data.horarioSaida);
                setDestino(data.destino);
            } catch (error) {
                // Mostrar um alerta de erro
                window.alert("Algo deu errado: " + error.message);
            }
        }
        getVeiculosCivis();
    }, [id]);

    // Função para ação update do botão ATUALZIAR
    const atualizarVeiculoCivil = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const docRef = doc(db, "es_veiculos_civis", id);

        try {
            await updateDoc(docRef, {
                nome: nome,
                cnh: cnh,
                placa: placa,
                horarioEntrada: horarioEntrada,
                horarioSaida: horarioSaida,
                destino: destino,
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro atualizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/civis/veiculoCivil";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao atualizar: " + error.message);
        }

    }

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-4 text-center">
                Civil &gt; Veículo &gt;{" "}
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
                        <label htmlFor="cnh" className="form-label">
                            CNH
                        </label>
                        <input
                            type="text"
                            placeholder="CNH"
                            className="form-control"
                            value={cnh}
                            onChange={(e) => setCnh(e.target.value)}
                            id="cnh"
                        />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="placa" className="form-label">
                            Placa
                        </label>
                        <input
                            type="text"
                            placeholder="Placa"
                            className="form-control"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            id="placa"
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
                            value={horarioEntrada}
                            onChange={(e) => setHorarioEntrada(e.target.value)}
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
                    <div className="mb-3 col-6">
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
                    <PaginaInicial link="/civis/veiculoCivil" titulo="Cancelar" />
                </div>
                <div>
                    <button
                        onClick={() => atualizarVeiculoCivil()}
                        className="btn btn-lg btn-success"
                    >
                        Atualizar Usuário
                    </button>
                </div>
            </div>
        </>
    );
}

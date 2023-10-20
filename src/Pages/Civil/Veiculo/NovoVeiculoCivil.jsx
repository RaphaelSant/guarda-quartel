import React, { useState } from "react";
import { PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import "./veiculoscivil.css";
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig.ts";
import { addDoc, collection, getFirestore } from "firebase/firestore";


export default function NovoVeiculoCivil() {
    const [nome, setNome] = useState("");
    const [cnh, setCnh] = useState("");
    const [placa, setPlaca] = useState("");
    const [horarioEntrada, setHorarioEntrada] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("");
    const [destino, setDestino] = useState("");

    async function cadastrarVeiculoCivil() {
        iniciarFirestoreDb();
        const db = getFirestore();
        const veiculosCivisCollectionRef = collection(db, "es_veiculos_civis");

        try {
            await addDoc(veiculosCivisCollectionRef, {
                nome,
                cnh,
                placa,
                horarioEntrada,
                horarioSaida,
                destino
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro realizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/civis/veiculoCivil";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao cadastrar: " + error.message);
        }
    }
    return <>
        <Navbar />
        <h5 className="mt-4 mb-4 text-center">Civil &gt; Veículo &gt; <strong style={{ color: '#008BD2' }}>Novo Registro</strong></h5>

        <div className="container">
            <div className="row">
                <div class="mb-3 col-6">
                    <label for="nome-completo" class="form-label">Nome Completo</label>
                    <input type="text" placeholder="Nome Completo" class="form-control" value={nome} onChange={(e) => setNome(e.target.value)} id="nome-completo" />
                </div>
                <div class="mb-3 col-6">
                    <label for="cnh" class="form-label">CNH</label>
                    <input type="text" placeholder="CNH" class="form-control" value={cnh} onChange={(e) => setCnh(e.target.value)} id="cnh" />
                </div>
                <div class="mb-3 col-6">
                    <label for="placa" class="form-label">Placa</label>
                    <input type="text" placeholder="Placa" class="form-control" value={placa} onChange={(e) => setPlaca(e.target.value)} id="placa" />
                </div>
                <div class="mb-3 col-6">
                    <label for="hora-entrada" class="form-label">Horário de Entrada</label>
                    <input type="text" placeholder="Horário de Entrada" class="form-control" value={horarioEntrada} onChange={(e) => setHorarioEntrada(e.target.value)} id="hora-entrada" />
                </div>
                <div class="mb-3 col-6">
                    <label for="hora-saida" class="form-label">Horário de Saída</label>
                    <input type="text" placeholder="Horário de Saída" class="form-control" value={horarioSaida} onChange={(e) => setHorarioSaida(e.target.value)} id="hora-saida" />
                </div>
                <div class="mb-3 col-6">
                    <label for="hora-saida" class="form-label">Destino</label>
                    <input type="text" placeholder="Destino" class="form-control" value={destino} onChange={(e) => setDestino(e.target.value)} id="hora-saida" />
                </div>
            </div>
        </div>

        <div className="d-flex justify-content-center gap-4 text-center mb-4">
            <div>
                <PaginaInicial link="/civis/veiculoCivil" titulo="Cancelar" />
            </div>
            <div>
                <button onClick={() => cadastrarVeiculoCivil()} className="btn btn-lg btn-success">Registrar Veículo Civil</button>
            </div>
        </div>

    </>
}
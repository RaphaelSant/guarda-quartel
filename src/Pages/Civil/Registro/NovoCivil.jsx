/*import React, { useState } from "react";
import { PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

import { addDoc, collection, getFirestore } from "firebase/firestore";

export default function RegistroCivil() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [horarioChegada, setHorarioChegada] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("");
    const [destino, setDestino] = useState("");

    const db = getFirestore();
    const civisCollectionRef = collection(db, "es_civis");

    async function cadastrarCivil() {
        return await addDoc(civisCollectionRef, {
            nome,
            cpf,
            horarioChegada,
            horarioSaida,
            destino
        });
    }

    return <>
        <Navbar />
        <h5 className="mt-4 mb-4 text-center">Civil &gt; Registro &gt; <strong style={{ color: '#008BD2' }}>Novo Registro</strong></h5>

        <div className="container">
            <div className="row">
                <div className="mb-3 col-6">
                    <label htmlFor="nome-completo" className="form-label">Nome Completo</label>
                    <input type="text" placeholder="Nome Completo" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} id="nome-completo" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input type="text" placeholder="CPF" className="form-control" value={cpf} onChange={(e) => setCpf(e.target.value)} id="cpf" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="hora-entrada" className="form-label">Horário de Entrada</label>
                    <input type="text" placeholder="Horário de Entrada" className="form-control" value={horarioChegada} onChange={(e) => setHorarioChegada(e.target.value)} id="hora-entrada" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="hora-saida" className="form-label">Horário de Saída</label>
                    <input type="text" placeholder="Horário de Saída" className="form-control" value={horarioSaida} onChange={(e) => setHorarioSaida(e.target.value)} id="hora-saida" />
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="destino" className="form-label">Destino</label>
                    <input type="text" placeholder="Destino" className="form-control" value={destino} onChange={(e) => setDestino(e.target.value)} id="destino" />
                </div>
            </div>
        </div>

        <div className="d-flex justify-content-center gap-4 text-center mb-4">
            <div>
                <PaginaInicial link="/civis/civil" titulo="Cancelar" />
            </div>
            <div>
                <button onClick={() => cadastrarCivil()} className="btn btn-lg btn-success">Registrar Civil</button>
            </div>
        </div>

    </>
}*/
import React, { useEffect, useState } from "react";
import { PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import "./novocivil.css";

/*FIREBASE CONFIG*/
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const firebasApp = {
    apiKey: "AIzaSyA3lRP5q3hjFWAJ076FHb2VpHVwVsMZAMA",
    authDomain: "army-guard.firebaseapp.com",
    projectId: "army-guard",
    storageBucket: "army-guard.appspot.com",
    messagingSenderId: "873158697255",
    appId: "1:873158697255:web:a42515442d445145820902"
};

// Initialize Firebase
initializeApp(firebasApp);

export default function EditarRegistroCivil() {
    const { id } = useParams(); // Obetendo o id do registro passado pela URL (Router)

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [horarioChegada, setHorarioChegada] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("");
    const [destino, setDestino] = useState("");

    const db = getFirestore();

    // Função para obter os dados do ID do registro e adiciona-los às constantes
    useEffect(() => {
        const getCivis = async () => {
            try {
                const docRef = doc(db, "es_civis", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();

                    setNome(data.nome);
                    setCpf(data.cpf);
                    setHorarioChegada(data.horarioChegada);
                    setHorarioSaida(data.horarioSaida);
                    setDestino(data.destino);
                } else {
                    console.log("Nenhum documento encontrado com a ID fornecida.");
                }
            } catch (error) {
                console.error("Erro ao obter dados do Firestore:", error);
            }
        };
        getCivis();
    }, [db, id]);



    async function atualizarCivil() {
        const docRef = doc(db, "es_civis", id);
        
        await updateDoc(docRef, {
            nome: nome,
            cpf: cpf,
            horarioChegada: horarioChegada,
            horarioSaida: horarioSaida,
            destino: destino
        });
    }

    return <>
        <Navbar />
        <h5 className="mt-4 mb-4 text-center">Civil &gt; Registro &gt; <strong style={{ color: '#008BD2' }}>Editar Registro</strong></h5>

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
                <button onClick={() => atualizarCivil()} className="btn btn-lg btn-success">Atualizar Usuário</button>
            </div>
        </div>

    </>
}
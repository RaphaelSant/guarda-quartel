import React, { useEffect, useState } from "react";
import { Voltar } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import "./veiculoscivil.css";

import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";


export default function EditarVeiculoCivil() {
    // Obetendo o id do registro passado pela URL (Router)
    const { id } = useParams();

    // Variaveis locais para alteração no banco de dados.
    const [nome, setNome] = useState("");
    const [cnh, setCnh] = useState("");
    const [placa, setPlaca] = useState("");
    const [dataEntrada, setDataEntrada] = useState("");
    const [horarioEntrada, setHorarioEntrada] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("");
    const [destino, setDestino] = useState("");

    // Adicione um estado para controlar se os campos estão editáveis
    const [edicaoHabilitada, setEdicaoHabilitada] = useState(false);

    // Função para alternar a habilitação dos campos
    const alternarEdicao = () => {
        setEdicaoHabilitada(!edicaoHabilitada);
    };

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
                setDataEntrada(data.dataEntrada);
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
                dataEntrada: dataEntrada,
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            atualizarVeiculoCivil();
        }

        form.classList.add("was-validated");
    };

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center">
                Civil &gt; Veículo &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Editar Registro</strong>
            </h5>
            <p className="text-center d-print-none">Entrada e Saída de Veículos Civis</p>

            <div className="container">
                <form
                    className={`row g-3 needs-validation ${edicaoHabilitada ? "editavel" : ""}`}
                    id="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="col-md-4">
                        <label htmlFor="nome-completo" className="form-label">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o nome completo"
                            id="nome-completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="cnh" className="form-label">
                            CNH
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="cnh"
                            value={cnh}
                            placeholder="Insira a CNH"
                            onChange={(e) => setCnh(e.target.value)}
                            required
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="placa" className="form-label">
                            Placa do veículo
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="placa"
                            value={placa}
                            placeholder="Insira a Placa"
                            onChange={(e) => setPlaca(e.target.value)}
                            required
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="data-entrada" className="form-label">
                            Data de Entrada
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="data-entrada"
                            value={dataEntrada}
                            placeholder="Insira a data de entrada"
                            onChange={(e) => setDataEntrada(e.target.value)}
                            required
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="hora-entrada" className="form-label">
                            Horário de Entrada
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="hora-entrada"
                            value={horarioEntrada}
                            placeholder="Insira o horário de entrada"
                            onChange={(e) => setHorarioEntrada(e.target.value)}
                            required
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="hora-saida" className="form-label">
                            <b>Horário de Saída</b>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="hora-saida"
                            value={horarioSaida}
                            placeholder="Insira o horário de saída"
                            onChange={(e) => setHorarioSaida(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="destino" className="form-label">
                            Destino
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="destino"
                            value={destino}
                            placeholder="Insira o destino"
                            onChange={(e) => setDestino(e.target.value)}
                            required
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <button type="submit" className="btn btn-md btn-success">
                        Atualizar Registro
                    </button>
                    <Voltar link="/civis/veiculoCivil" />
                    <button type="button" className="btn btn-lg btn-secondary" onClick={alternarEdicao}>
                        {edicaoHabilitada ? "Bloquear Campos" : "Editar Campos"}
                    </button>
                </form>
            </div>

            <script>
                {
                    // Example starter JavaScript for disabling form submissions if there are invalid fields
                    (() => {
                        // Fetch all the forms we want to apply custom Bootstrap validation styles to
                        const forms = document.getElementsByClassName("needs-validation");

                        // Loop over them and prevent submission
                        Array.from(forms).forEach((form) => {
                            form.addEventListener(
                                "submit",
                                (event) => {
                                    if (!form.checkValidity()) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    } else {
                                        event.preventDefault();
                                    }
                                    form.classList.add("was-validated");
                                },
                                false
                            );
                        });
                    })()
                }
            </script>
        </>
    );
}

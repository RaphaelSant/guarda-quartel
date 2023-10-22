import React, { useState } from "react";
import { Voltar } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";

export default function NovoViaturasOutraOm() {
    const [vtrOm, setVtrOm] = useState("");
    const [motorista, setMotorista] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("OM");
    const [horarioEntrada, setHorarioEntrada] = useState("");
    const [chefeVtr, setChefeVtr] = useState("");
    const [destino, setDestino] = useState("");

    async function cadastrarViatura() {
        iniciarFirestoreDb();
        const db = getFirestore();
        const viaturasCollectionRef = collection(db, "es_vtr_outros_quarteis");

        try {
            await addDoc(viaturasCollectionRef, {
                vtrOm,
                motorista,
                horarioEntrada,
                horarioSaida,
                chefeVtr,
                destino
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro realizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/militares/viaturasDeOutrasOms";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao cadastrar: " + error.message);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            cadastrarViatura();
        }
        form.classList.add("was-validated");
    };

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center">
                Militares &gt; Viaturas de Outras OMs &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Novo Registro</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE VIATURAS DE OUTROS QUARTÉIS</p>

            <div className="container">
                <form
                    className="row g-3 needs-validation"
                    id="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="col-md-4">
                        <label htmlFor="vtrOm" className="form-label">
                            Viatura / OM
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira a placa e OM da Vtr"
                            id="vtrOm"
                            value={vtrOm}
                            onChange={(e) => setVtrOm(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="motorista" className="form-label">
                            Motorista
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="motorista"
                            value={motorista}
                            placeholder="Insira o PG e Nome"
                            onChange={(e) => setMotorista(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="horario-entrada" className="form-label">
                            Horário de Entrada
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="horario-entrada"
                            value={horarioEntrada}
                            placeholder="Insira o horário de entrada"
                            onChange={(e) => setHorarioEntrada(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="horario-saida" className="form-label">
                            Horário de Saída
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="horario-saida"
                            value={horarioSaida}
                            placeholder="Insira o horário de saída"
                            onChange={(e) => setHorarioSaida(e.target.value)}
                            disabled
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="chefe-vtr" className="form-label">
                            Chefe de Vtr / Acompanhante
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="chefe-vtr"
                            value={chefeVtr}
                            placeholder="Insira o PG e Nome"
                            onChange={(e) => setChefeVtr(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
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
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-success">
                        Registrar Viatura
                    </button>
                    <Voltar link="/militares/viaturasDeOutrasOms" />
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

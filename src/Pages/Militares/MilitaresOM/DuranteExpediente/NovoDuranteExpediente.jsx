import React, { useState } from "react";
import { Voltar } from "../../../../Components/Button/Button";
import Navbar from "../../../../Components/Navbar/Navbar";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import iniciarFirestoreDb from "../../../FirestoreConfig/firestoreConfig";

import { capturaData, capturaHora } from "../../../Assets/capturaDate";

export default function NovoDuranteExpediente() {
    const [pg, setPg] = useState("");
    const [nomeGuerra, setNomeGuerra] = useState("");
    const [idtMilitar, setIdtMilitar] = useState("");
    const [om, setOm] = useState("");
    const [dataEntrada, setDataEntrada] = useState(capturaData);
    const [horarioEntrada, setHorarioEntrada] = useState(capturaHora);
    const [horarioSaida] = useState("OM");
    const [origem, setOrigem] = useState("");

    async function cadastrarMilitar() {
        iniciarFirestoreDb();
        const db = getFirestore();
        const militaresCollectionRef = collection(db, "es_mil_durante_expediente");

        try {
            await addDoc(militaresCollectionRef, {
                pg,
                nomeGuerra,
                idtMilitar,
                om,
                dataEntrada,
                horarioEntrada,
                horarioSaida,
                origem,
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro realizado com sucesso.");
            // Redirecionar para outra página
            //window.location.replace("civil/civis");
            window.location.href = "/militares/duranteExpediente";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao cadastrar: " + error.message);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            cadastrarMilitar();
        }

        form.classList.add("was-validated");
    };

    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center">
                Militares &gt; Durante o expediente &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Novo Registro</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE MILITARES DURANTE HORÁRIO DE EXPEDIENTE</p>

            <div className="container">
                <form
                    className="row g-3 needs-validation"
                    id="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="pg">Posto Graduação</label>
                        <select className="form-select" id="pg" onChange={(e) => setPg(e.target.value)} >
                            <option defaultValue={"Escolha o Posto/Graduação"}>Escolha o Posto/Graduação</option>
                            <option value="Soldado">Soldado</option>
                            <option value="Taifeiro">Taifeiro</option>
                            <option value="Cabo">Cabo</option>
                            <option value="Sargento">Sargento</option>
                            <option value="Subtenente">Subtenente</option>
                            <option value="Aspirante a Oficial">Aspirante a Oficial</option>
                            <option value="Tenente">Tenente</option>
                            <option value="Capitão">Capitão</option>
                            <option value="Major">Major</option>
                            <option value="Tenente-Coronel">Tenente-Coronel</option>
                            <option value="Coronel">Coronel</option>
                            <option value="General de Brigada">General de Brigada</option>
                            <option value="General de Divisão">General de Divisão</option>
                            <option value="General de Exército">General de Exército</option>
                            <option value="Marechal">Marechal</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="nome-guerra" className="form-label">
                            Nome de Guerra
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o nome de guerra"
                            id="nome-guerra"
                            value={nomeGuerra}
                            onChange={(e) => setNomeGuerra(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="om" className="form-label">
                            OM
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira a Organização Militar"
                            id="om"
                            value={om}
                            onChange={(e) => setOm(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="idt-militar" className="form-label">
                            Identidade Militar
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="idt-militar"
                            value={idtMilitar}
                            placeholder="Insira a identidade militar"
                            onChange={(e) => setIdtMilitar(e.target.value)}
                            required
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
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="origem" className="form-label">
                            Origem
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="origem"
                            value={origem}
                            placeholder="Insira o origem"
                            onChange={(e) => setOrigem(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-success">
                        Registrar Militar
                    </button>
                    <Voltar link="/militares/duranteExpediente" />
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

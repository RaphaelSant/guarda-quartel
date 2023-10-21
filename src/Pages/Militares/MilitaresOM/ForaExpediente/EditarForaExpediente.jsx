import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import { Voltar } from "../../../../Components/Button/Button";
import Navbar from "../../../../Components/Navbar/Navbar";
import iniciarFirestoreDb from "../../../FirestoreConfig/firestoreConfig";
import { capturaData, capturaHora } from "../../../Assets/capturaDate";

export default function EditarForaExpediente() {
    // Obetendo o id do registro passado pela URL (Router)
    const { id } = useParams();

    // Variaveis locais para alteração no banco de dados.
    const [pg, setPg] = useState("");
    const [nomeGuerra, setNomeGuerra] = useState("");
    const [idtMilitar, setIdtMilitar] = useState("");
    const [om, setOm] = useState("");
    const [dataEntrada, setDataEntrada] = useState(capturaData);
    const [horarioEntrada, setHorarioEntrada] = useState(capturaHora);
    const [horarioSaida, setHorarioSaida] = useState("OM");
    const [origem, setOrigem] = useState("");
    // Adicione um estado para controlar se os campos estão editáveis
    const [edicaoHabilitada, setEdicaoHabilitada] = useState(false);

    // Função para alternar a habilitação dos campos
    const alternarEdicao = () => {
        setEdicaoHabilitada(!edicaoHabilitada);
    };

    // Função para obter os dados do ID do registro e adiciona-los às constantes.
    useEffect(() => {
        async function getMilitares() {
            iniciarFirestoreDb();
            const db = getFirestore();
            try {
                // Documento de referência passando como parametro o BD, tabela e ID do campo que será alterado.
                const docRef = doc(db, "es_mil_fora_expediente", id);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                // Os dados serão "setados" nas variaveis locais.
                setPg(data.pg);
                setNomeGuerra(data.nomeGuerra);
                setIdtMilitar(data.idtMilitar);
                setOm(data.om);
                setDataEntrada(data.dataEntrada);
                setHorarioEntrada(data.horarioEntrada);
                setHorarioSaida(data.horarioSaida);
                setOrigem(data.origem);
            } catch (error) {
                // Mostrar um alerta de erro
                window.alert("Algo deu errado: " + error.message);
            }
        }
        getMilitares();
    }, [id]);

    // Função para ação update do botão ATUALZIAR

    const atualizarMilitar = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const docRef = doc(db, "es_mil_fora_expediente", id);

        try {
            await updateDoc(docRef, {
                pg: pg,
                nomeGuerra: nomeGuerra,
                idtMilitar: idtMilitar,
                om: om,
                dataEntrada: dataEntrada,
                horarioEntrada: horarioEntrada,
                horarioSaida: horarioSaida,
                origem: origem,
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro atualizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/militares/foraExpediente";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao atualizar: " + error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            atualizarMilitar();
        }

        form.classList.add("was-validated");
    };
    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center">
                Militares &gt; Fora do expediente &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Editar Registro</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE MILITARES FORA DO HORÁRIO DE EXPEDIENTE</p>

            <div className="container">
                <form
                    className={`row g-3 needs-validation ${edicaoHabilitada ? "editavel" : ""}`}
                    id="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="col-md-3">
                        <label className="form-label" htmlFor="pg">Posto Graduação</label>
                        <select className="form-select" id="pg" onChange={(e) => setPg(e.target.value)} disabled={!edicaoHabilitada}>
                            <option defaultValue={pg}>{pg}</option>
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
                    <div className="col-md-3">
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
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="idtMilitar" className="form-label">
                            Identidade Militar
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="idtMilitar"
                            value={idtMilitar}
                            placeholder="Insira a identidade militar"
                            onChange={(e) => setIdtMilitar(e.target.value)}
                            required
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="om" className="form-label">
                            Organização Militar
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="om"
                            value={om}
                            placeholder="Insira a organização militar"
                            onChange={(e) => setOm(e.target.value)}
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
                            placeholder="Insira o horário de saida"
                            onChange={(e) => setHorarioSaida(e.target.value)}
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
                            placeholder="Insira a origem"
                            onChange={(e) => setOrigem(e.target.value)}
                            required
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-success">
                        Atualizar Registro
                    </button>
                    <Voltar link="/militares/foraExpediente" />
                    <button type="button" className="btn btn-lg btn-secondary" onClick={alternarEdicao}>
                        {edicaoHabilitada ? "Bloquear Campos" : "Editar Campos"}
                    </button>
                    <div className="col-md-6"></div>
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

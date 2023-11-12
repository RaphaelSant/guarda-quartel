import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import { Voltar } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";

export default function EditarViaturasOutraOm() {
    // Obetendo o id do registro passado pela URL (Router)
    const { id } = useParams();

    // Variaveis locais para alteração no banco de dados.
    const [vtrOm, setVtrOm] = useState("");
    const [motorista, setMotorista] = useState("");
    const [horarioEntrada, setHorarioEntrada] = useState("");
    const [horarioSaida, setHorarioSaida] = useState("");
    const [chefeVtr, setChefeVtr] = useState("");
    const [destino, setDestino] = useState("");

    // Adicione um estado para controlar se os campos estão editáveis
    const [edicaoHabilitada, setEdicaoHabilitada] = useState(false);

    // Função para alternar a habilitação dos campos
    const alternarEdicao = () => {
        setEdicaoHabilitada(!edicaoHabilitada);
    };

    // Função para obter os dados do ID do registro e adiciona-los às constantes.
    useEffect(() => {
        async function getViaturas() {
            iniciarFirestoreDb();
            const db = getFirestore();
            try {
                // Documento de referência passando como parametro o BD, tabela e ID do campo que será alterado.
                const docRef = doc(db, "es_vtr_outros_quarteis", id);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                // Os dados serão "setados" nas variaveis locais.
                setVtrOm(data.vtrOm);
                setMotorista(data.motorista);
                setHorarioSaida(data.horarioSaida);
                setHorarioEntrada(data.horarioEntrada);
                setChefeVtr(data.chefeVtr);
                setDestino(data.destino)
            } catch (error) {
                // Mostrar um alerta de erro
                window.alert("Algo deu errado: " + error.message);
            }
        }
        getViaturas();
    }, [id]);

    // Função para ação update do botão ATUALZIAR
    const atualizarViatura = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const docRef = doc(db, "es_vtr_outros_quarteis", id);

        try {
            await updateDoc(docRef, {
                vtrOm: vtrOm,
                motorista: motorista,
                horarioEntrada: horarioEntrada,
                horarioSaida: horarioSaida,
                chefeVtr: chefeVtr,
                destino: destino
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro atualizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/militares/viaturasDeOutrasOms";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao atualizar: " + error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            atualizarViatura();
        }
        form.classList.add("was-validated");
    };
    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center">
                Militares &gt; Viaturas de Outras OMs &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Editar Registro</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE VIATURAS DE OUTROS QUARTÉIS</p>

            <div className="container">
                <form
                    className={`row g-3 needs-validation ${edicaoHabilitada ? "editavel" : ""}`}
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
                            disabled={!edicaoHabilitada}
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
                            disabled={!edicaoHabilitada}
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
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="horario-saida" className="form-label">
                            <b>Horário de Saída</b>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="horario-saida"
                            value={horarioSaida}
                            placeholder="Insira o horário de saída"
                            onChange={(e) => setHorarioSaida(e.target.value)}
                            required
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
                            disabled={!edicaoHabilitada}
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
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <button type="submit" className="btn btn-md btn-success">
                        Atualizar Registro
                    </button>
                    <Voltar link="/militares/viaturasDeOutrasOms" />
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
